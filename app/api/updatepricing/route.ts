// pages/api/updatepricing.ts
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function GET() {
  try {  
    const [deposits, seatingFees, recruitmentFees, otherPayments, currencies ] = await Promise.all([
      prisma.deposit.findMany(),
      prisma.seatingFees.findMany(),
      prisma.recruitmentFees.findMany(),
      prisma.otherPayments.findMany(),
      prisma.currency.findMany()
    ]); 
    return NextResponse.json({ 
      deposits, 
      seatingFees, 
      recruitmentFees, 
      otherPayments,
      currencies,
      message: 'Successfully fetched' }, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  if (req.method === 'PUT') {
    try {
      const body = await req.json();
      const { id, type, newValues } = body;
      
      if (!type || !id || !newValues) {
        
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
      }
      const itemId = parseInt(id as string, 10);
      const parsedNewValues = newValues.map(parseFloat);
      const types = (type as string)
      console.log( types );
      switch (types) {
        case 'deposit':
          const updatedDeposit = await prisma.deposit.update({
            where: { id: itemId },
            data: { deposit: parsedNewValues[0] },
          });
          alert('Item updated successfully');
          return NextResponse.json({ message: 'Item updated successfully', updatedItem: updatedDeposit }, { status: 200 });
        case 'seatingFee':
          const updatedSeatingFee = await prisma.seatingFees.update({
            where: { id: itemId },
            data: {
              workstation: parsedNewValues[0],
              utilitiesAmenities: parsedNewValues[1],
              itSupportHr: parsedNewValues[2],
              accountingPayRoll: parsedNewValues[3],
            },
          });
          alert('Item updated successfully');
          return NextResponse.json({ message: 'Item updated successfully', updatedItem: updatedSeatingFee }, { status: 200 });
        case 'recruitmentFee':
          const updatedRecruitmentFee = await prisma.recruitmentFees.update({
            where: { id: itemId },
            data: {
              advertisement: parsedNewValues[0],
              recruitment: parsedNewValues[1],
            },
          });
          alert('Item updated successfully');
          return NextResponse.json({ message: 'Item updated successfully', updatedItem: updatedRecruitmentFee }, { status: 200 });
        case 'otherPayment':
          const updatedOtherPayment = await prisma.otherPayments.update({
            where: { id: itemId },
            data: {
              servicesPhone: parsedNewValues[0],
              computerUpgrade: parsedNewValues[1],
              optiCompTaxes: parsedNewValues[2],
              medicalInsurance: parsedNewValues[3],
            },
          });
          alert('Item updated successfully');
          return NextResponse.json({ message: 'Item updated successfully', updatedItem: updatedOtherPayment }, { status: 200 });
        case 'currency':
          const updatedCurrency = await prisma.currency.update({
            where: { id: itemId },
            data: {
              currency: parsedNewValues[0],
            },
          });
          alert('Item updated successfully');
          return NextResponse.json({ message: 'Item updated successfully', updatedItem: updatedCurrency }, { status: 200 });
        default:
          return NextResponse.json({ error: 'Invalid item type' }, { status: 400 });
      }
    } catch (error) {
      console.error('Error updating item:', error);
      return NextResponse.json({ error: 'Error updating item' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}
