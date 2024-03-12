import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import puppeteer from 'puppeteer';

const prisma = new PrismaClient();

const defaultPdfOptions = {
  format: 'A4',
  margin: {
    top: '20px',
    right: '20px',
    bottom: '20px',
    left: '20px',
  },
};

export async function POST(req: NextRequest) {
  try {
    if (req.method !== 'POST') {
      return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }
    const body = await req.json();

    if (!body) {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 });
    } else if (!body.ourContent || !body.clientContent) {
      return NextResponse.json({ error: 'Missing properties in request body' }, { status: 400 });
    }
    const [ourPdfBuffer, clientPdfBuffer] = await Promise.all([
      generatePdf(body.ourContent, defaultPdfOptions),
      generatePdf(body.clientContent, defaultPdfOptions),
    ]);

    const greatestId = await prisma.clientProfiles.aggregate({
      _max: {
        id: true, 
      },
    });
    
    const clientId = greatestId._max.id; 
    if (!clientId) {
      throw new Error('No client profiles found.');
    }
    const latestId = clientId;

    const baseUrl = process.env.NEXT_PUBLIC_PDF_BASE_URL || 'http://localhost:3000/api/pdf/';
    const [ourPdfResult, clientPdfResult] = await Promise.all([
      prisma.ourPdf.create({
        data: {
          filename: 'our-data.pdf',
          url: '',
          title: 'Our Data',
          description: 'PDF file generated from our data',
          size: ourPdfBuffer.length,
          pdfBinaryData: ourPdfBuffer,
          ourPdfClientProfilesId: latestId,
        },
      }),
      prisma.clientPdf.create({
        data: {
          filename: 'client-data.pdf',
          url: '',
          description: 'PDF file generated from client data',
          size: clientPdfBuffer.length,
          pdfBinaryData: clientPdfBuffer,
          clientPdfClientProfilesId: latestId,
        },
      }),
    ]);
    ourPdfResult.url = `${baseUrl}${ourPdfResult.id}.pdf`;
    clientPdfResult.url = `${baseUrl}${clientPdfResult.id}.pdf`;
    return NextResponse.json({ ourPdf: ourPdfResult, clientPdf: clientPdfResult }, { status: 201 });
  } catch (error) {
    console.error('Error saving PDF:', error);
    return NextResponse.json({ error: 'Error saving PDF' }, { status: 500 });
  }
}
async function generatePdf(content: string, options: any = {}): Promise<Buffer> {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.setContent(content);
    return await page.pdf(options);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Error generating PDF');
  } finally {
    await browser.close();
  }
}