// pages/api/additionalCost.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export  async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      

    const data =await req.json();

    await Promise.all(data.map(async (item: any) => {
        try {
            const newAdditionalCost = await prisma.additionalCost.create({
                data: {
                    name: item.name,
                    cost: parseFloat(item.cost),
                },
            });
            console.log("Additional cost created:", newAdditionalCost);
        } catch (error) {
            console.error("Error creating additional cost:", error);
            
        }
    }));
    // //   const { name, cost }: { name: string; cost: number } = await req.json();

     
    //   const newAdditionalCost = await prisma.additionalCost.create({
    //     data: {
    //       name,
    //       cost,
    //     },
    //   });
 
      console.log('New additional cost:', data);

      
      return NextResponse.json({ message: "Additional cost saved successfully!" }, { status: 201 });
    } catch (error) {
      console.error('Error creating additional cost:', error);
    
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  } else {
    
    return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
  }
}
