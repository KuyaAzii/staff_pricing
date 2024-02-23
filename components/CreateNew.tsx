//compunents/CreateNew.tsx
"use client";
import {PositionsCategory, StaffCategory, SalaryCategory } from '@prisma/client';
import React, { useState, useEffect } from 'react';

const CreateNew = () => {
  const [totalYearlyCost, setTotalYearlyCost] = useState<number | null>(null);
  const [depositCost, setDepositCost] = useState<number | null>(null);
  const [totalSeatingFee, setTotalSeatingFee] = useState<number | null>(null);
  const [totalSalary, setTotalSalary] = useState<number | null>(null);
  const [totalRecruitmentAdvertisingFee, setTotalRecruitmentAdvertisingFee] = useState<number | null>(null);
  const [totalOtherFees, setTotalOtherFees] = useState<number | null>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [grades, setGrades] = useState<StaffCategory[] | null>(null);
  const [positions, setPositions] = useState<PositionsCategory[] | null>(null);
  const [salaries, setSalaries] = useState<SalaryCategory[] | null>(null);
  const [error, setError] = useState<string | null>(null);
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
          salary: selectedSalary
        }),
      });
      const responseData = await response.json();
      if (response.ok) { 
        console.log('successful');
        setTotalYearlyCost(responseData.data.totalYearlyCost);
        setMonthlyPayment(responseData.data.monthlyPayment);
        setDepositCost(responseData.data.depositCost);
        setTotalSeatingFee(responseData.data.totalSeatingFee);
        setTotalRecruitmentAdvertisingFee(responseData.data.totalRecruitmentAdvertisingFee);
        setTotalOtherFees(responseData.data.totalOtherFees);
        setTotalSalary(responseData.data.totalSalary)
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
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Calculate
        </button>
      </form>
      <div className="mt-4">
        {totalYearlyCost !== null && 
        monthlyPayment !== null && 
        depositCost !== null &&
        totalSeatingFee !== null &&
        totalRecruitmentAdvertisingFee !== null &&
        totalOtherFees !== null &&
        totalSalary !== null &&
         !error && (
          <div>
            <h2 className="text-lg font-semibold">Deposit:      {depositCost}</h2>
            <h2 className="text-lg font-semibold">Seating Fees:  {totalSeatingFee}</h2>
            <h2 className="text-lg font-semibold">Yearly Salary:  {totalSalary}</h2>
            <h2 className="text-lg font-semibold">Recruitment & Advertising Fees:  {totalRecruitmentAdvertisingFee}</h2>
            <h2 className="text-lg font-semibold">Others Payment:  {totalOtherFees}</h2>
            <h2 className="text-lg font-semibold">_____________________________________</h2>
            <h2 className="text-lg font-semibold" >Total Yearly Cost:  {totalYearlyCost}</h2>
            <h2 className="text-lg font-semibold">Monthly Payment:  {monthlyPayment}</h2>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default CreateNew;
