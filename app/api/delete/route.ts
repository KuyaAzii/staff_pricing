// pages/api/delete.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    if (req.method === 'DELETE') {
      const urlParams = new URLSearchParams(req.url.split('?')[1]);
      const id = parseInt(urlParams.get('id') || '');

      if (isNaN(id)) {
        return NextResponse.json({ message: 'Invalid ID parameter' }, { status: 400 });
      }

      const clientProfile = await prisma.clientProfiles.findUnique({
        where: { id: id },
        include: {
          ourPdf: true,
          clientPdf: true,
        },
      });

      if (!clientProfile) {
        return NextResponse.json({ message: 'Client profile not found' }, { status: 404 });
      }

      
      if (clientProfile.ourPdf && clientProfile.ourPdf.length > 0) {
        await prisma.ourPdf.deleteMany({
          where: { ourPdfClientProfilesId: id },
        });
      }

    
      if (clientProfile.clientPdf && clientProfile.clientPdf.length > 0) {
        await prisma.clientPdf.deleteMany({
          where: { clientPdfClientProfilesId: id },
        });
      }

     
      await prisma.clientProfiles.delete({
        where: { id: id },
      });

      return NextResponse.json({ message: "User deleted successfully!" }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }
  } catch (error) {
    console.error('Error deleting client data:', error);
    return NextResponse.json({ message: 'Failed to delete client data' }, { status: 500 });
  }
}
