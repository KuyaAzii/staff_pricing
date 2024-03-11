import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const body = await req.json();
        if (!body) {
          return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
        }
    
        const { id } = JSON.parse(body);
        if (!id) {
          return NextResponse.json({ error: 'Missing or invalid PDF ID' }, { status: 400 });
        }
    
        const pdfData = await prisma.ourPdf.findUnique({
          where: {
            id: Number(id),
          },
          select: {
            pdfBinaryData: true,
          },
        });
    
        if (!pdfData) {
          return NextResponse.json({ error: 'PDF not found' }, { status: 404 });
        }
    
        if (!pdfData.pdfBinaryData) {
          throw new Error('PDF binary data is null');
        }
    
        return new NextResponse(pdfData.pdfBinaryData, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="our-pdf-${id}.pdf"`,
          },
        });
      } catch (error) {
        console.error('Error fetching PDF:', error);
        return NextResponse.json({ error: 'Error fetching PDF' }, { status: 500 });
      }
    }