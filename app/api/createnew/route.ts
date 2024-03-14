
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const calculateClientStaffCost = async (
  gradeLevel: number,
  staffSalary: number,
  client: ClientProfiles,
  selectedCurrency: string
) => {
  try {
    const depositCost = await prisma.deposit.findFirst({
      where: {
        staffCategoryId: gradeLevel
      },
      select: {
        deposit: true
      }
    });


    const additionalCost = await prisma.additionalCost.findMany({
      where: { clientProfilesId: client.id },
      select: {
        cost: true,
        name: true
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
        optiCompTaxes: true,
        thirteenthMonthPayId: true,
        medicalInsurance: true,
      },
    });

    const currency = await prisma.currency.findFirst({
      where: {
        country: selectedCurrency 
      },
      select: {
        country: true,
        currency: true
      }
    });

    if (!currency) {
      throw new Error('Invalid currency selected');
    }

    console.log(gradeLevel);

    const toselectedCurrency = currency.currency;
    const selectedCountry = currency.country;

    const totalAdditionalCost = additionalCost.reduce((n, {cost}) => n + cost, 0);
    const yearlySalary = (staffSalary * 12).toFixed(2);

    
    const totalSeatingFee = (
      (seatingFees?.workstation || 0) +
      (seatingFees?.utilitiesAmenities || 0) +
      (seatingFees?.itSupportHr || 0) +
      (seatingFees?.accountingPayRoll || 0)).toFixed(2);

    const totalRecruitmentAdvertisingFee = (
      (recruitmentFees?.recruitment || 0) +
      (recruitmentFees?.advertisement || 0)).toFixed(2);

    const totalOtherFees = (
      (otherFees?.servicesPhone || 0) +
    
      (otherFees?.optiCompTaxes || 0) +
      (otherFees?.thirteenthMonthPayId ? staffSalary : staffSalary || 0) +
      
      totalAdditionalCost +
      (otherFees?.medicalInsurance || 0)).toFixed(2);

    // Total  cost
    const totalYearlyCost = (parseFloat(yearlySalary) + (depositCost?.deposit || 0) + parseFloat(totalSeatingFee) + parseFloat(totalRecruitmentAdvertisingFee) + parseFloat(totalOtherFees)).toFixed(2);
    const totalMonthlyCost = (parseFloat(totalYearlyCost) / 12).toFixed(2);
    const totalAudYearlyCost = (parseFloat(totalYearlyCost) / (toselectedCurrency || 0)).toFixed(2);
    const totalAudMonthlyCost = (parseFloat(totalAudYearlyCost) / 12).toFixed(2);

   

    // Total Seating Fees Cost
    const totalMonthlySeatingFee = (parseFloat(totalSeatingFee) / 12).toFixed(2);
    const totalAudSeatingFee = (parseFloat(totalSeatingFee) / (toselectedCurrency || 0)).toFixed(2);
    const totalAudMonthlySeatingFee = (parseFloat(totalAudSeatingFee) / 12).toFixed(2);


    // Total Others Payment
    const totalMonthlytotalOtherFees = (parseFloat(totalOtherFees) / 12).toFixed(2);
    const totalAudtotalOtherFees = (parseFloat(totalOtherFees) / (toselectedCurrency || 0)).toFixed(2);
    const totalAudMonthlytotalOtherFees = (parseFloat(totalAudtotalOtherFees) / 12).toFixed(2);

    // Total Recuitment Fee Cost
    const totalMonthlyRecruitmentAdvertisingFee = (parseFloat(totalRecruitmentAdvertisingFee) / 12).toFixed(2);
    const totalAudRecruitmentAdvertisingFee = (parseFloat(totalRecruitmentAdvertisingFee) / (toselectedCurrency || 0)).toFixed(2);
    const totalAudMonthlyRecruitmentAdvertisingFee = (parseFloat(totalAudRecruitmentAdvertisingFee) / 12).toFixed(2);


    // PHP Monthly 
    const monthlyDeposit = ((depositCost?.deposit || 0) / 12).toFixed(2);

    const monthlyWorkstation = ((seatingFees?.workstation || 0) / 12).toFixed(2);
    const monthlyUtilitiesAmenities = ((seatingFees?.utilitiesAmenities || 0) / 12).toFixed(2);
    const monthlyItSupportHr = ((seatingFees?.itSupportHr || 0) / 12).toFixed(2);
    const monthlyAccountingPayRoll = ((seatingFees?.accountingPayRoll || 0) / 12).toFixed(2);

    const monthlyRecruitment = ((recruitmentFees?.recruitment || 0) / 12).toFixed(2);
    const monthlyAdvertisement = ((recruitmentFees?.advertisement || 0) / 12).toFixed(2);

    const monthlyServicesPhone = ((otherFees?.servicesPhone || 0) / 12).toFixed(2);
  
    const monthyOptiComTaxes = ((otherFees?.optiCompTaxes || 0) / 12).toFixed(2);
    const monthlyThirteenthMonthlyPay = ((otherFees?.thirteenthMonthPayId ? staffSalary : staffSalary || 0) / 12).toFixed(2);
   
    const monthlyMedicalInsurance = ((otherFees?.medicalInsurance || 0) / 12).toFixed(2);

    // AUD Yearly
  
    const audWorkstation = ((seatingFees?.workstation || 0) / (toselectedCurrency || 0)).toFixed(2);
    const audUtilitiesAmenities = ((seatingFees?.utilitiesAmenities || 0) / (toselectedCurrency || 0)).toFixed(2);
    const audItSupportHr = ((seatingFees?.itSupportHr || 0) / (toselectedCurrency || 0)).toFixed(2);
    const audAccountingPayRoll = ((seatingFees?.accountingPayRoll || 0) / (toselectedCurrency || 0)).toFixed(2);

    const audRecruitment = ((recruitmentFees?.recruitment || 0) / (toselectedCurrency || 0)).toFixed(2);
    const audAdvertisement = ((recruitmentFees?.advertisement || 0) / (toselectedCurrency || 0)).toFixed(2);

    const audServicesPhone = ((otherFees?.servicesPhone || 0) / (toselectedCurrency || 0)).toFixed(2);
 
    const audOptiComTaxes = ((otherFees?.optiCompTaxes || 0) / (toselectedCurrency || 0)).toFixed(2);
    const audThirteenthMonthlyPay = ((otherFees?.thirteenthMonthPayId ? staffSalary : staffSalary || 0) / (toselectedCurrency || 0)).toFixed(2);
    
    const audMedicalInsurance = ((otherFees?.medicalInsurance || 0) / (toselectedCurrency || 0)).toFixed(2);



    // AUD total Yearly
    const audTotalYearlySalary = (parseFloat(yearlySalary) / (toselectedCurrency || 0)).toFixed(2);
    const audDeposit = ((depositCost?.deposit || 0) / (toselectedCurrency || 0)).toFixed(2);
    const audTotalSeatingFee = (parseFloat(totalSeatingFee) / (toselectedCurrency || 0)).toFixed(2);
    const audtotalRecruitmentAdvertisingFee = (parseFloat(totalRecruitmentAdvertisingFee) / (toselectedCurrency || 0)).toFixed(2);
    const audtotalOtherFees = (parseFloat(totalOtherFees) / (toselectedCurrency || 0)).toFixed(2);

    //AUD Monthly
    const audMonthlyDeposit = (parseFloat(audDeposit) / 12).toFixed(2);

    const audMonthlySalary = (parseFloat(audTotalYearlySalary) / 12).toFixed(2);

    const audMonthlyWorkstation = (parseFloat(audWorkstation) / 12).toFixed(2);
    const audMonthlyUtilitiesAmenities = (parseFloat(audUtilitiesAmenities) / 12).toFixed(2);
    const audMonthlyItSupportHr = (parseFloat(audItSupportHr) / 12).toFixed(2);
    const audMonthlyAccountingPayRoll = (parseFloat(audAccountingPayRoll) / 12).toFixed(2);

    const audMonthlyRecruitment = (parseFloat(audRecruitment) / 12).toFixed(2);
    const audMonthlyAdvertisement = (parseFloat(audAdvertisement) / 12).toFixed(2);

    const audMonthlyServicesPhone = (parseFloat(audServicesPhone) / 12).toFixed(2);

    const audMonthlyOptiComTaxes = (parseFloat(audOptiComTaxes) / 12).toFixed(2);
    const audMonthlyThirteenthMonthlyPay = (parseFloat(audThirteenthMonthlyPay) / 12).toFixed(2);
  
    const audMonthlyMedicalInsurance = (parseFloat(audMedicalInsurance) / 12).toFixed(2);



    return {
      yearlySalary,
      totalYearlyCost,
      totalMonthlyCost,
      depositCost: depositCost?.deposit,

      workStation: seatingFees?.workstation,
      utilitiesAmenities: seatingFees?.utilitiesAmenities,
      itSupportHr: seatingFees?.itSupportHr,
      accountingPayRoll: seatingFees?.accountingPayRoll,

      staffSalary: staffSalary,
      audMonthlySalary,
      recruitment: recruitmentFees?.recruitment,
      advertisement: recruitmentFees?.advertisement,

      servicesPhone: otherFees?.servicesPhone,
   
      optiCompTaxes: otherFees?.optiCompTaxes,
      thirteenthMonthPay: otherFees?.thirteenthMonthPayId ? staffSalary : staffSalary,
   
      medicalInsurance: otherFees?.medicalInsurance,


      totalAudYearlyCost,
      totalAudMonthlyCost,

      totalMonthlySeatingFee,
      totalAudSeatingFee,
      totalAudMonthlySeatingFee,

      totalMonthlytotalOtherFees,
      totalAudtotalOtherFees,
      totalAudMonthlytotalOtherFees,

      totalMonthlyRecruitmentAdvertisingFee,
      totalAudRecruitmentAdvertisingFee,
      totalAudMonthlyRecruitmentAdvertisingFee,

      totalSeatingFee,
      totalRecruitmentAdvertisingFee,
      totalOtherFees,

      monthlyDeposit,
      monthlyWorkstation,
      monthlyUtilitiesAmenities,
      monthlyItSupportHr,
      monthlyAccountingPayRoll,
      monthlyRecruitment,
      monthlyAdvertisement,
      monthlyServicesPhone,
   
      monthyOptiComTaxes,
      monthlyThirteenthMonthlyPay,
 
      monthlyMedicalInsurance,

      audWorkstation,
      audUtilitiesAmenities,
      audItSupportHr,
      audAccountingPayRoll,
      audRecruitment,
      audAdvertisement,
      audServicesPhone,
      
      audOptiComTaxes,
      audThirteenthMonthlyPay,
      
      audMedicalInsurance,
      audTotalYearlySalary,
      audDeposit,
      audTotalSeatingFee,
      audtotalRecruitmentAdvertisingFee,
      audtotalOtherFees,

      audMonthlyDeposit,
      audMonthlyWorkstation,
      audMonthlyUtilitiesAmenities,
      audMonthlyItSupportHr,
      audMonthlyAccountingPayRoll,
      audMonthlyRecruitment,
      audMonthlyAdvertisement,
      audMonthlyServicesPhone,
      
      audMonthlyOptiComTaxes,
      audMonthlyThirteenthMonthlyPay,
     
      audMonthlyMedicalInsurance,

      additionalCost,
      toselectedCurrency,
      client,
      selectedCountry
      
     
    };


  } catch (error) {
    console.error('Error calculating total yearly cost:', error);
    throw error;
  }
};




