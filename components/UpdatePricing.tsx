// components/UpdatePricing.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Deposit, SeatingFees} from '@prisma/client';
import EditForm from './EditForm';
import Button from './Button';

const UpdatePricePage: React.FC = () => {
  const [existingDeposit, setExistingDeposit] = useState<Deposit[]>([]);
  const [existingSeatingFees, setExistingSeatingFees] = useState<SeatingFees[]>([]);
  const [editedDepositId, setEditedDepositId] = useState<number | null>(null);
  const [editedSeatingFeeId, setEditedSeatingFeeId] = useState<number | null>(null);
  const [isEditingData, setIsEditingData] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/updatepricing`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      if (data && data.deposits && Array.isArray(data.deposits) && data.seatingFees && Array.isArray(data.seatingFees)) {
        setExistingDeposit(data.deposits);
        setExistingSeatingFees(data.seatingFees);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateDeposit = (id: number) => {
    setEditedDepositId(prevId => (prevId === id ? null : id));
    setIsEditingData(true);
  };

  const handleUpdateSeatingFee = (id: number) => {
    setEditedSeatingFeeId(prevId => (prevId === id ? null : id));
    setIsEditingData(false);
  };

  const handleSave = async (newValues: string[]) => {
    try {
      const endpoint = isEditingData ? '/api/updatepricing/deposit' : '/api/updatepricing/seatingfee';
      const editedItemId = isEditingData ? editedDepositId : editedSeatingFeeId;
      const response = await fetch(`${endpoint}?id=${editedItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newValues: newValues.map(parseFloat) }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update ${isEditingData ? 'deposit' : 'seating fee'}`);
      }
  
      const updatedData = isEditingData
        ? existingDeposit.map(deposit =>
          deposit.id === editedItemId ? { ...deposit, deposit: parseFloat(newValues[0]) } : deposit
        )
        : existingSeatingFees.map(seatingFee =>
          seatingFee.id === editedItemId ? { ...seatingFee, workstation: parseFloat(newValues[0]), utilitiesAmenities: parseFloat(newValues[1]), itSupportHr: parseFloat(newValues[2]), accountingPayRoll: parseFloat(newValues[3]) } : seatingFee
        );
      if (isEditingData) {
        setExistingDeposit(updatedData as Deposit[]);
      } else {
        setExistingSeatingFees(updatedData as SeatingFees[]);
      }
      // Reset the edited item state
      if (isEditingData) {
        setEditedDepositId(null);
      } else {
        setEditedSeatingFeeId(null);
      }
  
    } catch (error) {
      console.error(`Error updating ${isEditingData ? 'deposit' : 'seating fee'}:`, error);
    }
  };

  const handleClose = () => {
    // Reset the edited item state
    setEditedDepositId(null);
    setEditedSeatingFeeId(null);
  };

  return (
    <div className="p-5 h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-8">Update Price</h1>
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Deposit</h3>
          <table className="w-full mb-5">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-100 p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                <th className="w-100 p-3 text-sm font-semibold tracking-wide text-left">Staff Level</th>
                <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">Deposits</th>
                <th className="w-100 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {existingDeposit.map(deposit => (
                <tr className="bg-white" key={`deposit-${deposit.id}`}>
                  <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">{deposit.id}</td>
                  <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{deposit.staffCategoryId}</td>
                  <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{deposit.deposit}</td>
                  <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">
                    {editedDepositId === deposit.id ? (
                      <EditForm
                        id={deposit.id}
                        values={[deposit.deposit.toString()]}
                        onSave={handleSave}
                        onClose={handleClose} />
                    ) : (
                      <Button onClick={() => handleUpdateDeposit(deposit.id)}>Edit</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Seating Fees</h3>
          <table className="w-full mb-5">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-100 p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                <th className="w-100 p-3 text-sm font-semibold tracking-wide text-left">Staff Level</th>
                <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">Workstation Fee</th>
                <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">Utilities & Amenities</th>
                <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">IT Support/Hour</th>
                <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">Accounting/Payroll</th>
                <th className="w-100 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {existingSeatingFees.map(seatingFee => (
                <tr className="bg-white" key={`seatingfee-${seatingFee.id}`}>
                  <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">{seatingFee.id}</td>
                  <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">{seatingFee.staffGradeId}</td>
                  <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{seatingFee.workstation}</td>
                  <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{seatingFee.utilitiesAmenities}</td>
                  <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{seatingFee.itSupportHr}</td>
                  <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{seatingFee.accountingPayRoll}</td>
                  <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">
                    {editedSeatingFeeId === seatingFee.id ? (
                      <EditForm
                        id={seatingFee.id}
                        values={[seatingFee.workstation.toString(), seatingFee.utilitiesAmenities.toString(), seatingFee.itSupportHr.toString(), seatingFee.accountingPayRoll.toString()]}
                        onSave={handleSave}
                        onClose={handleClose} />
                    ) : (
                      <Button onClick={() => handleUpdateSeatingFee(seatingFee.id)}>Edit</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Other tables can be added similarly */}
      </div>
    </div>
  );
};


export default UpdatePricePage;
