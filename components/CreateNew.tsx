//compunents/CreateNew.tsx
"use client";
import { PositionsCategory, StaffCategory, SalaryCategory, Currency, ClientProfiles } from '@prisma/client';
import React, { useState, useEffect } from 'react';
import DynamicInputFields from './InputField';

const CreateNew = () => {

  const [totalYearlyCost, setTotalYearlyCost] = useState<number | null>(null);
  const [depositCost, setDepositCost] = useState<number | null>(null);
  const [totalSeatingFee, setTotalSeatingFee] = useState<number | null>(null);
  const [yearlySalary, setYearlySalary] = useState<number | null>(null);
  const [totalRecruitmentAdvertisingFee, setTotalRecruitmentAdvertisingFee] = useState<number | null>(null);
  const [totalOtherFees, setTotalOtherFees] = useState<number | null>(null);
  const [totalMonthlyCost, setTotalMonthlyCost] = useState<number | null>(null);
  const [grades, setGrades] = useState<StaffCategory[] | null>(null);
  const [positions, setPositions] = useState<PositionsCategory[] | null>(null);
  const [salaries, setSalaries] = useState<SalaryCategory[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [inputFields, setInputFields] = useState<{ name: string; cost: string }[]>([]);


  const [workStation, setWorkStation] = useState<number | null>(null);
  const [utilitiesAmenities, setUtilitiesAmenities] = useState<number | null>(null);
  const [itSupportHr, setItSupportHr] = useState<number | null>(null);
  const [accountingPayRoll, setAccountingPayRoll] = useState<number | null>(null);

  const [staffSalary, setStaffSalary] = useState<number | null>(null);

  const [recruitment, setRecruitment] = useState<number | null>(null);
  const [advertisement, setAdvertisement] = useState<number | null>(null);

  const [servicesPhone, setServicesPhone] = useState<number | null>(null);
  const [computerUpgrade, setComputerUpgrade] = useState<number | null>(null);
  const [optiCompTaxes, setOptiCompTaxes] = useState<number | null>(null);
  const [thirteenthMonthPay, setThirteenthMonthPay] = useState<number | null>(null);
  const [seperationPay, setSeperationPay] = useState<number | null>(null);
  const [medicalInsurance, setMedicalInsurance] = useState<number | null>(null);

  const [totalAudYearlyCost, setTotalAudYearlyCost] = useState<number | null>(null);
  const [totalAudMonthlyCost, setTotalAudMonthlyCost] = useState<number | null>(null);

  const [totalMonthlySeatingFee, setTotalMonthlySeatingFee] = useState<number | null>(null);
  const [totalAudSeatingFee, setTotalAudSeatingFee] = useState<number | null>(null);
  const [totalAudMonthlySeatingFee, setTotalAudMonthlySeatingFee] = useState<number | null>(null);

  const [totalMonthlytotalOtherFees, setTotalMonthlytotalOtherFees] = useState<number | null>(null);
  const [totalAudtotalOtherFees, setTotalAudtotalOtherFees] = useState<number | null>(null);
  const [totalAudMonthlytotalOtherFees, setTotalAudMonthlytotalOtherFees] = useState<number | null>(null);

  const [totalMonthlyRecruitmentAdvertisingFee, setTotalMonthlyRecruitmentAdvertisingFee] = useState<number | null>(null);
  const [totalAudRecruitmentAdvertisingFee, setTotalAudRecruitmentAdvertisingFee] = useState<number | null>(null);
  const [totalAudMonthlyRecruitmentAdvertisingFee, setTotalAudMonthlyRecruitmentAdvertisingFee] = useState<number | null>(null);

  const [monthlyDeposit, setMonthlyDeposit] = useState<number | null>(null);
  const [monthlyWorkstation, setMonthlyWorkstation] = useState<number | null>(null);
  const [monthlyUtilitiesAmenities, setMonthlyUtilitiesAmenities] = useState<number | null>(null);
  const [monthlyItSupportHr, setMonthlyItSupportHr] = useState<number | null>(null);
  const [monthlyAccountingPayRoll, setMonthlyAccountingPayRoll] = useState<number | null>(null);
  const [monthlyRecruitment, setMonthlyRecruitment] = useState<number | null>(null);
  const [monthlyAdvertisement, setMonthlyAdvertisement] = useState<number | null>(null);
  const [monthlyServicesPhone, setMonthlyServicesPhone] = useState<number | null>(null);
  const [monthlyComputerUpgrade, setMonthlyComputerUpgrade] = useState<number | null>(null);
  const [monthyOptiComTaxes, setMonthyOptiComTaxes] = useState<number | null>(null);
  const [monthlyThirteenthMonthlyPay, setMonthlyThirteenthMonthlyPay] = useState<number | null>(null);
  const [monthlySeperationPay, setMonthlySeperationPay] = useState<number | null>(null);
  const [monthlyMedicalInsurance, setMonthlyMedicalInsurance] = useState<number | null>(null);

  const [audWorkstation, setAudWorkstation] = useState<number | null>(null);
  const [audUtilitiesAmenities, setAudUtilitiesAmenities] = useState<number | null>(null);
  const [audItSupportHr, setAudItSupportHr] = useState<number | null>(null);
  const [audAccountingPayRoll, setAudAccountingPayRoll] = useState<number | null>(null);
  const [audRecruitment, setAudRecruitment] = useState<number | null>(null);
  const [audAdvertisement, setAudAdvertisement] = useState<number | null>(null);
  const [audServicesPhone, setAudServicesPhone] = useState<number | null>(null);
  const [audComputerUpgrade, setAudComputerUpgrade] = useState<number | null>(null);
  const [audOptiComTaxes, setAudOptiComTaxes] = useState<number | null>(null);
  const [audThirteenthMonthlyPay, setAudThirteenthMonthlyPay] = useState<number | null>(null);
  const [audSeperationPay, setAudSeperationPay] = useState<number | null>(null);
  const [audMedicalInsurance, setAudMedicalInsurance] = useState<number | null>(null);
  const [audTotalYearlySalary, setAudTotalYearlySalary] = useState<number | null>(null);
  const [audDeposit, setAudDeposit] = useState<number | null>(null);
  const [audTotalSeatingFee, setAudTotalSeatingFee] = useState<number | null>(null);
  const [audtotalRecruitmentAdvertisingFee, setAudtotalRecruitmentAdvertisingFee] = useState<number | null>(null);
  const [audtotalOtherFees, setAudtotalOtherFees] = useState<number | null>(null);

  const [audMonthlySalary, setAudMonthlySalary] = useState<number | null>(null);
  const [audMonthlyDeposit, setAudMonthlyDeposit] = useState<number | null>(null);
  const [audMonthlyWorkstation, setAudMonthlyWorkstation] = useState<number | null>(null);
  const [audMonthlyUtilitiesAmenities, setAudMonthlyUtilitiesAmenities] = useState<number | null>(null);
  const [audMonthlyItSupportHr, setAudMonthlyItSupportHr] = useState<number | null>(null);
  const [audMonthlyAccountingPayRoll, setAudMonthlyAccountingPayRoll] = useState<number | null>(null);
  const [audMonthlyRecruitment, setAudMonthlyRecruitment] = useState<number | null>(null);
  const [audMonthlyAdvertisement, setAudMonthlyAdvertisement] = useState<number | null>(null);
  const [audMonthlyServicesPhone, setAudMonthlyServicesPhone] = useState<number | null>(null);
  const [audMonthlyComputerUpgrade, setAudMonthlyComputerUpgrade] = useState<number | null>(null);
  const [audMonthlyOptiComTaxes, setAudMonthlyOptiComTaxes] = useState<number | null>(null);
  const [audMonthlyThirteenthMonthlyPay, setAudMonthlyThirteenthMonthlyPay] = useState<number | null>(null);
  const [audMonthlySeperationPay, setAudMonthlySeperationPay] = useState<number | null>(null);
  const [audMonthlyMedicalInsurance, setAudMonthlyMedicalInsurance] = useState<number | null>(null);
  const [additionalCost, setAdditionalCost] = useState([])
  const [currency, setCurreny] = useState<Currency>()
  const [client, setClient] = useState<ClientProfiles>()

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    contactNumber: '',
    email: "",
    address: ''
  });
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<String | null>(null);
  const [selectedSalary, setSelectedSalary] = useState<number | null>(null);

  useEffect(() => {
    const fetchGradeLevels = async () => {
      try {
        const response = await fetch('/api/createnew', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch grade levels');
        }
        const data = await response.json();
        const { grades, staffPosition, staffSalary } = data.data;
        setGrades(grades);
        setPositions(staffPosition);
        setSalaries(staffSalary);
      } catch (error) {
        console.error('Error fetching grade levels:', error);
      }
    };

    fetchGradeLevels();
  }, []);

  const handleOnchangeSelectedPosition = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPositionId = (e.target.value);
    setSelectedPosition(selectedPositionId);
  };

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;



  const handleOnchangeSelectedGrade = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGradeId = parseInt(e.target.value);
    setSelectedGrade(selectedGradeId);
  };

  const handleOnchangeSelectedSalary = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSalaryId = parseInt(e.target.value);
    setSelectedSalary(selectedSalaryId);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('/api/createnew', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          grade: selectedGrade,
          position: selectedPosition,
          salary: selectedSalary,
          additionalCost: JSON.stringify(inputFields)
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log('successful');
        setTotalYearlyCost(responseData.data.totalYearlyCost);
        setTotalMonthlyCost(responseData.data.totalMonthlyCost);
        setDepositCost(responseData.data.depositCost);
        setTotalSeatingFee(responseData.data.totalSeatingFee);
        setTotalRecruitmentAdvertisingFee(responseData.data.totalRecruitmentAdvertisingFee);
        setTotalOtherFees(responseData.data.totalOtherFees);
        setYearlySalary(responseData.data.yearlySalary);

        setWorkStation(responseData.data.workStation);
        setUtilitiesAmenities(responseData.data.utilitiesAmenities);
        setItSupportHr(responseData.data.itSupportHr);
        setAccountingPayRoll(responseData.data.accountingPayRoll);

        setStaffSalary(responseData.data.staffSalary);
        setAudMonthlySalary(responseData.data.audMonthlySalary);
        setRecruitment(responseData.data.recruitment);
        setAdvertisement(responseData.data.advertisement);

        setServicesPhone(responseData.data.servicesPhone);
        setComputerUpgrade(responseData.data.computerUpgrade);
        setOptiCompTaxes(responseData.data.computerUpgrade);
        setThirteenthMonthPay(responseData.data.thirteenthMonthPay);
        setSeperationPay(responseData.data.seperationPay);
        setMedicalInsurance(responseData.data.medicalInsurance);

        setTotalAudYearlyCost(responseData.data.totalAudYearlyCost);
        setTotalAudMonthlyCost(responseData.data.totalAudMonthlyCost);

        setTotalMonthlySeatingFee(responseData.data.totalMonthlySeatingFee);
        setTotalAudSeatingFee(responseData.data.totalAudSeatingFee);
        setTotalAudMonthlySeatingFee(responseData.data.totalAudMonthlySeatingFee);

        setTotalMonthlytotalOtherFees(responseData.data.totalMonthlytotalOtherFees);
        setTotalAudtotalOtherFees(responseData.data.totalAudtotalOtherFees);
        setTotalAudMonthlytotalOtherFees(responseData.data.totalAudMonthlytotalOtherFees);

        setTotalMonthlyRecruitmentAdvertisingFee(responseData.data.totalMonthlyRecruitmentAdvertisingFee);
        setTotalAudRecruitmentAdvertisingFee(responseData.data.totalAudRecruitmentAdvertisingFee);
        setTotalAudMonthlyRecruitmentAdvertisingFee(responseData.data.totalAudMonthlyRecruitmentAdvertisingFee);

        setMonthlyDeposit(responseData.data.monthlyDeposit);
        setMonthlyWorkstation(responseData.data.monthlyWorkstation);
        setMonthlyUtilitiesAmenities(responseData.data.monthlyUtilitiesAmenities);
        setMonthlyItSupportHr(responseData.data.monthlyItSupportHr);
        setMonthlyAccountingPayRoll(responseData.data.monthlyAccountingPayRoll);
        setMonthlyRecruitment(responseData.data.monthlyRecruitment);
        setMonthlyAdvertisement(responseData.data.monthlyAdvertisement);
        setMonthlyServicesPhone(responseData.data.monthlyServicesPhone);
        setMonthlyComputerUpgrade(responseData.data.monthlyComputerUpgrade);
        setMonthyOptiComTaxes(responseData.data.monthyOptiComTaxes);
        setMonthlyThirteenthMonthlyPay(responseData.data.monthlyThirteenthMonthlyPay);
        setMonthlySeperationPay(responseData.data.monthlySeperationPay);
        setMonthlyMedicalInsurance(responseData.data.monthlyMedicalInsurance);

        setAudWorkstation(responseData.data.audWorkstation);
        setAudUtilitiesAmenities(responseData.data.audUtilitiesAmenities);
        setAudItSupportHr(responseData.data.audItSupportHr);
        setAudAccountingPayRoll(responseData.data.audAccountingPayRoll);
        setAudRecruitment(responseData.data.audRecruitment);
        setAudAdvertisement(responseData.data.audAdvertisement);
        setAudServicesPhone(responseData.data.audServicesPhone);
        setAudComputerUpgrade(responseData.data.audComputerUpgrade);
        setAudOptiComTaxes(responseData.data.audOptiComTaxes);
        setAudThirteenthMonthlyPay(responseData.data.audThirteenthMonthlyPay);
        setAudSeperationPay(responseData.data.audSeperationPay);
        setAudMedicalInsurance(responseData.data.audMedicalInsurance);
        setAudTotalYearlySalary(responseData.data.audTotalYearlySalary);
        setAudDeposit(responseData.data.audDeposit);
        setAudTotalSeatingFee(responseData.data.totalSeatingFee);
        setAudtotalRecruitmentAdvertisingFee(responseData.data.totalRecruitmentAdvertisingFee);
        setAudtotalOtherFees(responseData.data.totalOtherFees);

        setAudMonthlyDeposit(responseData.data.audMonthlyDeposit);
        setAudMonthlyWorkstation(responseData.data.audMonthlyWorkstation);
        setAudMonthlyUtilitiesAmenities(responseData.data.audMonthlyUtilitiesAmenities);
        setAudMonthlyItSupportHr(responseData.data.audMonthlyItSupportHr);
        setAudMonthlyAccountingPayRoll(responseData.data.audMonthlyAccountingPayRoll);
        setAudMonthlyRecruitment(responseData.data.audMonthlyRecruitment);
        setAudMonthlyAdvertisement(responseData.data.audMonthlyAdvertisement);
        setAudMonthlyServicesPhone(responseData.data.audMonthlyServicesPhone);
        setAudMonthlyComputerUpgrade(responseData.data.audMonthlyComputerUpgrade);
        setAudMonthlyOptiComTaxes(responseData.data.audMonthlyOptiComTaxes);
        setAudMonthlyThirteenthMonthlyPay(responseData.data.audMonthlyThirteenthMonthlyPay);
        setAudMonthlySeperationPay(responseData.data.audMonthlySeperationPay);
        setAudMonthlyMedicalInsurance(responseData.data.audMonthlyMedicalInsurance);
        setAdditionalCost(responseData.data.additionalCost);
        setCurreny(responseData.data.currency)
        setClient(responseData.data.client)
      } else {
        setError(responseData.message || 'Input Failed. Please check your Input');
        console.error('Input Failed:', responseData.message || 'Unknown error');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Unexpected error during computation Error:', error);

    }
  };

  return (
    <div className="max-w mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className=" flex justify-between max-w mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className=" w-1/4  mr-5">
          <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">New Staff Price</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Client Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Position of the Staff</label>
                <select
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleOnchangeSelectedPosition}>
                  {positions?.map((staffPosition, index: number) => (
                    <option key={index} value={staffPosition.staffPosition}>{staffPosition.staffPosition}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Grade or Level of the Staff</label>
                <select
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleOnchangeSelectedGrade}>
                  {grades?.map((gradeLevel, index: number) => (
                    <option key={index} value={gradeLevel.gradeLevel}>{gradeLevel.gradeLevel}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Salary of Staff</label>
                <select
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleOnchangeSelectedSalary}>
                  {salaries?.map((staffSalary, index: number) => (
                    <option key={index} value={staffSalary.staffSalary}>{staffSalary.staffSalary}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">_______OPTIONAL______</label>

                <DynamicInputFields
                  inputFields={inputFields} setInputFields={setInputFields}
                />

              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
              >
                Calculate
              </button>
            </form>
          </div>
        </div>
        <div className="flex-grow">
          {totalYearlyCost !== null &&
            totalMonthlyCost !== null &&
            depositCost !== null &&
            totalSeatingFee !== null &&
            totalRecruitmentAdvertisingFee !== null &&
            totalOtherFees !== null &&
            yearlySalary !== null &&

            monthlyDeposit !== null &&
            monthlyWorkstation !== null &&
            monthlyUtilitiesAmenities !== null &&
            monthlyItSupportHr !== null &&
            monthlyAccountingPayRoll !== null &&
            monthlyRecruitment !== null &&
            monthlyAdvertisement !== null &&
            monthlyServicesPhone !== null &&
            monthlyComputerUpgrade !== null &&
            monthyOptiComTaxes !== null &&
            monthlyThirteenthMonthlyPay !== null &&
            monthlySeperationPay !== null &&
            monthlyMedicalInsurance !== null &&

            audWorkstation !== null &&
            audUtilitiesAmenities !== null &&
            audItSupportHr !== null &&
            audAccountingPayRoll !== null &&
            audRecruitment !== null &&
            audAdvertisement !== null &&
            audServicesPhone !== null &&
            audComputerUpgrade !== null &&
            audOptiComTaxes !== null &&
            audThirteenthMonthlyPay !== null &&
            audSeperationPay !== null &&
            audMedicalInsurance !== null &&
            audTotalYearlySalary !== null &&
            audDeposit !== null &&
            audTotalSeatingFee !== null &&
            audtotalRecruitmentAdvertisingFee !== null &&
            audtotalOtherFees !== null &&

            audMonthlySalary !== null &&
            audMonthlyDeposit !== null &&
            audMonthlyWorkstation !== null &&
            audMonthlyUtilitiesAmenities !== null &&
            audMonthlyItSupportHr !== null &&
            audMonthlyAccountingPayRoll !== null &&
            audMonthlyRecruitment !== null &&
            audMonthlyAdvertisement !== null &&
            audMonthlyServicesPhone !== null &&
            audMonthlyComputerUpgrade !== null &&
            audMonthlyOptiComTaxes !== null &&
            audMonthlyThirteenthMonthlyPay !== null &&
            audMonthlySeperationPay !== null &&
            audMonthlyMedicalInsurance !== null &&


            workStation !== null &&
            utilitiesAmenities !== null &&
            itSupportHr !== null &&
            accountingPayRoll !== null &&

            staffSalary !== null &&

            recruitment !== null &&
            advertisement !== null &&

            servicesPhone !== null &&
            computerUpgrade !== null &&
            optiCompTaxes !== null &&
            thirteenthMonthPay !== null &&
            seperationPay !== null &&
            medicalInsurance !== null &&

            totalAudYearlyCost !== null &&
            totalAudMonthlyCost !== null &&

            totalMonthlySeatingFee !== null &&
            totalAudSeatingFee !== null &&
            totalAudMonthlySeatingFee !== null &&

            totalMonthlytotalOtherFees !== null &&
            totalAudtotalOtherFees !== null &&
            totalAudMonthlytotalOtherFees !== null &&

            totalMonthlyRecruitmentAdvertisingFee !== null &&
            totalAudRecruitmentAdvertisingFee !== null &&
            totalAudMonthlyRecruitmentAdvertisingFee !== null &&


            !error &&
            (
              <div className="w-3/4 mx-auto bg-white rounded-lg shadow-lg px-8 py-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="/logo.png"
                      alt="Logo"
                      className="h-20 w-45 mr-2 rounded object-cover"
                    />
                  </div>
                  <div className="text-gray-700">
                    <div> </div>
                    <div className="font-bold text-xl mb-2">Quotation</div>
                    <div className="text-sm"><p>Date: {formattedDate}</p></div>
                    <div className="text-sm">No. #{client?.id}</div>
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 pb-8 mb-8">
                  <div className="text-gray-700 font-semibold text-lg mb-10">Optimum Offshoring Inc.</div>
                  <div className="text-gray-700 mb-2">  Name: {client?.name}</div>
                  <div className="text-gray-700 mb-2">Company Name: {client?.company}</div>
                  <div className="text-gray-700 mb-2">Addres: {client?.address}</div>
                  <div className="text-gray-700">Email: {client?.email}</div>
                </div>
                <table className="w-full text-left mb-8">
                  <thead>
                    <tr>
                      <th className="text-gray-700 font-bold uppercase py-2">DEPOSIT</th>
                      <th className="text-gray-700 font-bold uppercase py-2">PHP YEARLY </th>
                      <th className="text-gray-700 font-bold uppercase py-2">PHP Monthly </th>
                      <th className="text-gray-700 font-bold uppercase py-2"> AUD yearly</th>
                      <th className="text-gray-700 font-bold uppercase py-2"> AUD Monthly</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4 text-gray-700">Deposit: </td>
                      <td className="py-4 text-gray-700">{depositCost}</td>
                      <td className="py-4 text-gray-700">{monthlyDeposit}</td>
                      <td className="py-4 text-gray-700">{audDeposit}</td>
                      <td className="py-4 text-gray-700">{audMonthlyDeposit}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">TOTAL: </td>
                      <td className="py-4 text-gray-700">{depositCost}</td>
                      <td className="py-4 text-gray-700">{monthlyDeposit}</td>
                      <td className="py-4 text-gray-700">{audDeposit}</td>
                      <td className="py-4 text-gray-700">{audMonthlyDeposit}</td>
                    </tr>
                  </tbody>

                  <thead>
                    <tr>
                      <th className="text-gray-700 font-bold uppercase py-2">Seating Fees</th>
                      <th className="text-gray-700 font-bold uppercase py-2">PHP YEARLY </th>
                      <th className="text-gray-700 font-bold uppercase py-2">PHP Monthly </th>
                      <th className="text-gray-700 font-bold uppercase py-2"> AUD yearly</th>
                      <th className="text-gray-700 font-bold uppercase py-2"> AUD Monthly</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4 text-gray-700">WorkStation: </td>
                      <td className="py-4 text-gray-700">{workStation}</td>
                      <td className="py-4 text-gray-700">{monthlyWorkstation}</td>
                      <td className="py-4 text-gray-700">{audWorkstation}</td>
                      <td className="py-4 text-gray-700">{audMonthlyWorkstation}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">Utilities & Amenities</td>
                      <td className="py-4 text-gray-700">{utilitiesAmenities}</td>
                      <td className="py-4 text-gray-700">{monthlyUtilitiesAmenities}</td>
                      <td className="py-4 text-gray-700">{audUtilitiesAmenities}</td>
                      <td className="py-4 text-gray-700">{audMonthlyUtilitiesAmenities}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">IT Support, HR </td>
                      <td className="py-4 text-gray-700"> {itSupportHr} </td>
                      <td className="py-4 text-gray-700">{monthlyItSupportHr}</td>
                      <td className="py-4 text-gray-700">{audItSupportHr}</td>
                      <td className="py-4 text-gray-700">{audMonthlyItSupportHr}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">Accounting & Pay Roll</td>
                      <td className="py-4 text-gray-700">{accountingPayRoll}</td>
                      <td className="py-4 text-gray-700">{monthlyAccountingPayRoll}</td>
                      <td className="py-4 text-gray-700">{audAccountingPayRoll}</td>
                      <td className="py-4 text-gray-700">{audMonthlyAccountingPayRoll}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">Total</td>
                      <td className="py-4 text-gray-700">{totalSeatingFee}</td>
                      <td className="py-4 text-gray-700">{totalMonthlySeatingFee}</td>
                      <td className="py-4 text-gray-700">{totalAudSeatingFee}</td>
                      <td className="py-4 text-gray-700">{totalAudMonthlySeatingFee}</td>
                    </tr>
                  </tbody>

                  <thead>
                    <tr>
                      <th className="text-gray-700 font-bold uppercase py-2">Staff Fees</th>
                      <th className="text-gray-700 font-bold uppercase py-2">PHP YEARLY </th>
                      <th className="text-gray-700 font-bold uppercase py-2">PHP Monthly </th>
                      <th className="text-gray-700 font-bold uppercase py-2"> AUD yearly</th>
                      <th className="text-gray-700 font-bold uppercase py-2"> AUD Monthly</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4 text-gray-700">Salary: </td>
                      <td className="py-4 text-gray-700">{yearlySalary}</td>
                      <td className="py-4 text-gray-700">{staffSalary}</td>
                      <td className="py-4 text-gray-700">{audTotalYearlySalary}</td>
                      <td className="py-4 text-gray-700">{audMonthlySalary}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">TOTAL: </td>
                      <td className="py-4 text-gray-700">{yearlySalary}</td>
                      <td className="py-4 text-gray-700">{staffSalary}</td>
                      <td className="py-4 text-gray-700">{audTotalYearlySalary}</td>
                      <td className="py-4 text-gray-700">{audMonthlySalary}</td>
                    </tr>
                  </tbody>

                  <thead>
                    <tr>
                      <th className="text-gray-700 font-bold uppercase py-2">Recruitment Fees</th>
                      <th className="text-gray-700 font-bold uppercase py-2">PHP YEARLY </th>
                      <th className="text-gray-700 font-bold uppercase py-2">PHP Monthly </th>
                      <th className="text-gray-700 font-bold uppercase py-2"> AUD yearly</th>
                      <th className="text-gray-700 font-bold uppercase py-2"> AUD Monthly</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4 text-gray-700">Advertisement </td>
                      <td className="py-4 text-gray-700">{advertisement}</td>
                      <td className="py-4 text-gray-700">{monthlyAdvertisement}</td>
                      <td className="py-4 text-gray-700">{audAdvertisement}</td>
                      <td className="py-4 text-gray-700">{audMonthlyAdvertisement}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">Recruitment: </td>
                      <td className="py-4 text-gray-700">{recruitment}</td>
                      <td className="py-4 text-gray-700">{monthlyRecruitment}</td>
                      <td className="py-4 text-gray-700">{audRecruitment}</td>
                      <td className="py-4 text-gray-700">{audMonthlyRecruitment}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">TOTAL </td>
                      <td className="py-4 text-gray-700"> {totalRecruitmentAdvertisingFee} </td>
                      <td className="py-4 text-gray-700">{totalMonthlyRecruitmentAdvertisingFee}</td>
                      <td className="py-4 text-gray-700">{totalAudRecruitmentAdvertisingFee}</td>
                      <td className="py-4 text-gray-700">{totalAudMonthlyRecruitmentAdvertisingFee}</td>
                    </tr>
                  </tbody>

                  <thead>
                    <tr>
                      <th className="text-gray-700 font-bold uppercase py-2">Other Payments</th>
                      <th className="text-gray-700 font-bold uppercase py-2">PHP YEARLY </th>
                      <th className="text-gray-700 font-bold uppercase py-2">PHP Monthly </th>
                      <th className="text-gray-700 font-bold uppercase py-2"> AUD yearly</th>
                      <th className="text-gray-700 font-bold uppercase py-2"> AUD Monthly</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4 text-gray-700">Service Phone: </td>
                      <td className="py-4 text-gray-700">{servicesPhone}</td>
                      <td className="py-4 text-gray-700">{monthlyServicesPhone}</td>
                      <td className="py-4 text-gray-700">{audServicesPhone}</td>
                      <td className="py-4 text-gray-700">{audMonthlyServicesPhone}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">Computer Upgrade</td>
                      <td className="py-4 text-gray-700">{computerUpgrade}</td>
                      <td className="py-4 text-gray-700">{monthlyComputerUpgrade}</td>
                      <td className="py-4 text-gray-700">{audComputerUpgrade}</td>
                      <td className="py-4 text-gray-700">{audMonthlyComputerUpgrade}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">Opti Company Taxes </td>
                      <td className="py-4 text-gray-700"> {optiCompTaxes} </td>
                      <td className="py-4 text-gray-700">{monthyOptiComTaxes}</td>
                      <td className="py-4 text-gray-700">{audOptiComTaxes}</td>
                      <td className="py-4 text-gray-700">{audMonthlyOptiComTaxes}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">Seperation Pay</td>
                      <td className="py-4 text-gray-700">{seperationPay}</td>
                      <td className="py-4 text-gray-700">{monthlySeperationPay}</td>
                      <td className="py-4 text-gray-700">{audSeperationPay}</td>
                      <td className="py-4 text-gray-700">{audMonthlySeperationPay}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">13th Month Pay</td>
                      <td className="py-4 text-gray-700">{thirteenthMonthPay}</td>
                      <td className="py-4 text-gray-700">{monthlyThirteenthMonthlyPay}</td>
                      <td className="py-4 text-gray-700">{audThirteenthMonthlyPay}</td>
                      <td className="py-4 text-gray-700">{audMonthlyThirteenthMonthlyPay}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">Medical Insurance</td>
                      <td className="py-4 text-gray-700">{medicalInsurance}</td>
                      <td className="py-4 text-gray-700">{monthlyMedicalInsurance}</td>
                      <td className="py-4 text-gray-700">{audMedicalInsurance}</td>
                      <td className="py-4 text-gray-700">{audMonthlyMedicalInsurance}</td>
                    </tr>
                    {additionalCost.map((item: any) => (
                      <tr key={item.id}>
                        <td className="py-4 text-gray-700">{item.name}</td>
                        <td className="py-4 text-gray-700">{item.cost}</td>
                        <td className="py-4 text-gray-700">{item.cost / 12}</td>
                        <td className="py-4 text-gray-700">{(item.cost / (currency?.auCurrency ? currency.auCurrency : 0)).toFixed(2)}</td>
                        <td className="py-4 text-gray-700">{((item.cost / ((currency?.auCurrency ? currency.auCurrency : 0))) / 12).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="py-4 text-gray-700">TOTAL</td>
                      <td className="py-4 text-gray-700">{totalOtherFees}</td>
                      <td className="py-4 text-gray-700">{totalMonthlytotalOtherFees}</td>
                      <td className="py-4 text-gray-700">{totalAudtotalOtherFees}</td>
                      <td className="py-4 text-gray-700">{totalAudMonthlytotalOtherFees}</td>
                    </tr>
                  </tbody>


                  <thead>
                    <tr>
                      <th className="text-gray-700 font-bold uppercase py-2">Total Cost</th>
                      <th className="text-gray-700 font-bold uppercase py-2">PHP YEARLY </th>
                      <th className="text-gray-700 font-bold uppercase py-2">PHP Monthly </th>
                      <th className="text-gray-700 font-bold uppercase py-2"> AUD yearly</th>
                      <th className="text-gray-700 font-bold uppercase py-2"> AUD Monthly</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4 text-gray-700">Deposit: </td>
                      <td className="py-4 text-gray-700">{depositCost}</td>
                      <td className="py-4 text-gray-700">{monthlyDeposit}</td>
                      <td className="py-4 text-gray-700">{audDeposit}</td>
                      <td className="py-4 text-gray-700">{audMonthlyDeposit}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">Seating Fees: </td>
                      <td className="py-4 text-gray-700">{totalSeatingFee}</td>
                      <td className="py-4 text-gray-700">{totalMonthlySeatingFee}</td>
                      <td className="py-4 text-gray-700">{totalAudSeatingFee}</td>
                      <td className="py-4 text-gray-700">{totalAudMonthlySeatingFee}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">Salary</td>
                      <td className="py-4 text-gray-700">{yearlySalary}</td>
                      <td className="py-4 text-gray-700">{staffSalary}</td>
                      <td className="py-4 text-gray-700">{audTotalYearlySalary}</td>
                      <td className="py-4 text-gray-700">{audMonthlySalary}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">Recruitment Fees </td>
                      <td className="py-4 text-gray-700"> {totalRecruitmentAdvertisingFee} </td>
                      <td className="py-4 text-gray-700">{totalMonthlyRecruitmentAdvertisingFee}</td>
                      <td className="py-4 text-gray-700">{totalAudRecruitmentAdvertisingFee}</td>
                      <td className="py-4 text-gray-700">{totalAudMonthlyRecruitmentAdvertisingFee}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">Other Payments</td>
                      <td className="py-4 text-gray-700">{totalOtherFees}</td>
                      <td className="py-4 text-gray-700">{totalMonthlytotalOtherFees}</td>
                      <td className="py-4 text-gray-700">{totalAudtotalOtherFees}</td>
                      <td className="py-4 text-gray-700">{totalAudMonthlytotalOtherFees}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700 font-bold">Total</td>
                      <td className="py-4 text-gray-700 font-bold">{totalYearlyCost}</td>
                      <td className="py-4 text-gray-700 font-bold">{totalMonthlyCost}</td>
                      <td className="py-4 text-gray-700 font-bold">{totalAudYearlyCost}</td>
                      <td className="py-4 text-gray-700 font-bold">{totalAudMonthlyCost}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )

          }
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateNew;
