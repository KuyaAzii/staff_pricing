// pages/api/updatepricing.ts
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next';

const prisma = new PrismaClient();

export async function GET() {
  try {   
    const deposits = await prisma.deposit.findMany();
    const seatingFees = await prisma.seatingFees.findMany();
    
    return NextResponse.json({ deposits, seatingFees, message: 'Successfully fetched' }, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

export async function PUT(req: NextApiRequest ) {
  const { id } = req.query;
  try {
    const body = await req.body();
    const { newDataValue } = JSON.parse(body);

    if (req.url?.includes('/deposit')) {
      const updatedDeposit = await prisma.deposit.update({
        where: { id: parseInt(id as string) },
        data: { deposit: parseFloat(newDataValue) }
      });
      return NextResponse.json({ data: updatedDeposit, message: 'Deposit updated successfully' }, { status: 200 });
    } else if (req.url?.includes('/seatingfee')) {
      const updatedSeatingFee = await prisma.seatingFees.update({
        where: { id: parseInt(id as string) },
        data: { workstation: parseFloat(newDataValue) }
      });
      return NextResponse.json({ data: updatedSeatingFee, message: 'Seating Fees updated successfully' }, { status: 200 });
    } else {
      throw new Error('Invalid endpoint');
    }
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json({ error: 'Error update' }, { status: 500 });
  }
}

    