export async function GET(req: Request) {
  try {
    const [grades, staffPosition, staffSalary, currency] = await Promise.all([
      prisma.staffCategory.findMany(),
      prisma.positionsCategory.findMany(),
      prisma.salaryCategory.findMany(),
      prisma.currency.findMany(),
    ]);

    return NextResponse.json({ data: { grades, staffPosition, staffSalary, currency }, message: "successfully!" }, { status: 200 });
  } catch (error) {
    
    console.error('Error fetching grade levels:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, company, contactNumber, email, address, position, grade, salary, currency, additionalCost } = body;
  try {

    const parsedContact = parseInt(contactNumber);
    const salaryCategory = await prisma.salaryCategory.findFirst({
      where: {
        staffSalary: parseFloat(salary)
      }
    });
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

    const selectedCurrency = await prisma.currency.findFirst({
      where: {
        currency: currency
      }
    });
    if (!selectedCurrency) {
      
      throw new Error('Invalid currency provided');
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

    await Promise.all(JSON.parse(additionalCost).map(async (item: any) => {
      try {
        const newAdditionalCost = await prisma.additionalCost.create({
          data: {
            name: item.name,
            cost: parseFloat(item.cost),
            ClientProfiles: { connect: { id: client.id } }
          },
        });
        console.log("Additional cost created:", newAdditionalCost);
      } catch (error) {
        
        alert('Error creating additional cost');
        console.error("Error creating additional cost:", error);
      }
    }));

    const costs = await calculateClientStaffCost(staffCategory.id, parseFloat(salary), client, selectedCurrency?.country);

    return NextResponse.json({ data: costs, message: "User created successfully!" }, { status: 201 });
    
  } catch (error) {
    alert('Check Selection field ');
    console.error('Error creating client or calculating total yearly cost:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}