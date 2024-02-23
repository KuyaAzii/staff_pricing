import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

const calculateClientStaffCost = async (gradeLevel: number, staffSalary: number) => {
  try {
    const depositCost = await prisma.deposit.findFirst({
      where: {
        staffCategoryId: gradeLevel
      },
      select: {
        deposit: true
      }
    });

    const seatingFees = await prisma.seatingFees.findFirst({
      where: {
        staffGradeId: gradeLevel
      },
      select: {
        workstation: true,
        utilitiesAmenities: true,
        itSupportHr: true,
        accountingPayRoll: true
      }
    });

    const recruitmentFees = await prisma.recruitmentFees.findFirst({
      where: {
        staffCategoryId: gradeLevel
      },
      select: {
        advertisement: true,
        recruitment: true
      }
    });

    const otherFees = await prisma.otherPayments.findFirst({
      where: {
        id: 1
      },     
      select: {
        servicesPhone: true,
        computerUpgrade: true,
        optiCompTaxes: true,
        thirteenthMonthPayId: true,
        seperationPayId: true,
        medicalInsurance: true,
      }, 
    });

    const totalSalary = staffSalary * 12;

    const totalYearlyCost =
      totalSalary +
      (depositCost?.deposit || 0) +
      (seatingFees?.workstation || 0) +
      (seatingFees?.utilitiesAmenities || 0) +
      (seatingFees?.itSupportHr || 0) +
      (seatingFees?.accountingPayRoll || 0) +
      (recruitmentFees?.recruitment || 0) +
      (recruitmentFees?.advertisement || 0) +
      (otherFees?.servicesPhone || 0) +
      (otherFees?.computerUpgrade || 0) +
      (otherFees?.optiCompTaxes || 0) +
      (otherFees?.thirteenthMonthPayId ? staffSalary : staffSalary || 0) +
      (otherFees?.seperationPayId ? staffSalary : staffSalary || 0)+
      (otherFees?.medicalInsurance || 0);

      const monthlyPayment = totalYearlyCost / 12;

      const totalSeatingFee = 
      (seatingFees?.workstation || 0) +
      (seatingFees?.utilitiesAmenities || 0) +
      (seatingFees?.itSupportHr || 0) +
      (seatingFees?.accountingPayRoll || 0);

      const totalRecruitmentAdvertisingFee = 
      (recruitmentFees?.recruitment || 0) + 
      (recruitmentFees?.advertisement || 0);

      const totalOtherFees =
      (otherFees?.servicesPhone || 0) +
      (otherFees?.computerUpgrade || 0) +
      (otherFees?.optiCompTaxes || 0) +
      (otherFees?.thirteenthMonthPayId ? staffSalary : staffSalary || 0) +
      (otherFees?.seperationPayId ? staffSalary : staffSalary || 0 )+
      (otherFees?.medicalInsurance || 0);



    return {
      totalSalary,
      totalYearlyCost,
      monthlyPayment,
      depositCost: (depositCost?.deposit || 0),
      totalSeatingFee,
      totalRecruitmentAdvertisingFee,
      totalOtherFees   
    };
    
    
  } catch (error) {
    console.error('Error calculating total yearly cost:', error);
    throw error;
  }
};

export async function GET(req: Request) {
  try {
    const grades = await prisma.staffCategory.findMany();
    const staffPosition = await prisma.positionsCategory.findMany();
    const staffSalary = await prisma.salaryCategory.findMany();
    
    
    return NextResponse.json({ data: { grades, staffPosition, staffSalary }, message: "successfully!" }, { status: 200 });
  } catch (error) {
    console.error('Error fetching grade levels:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, company, contactNumber, email, address, position, grade, salary } = body;
  try {

    const existingClient = await prisma.clientProfiles.findFirst({
      where: {
        email: email
      }
    });
    if (existingClient) {
     return NextResponse.json({ message: "Email is already in use." }, { status: 400 });
    }
    
    const parsedContact = parseInt(contactNumber);
    const salaryCategory = await prisma.salaryCategory.findFirst({
      where: {
        staffSalary: parseFloat(salary)
      }
      
    });
    console.log('Provided salary:', salary);
    if (!salaryCategory) {
      throw new Error('Invalid staff salary provided');
    }

    const staffCategory = await prisma.staffCategory.findFirst({
      where: {
        id: parseInt(grade)
      }
    });

    if (!staffCategory) {
      throw new Error('Invalid grade level provided');
    }

    const positionCategory = await prisma.positionsCategory.findFirst({
      where: {
        staffPosition: position
      }
    });

    if (!positionCategory) {
      throw new Error('Invalid staff position provided');
    }
    
    const client = await prisma.clientProfiles.create({
      data: {
        name,
        email,
        company,
        contactNumber: parsedContact,
        address,
        gradeLevelId: staffCategory.id,
        staffPositionId: positionCategory.id,
        staffSalaryId: salaryCategory.id
      }
    });

    const costs = await calculateClientStaffCost(staffCategory.id, parseFloat(salary));

    return NextResponse.json({ data: costs, message: "User created successfully!" }, { status: 201 });
  } catch (error) {
    console.error('Error creating client or calculating total yearly cost:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
