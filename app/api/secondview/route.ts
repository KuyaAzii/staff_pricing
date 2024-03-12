import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }
    const id = body?.id; 
    if (!id) {
      return NextResponse.json({ error: 'Missing or invalid Client ID' }, { status: 400 });
    }
    const client = await prisma.clientProfiles.findUnique({
      where: { id: Number(id) },
      select: {
        clientPdf: {
          select: { pdfBinaryData: true },
        },
      },
    });

    if (!client || !client.clientPdf?.length) {
      return NextResponse.json({ error: 'Client profile not found' }, { status: 404 });
     
    }
    if (!client.clientPdf || !client.clientPdf[0].pdfBinaryData) {
      throw new Error('No PDF associated with this Client ID');
    }
    console.log('Retrieved PDF data length:', client.clientPdf[0].pdfBinaryData.length); // Log PDF data length
    const pdfData = client.clientPdf[0].pdfBinaryData;
  
    if (pdfData.length === 0) {
      throw new Error('Retrieved PDF data is empty');
    }
    return new NextResponse(pdfData, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': String(pdfData.length), 
        'Content-Disposition': `attachment; filename="client-pdf-${id}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error fetching PDF:', error);
    return NextResponse.json({ error: 'Error fetching PDF' }, { status: 500 });
  }
}