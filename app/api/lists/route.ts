// pages/api/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET( ) {
  try {   
    const clientProfile = await prisma.clientProfiles.findMany();

    return NextResponse.json({ data: clientProfile, message: ' Succesfully fetch' }, { status: 200});
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500});
  }
}
