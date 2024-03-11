// components/UpdatePricing.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Deposit, SeatingFees, RecruitmentFees, OtherPayments, Currency } from '@prisma/client';
import EditForm from './EditForm';
import Button from './Button';
import numeral from 'numeral';

numeral.defaultFormat('0,0.00');
const UpdatePricePage: React.FC = () => {
  const [existingDeposit, setExistingDeposit] = useState<Deposit[]>([]);
  const [existingSeatingFees, setExistingSeatingFees] = useState<SeatingFees[]>([]);
  const [existingRecruitmentFees, setExistingRecruitmentFees] = useState<RecruitmentFees[]>([]);
  const [existingOtherPayments, setExistingOtherPayments] = useState<OtherPayments[]>([]);
  const [existingCurrencies, setExistingCurrencies] = useState<Currency[]>([]);
  
  const [editedDepositId, setEditedDepositId] = useState<number | null>(null);
  const [editedSeatingFeeId, setEditedSeatingFeeId] = useState<number | null>(null);
  const [editedRecruitmentFeeId, setEditedRecruitmentFeeId] = useState<number | null>(null);
  const [editedOtherPaymentId, setEditedOtherPaymentId] = useState<number | null>(null);
  const [editedCurrencyId, setEditedCurrencyId] = useState<number | null>(null);

 const [isEditingData, setIsEditingData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/updatepricing`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        if (
          data &&
          data.deposits &&
          Array.isArray(data.deposits) &&
          data.seatingFees &&
          Array.isArray(data.seatingFees) &&
          data.recruitmentFees &&
          Array.isArray(data.recruitmentFees) &&
          data.otherPayments &&
          Array.isArray(data.otherPayments) &&
          data.currencies &&
          Array.isArray(data.currencies)
        ) {
          setExistingDeposit(data.deposits);
          setExistingSeatingFees(data.seatingFees);
          setExistingRecruitmentFees(data.recruitmentFees);
          setExistingOtherPayments(data.otherPayments);
          setExistingCurrencies(data.currencies);
        } else {
          console.error('Invalid data format:', data);
          setError('Invalid data format');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

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

  const handleUpdateRecruitmentFee = (id: number) => {
    setEditedRecruitmentFeeId(prevId => (prevId === id ? null : id));
    setIsEditingData(false);
  };

  const handleUpdateOtherPayment = (id: number) => {
    setEditedOtherPaymentId(prevId => (prevId === id ? null : id));
    setIsEditingData(false);
  };

  const handleUpdateCurrency = (id: number) => {
    setEditedCurrencyId(prevId => (prevId === id ? null : id));
    setIsEditingData(false);
  };


  const handleSave = async (newValues: string[], type: string, itemId: number) => {
    try {
      const response = await fetch(`/api/updatepricing`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: itemId, type, newValues }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update ${type}`);
      }
  
      switch (type) {
        case 'deposit':
          setExistingDeposit(prev => {
            return prev.map(item => (item.id === itemId ? { ...item, deposit: parseFloat(newValues[0]) } : item));
          });
          break;
        case 'seatingFee':
          setExistingSeatingFees(prev => {
            return prev.map(item =>
              item.id === itemId
                ? {
                    ...item,
                    workstation: parseFloat(newValues[0]),
                    utilitiesAmenities: parseFloat(newValues[1]),
                    itSupportHr: parseFloat(newValues[2]),
                    accountingPayRoll: parseFloat(newValues[3]),
                  }
                : item
            );
          });
          break;
        case 'recruitmentFee':
          setExistingRecruitmentFees(prev => {
            return prev.map(item =>
              item.id === itemId
                ? { ...item, advertisement: parseFloat(newValues[0]), recruitment: parseFloat(newValues[1]) }
                : item
            );
          });
          break;
        case 'otherPayment':
          setExistingOtherPayments(prev => {
            return prev.map(item =>
              item.id === itemId
                ? {
                    ...item,
                    servicesPhone: parseFloat(newValues[0]),
                    computerUpgrade: parseFloat(newValues[1]),
                    optiCompTaxes: parseFloat(newValues[2]),
                    medicalInsurance: parseFloat(newValues[3]),
                  }
                : item
            );
          });
          break;
        case 'currency':
          setExistingCurrencies(prev => {
            return prev.map(item => (item.id === itemId ? { ...item, currency: parseFloat(newValues[0]) } : item));
          });
          break;
        default:
          throw new Error(`Invalid item type: ${type}`);
      }
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };
  
  

  const handleClose = () => {
    // Reset the edited item state
    setEditedDepositId(null);
    setEditedSeatingFeeId(null);
    setEditedRecruitmentFeeId(null);
    setEditedOtherPaymentId(null);
    setEditedCurrencyId(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-5 full-screen bg-white">
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
                  <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{numeral(deposit.deposit).format()}</td>
                  <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">
                    {editedDepositId === deposit.id ? (
                      <EditForm
                        id={deposit.id}
                        valueNames={['Deposit']}
                        values={[deposit.deposit.toString()]}
                        onSave={(newValues) => handleSave(newValues, 'deposit', deposit.id)}
                        onClose={handleClose}
                      />

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
                <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">IT Support/Hr</th>
                <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">Accounting/Payroll</th>
                <th className="w-100 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {existingSeatingFees.map(seatingFee => (
                <tr className="bg-white" key={`seatingfee-${seatingFee.id}`}>
                  <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">{seatingFee.id}</td>
                  <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">{seatingFee.staffGradeId}</td>
                  <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{numeral(seatingFee.workstation).format()}</td>
                  <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{numeral(seatingFee.utilitiesAmenities).format()}</td>
                  <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{numeral(seatingFee.itSupportHr).format()}</td>
                  <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{numeral(seatingFee.accountingPayRoll).format()}</td>
                  <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">
                    {editedSeatingFeeId === seatingFee.id ? (
                      <EditForm
                        id={seatingFee.id}
                        valueNames={['Workstation Fee', 'Utilities & Amenities', 'IT Support/Hr', 'Accounting/Payroll']}
                        values={[
                          seatingFee.workstation.toString(),
                          seatingFee.utilitiesAmenities.toString(),
                          seatingFee.itSupportHr.toString(),
                          seatingFee.accountingPayRoll.toString(),
                        ]}
                        onSave={(newValues) => handleSave(newValues, 'seatingFee', seatingFee.id)}
                        onClose={handleClose}
                      />
                    ) : (
                      <Button onClick={() => handleUpdateSeatingFee(seatingFee.id)}>Edit</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Recruitment Fees</h3>
              <table className="w-full mb-5">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="w-100 p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                    <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">Advertisement</th>
                    <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">Recruitment</th>
                    <th className="w-100 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {existingRecruitmentFees.map(recruitmentFee => (
                    <tr className="bg-white" key={`recruitmentfee-${recruitmentFee.id}`}>
                      <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">{recruitmentFee.id}</td>
                      <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{numeral(recruitmentFee.advertisement).format()}</td>
                      <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{numeral(recruitmentFee.recruitment).format()}</td>
                      <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">
                        {editedRecruitmentFeeId === recruitmentFee.id ? (
                          <EditForm
                            id={recruitmentFee.id}
                            valueNames={['Advertisement', 'Recruitment']}
                            values={[
                               recruitmentFee.advertisement.toString(),
                               recruitmentFee.recruitment.toString(),
                              ]}
                            onSave={(newValues) => handleSave(newValues, 'recruitmentFee', recruitmentFee.id)}
                            onClose={handleClose}
                          />
                        ) : (
                          <Button onClick={() => handleUpdateRecruitmentFee(recruitmentFee.id)}>Edit</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Other Payments</h3>
              <table className="w-full mb-5">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="w-100 p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                    <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">Services Phone</th>
                    <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">Computer Upgrade</th>
                    <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">OptiComp Taxes</th>
                    <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">Medical Insurance</th>
                    <th className="w-100 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {existingOtherPayments.map(otherPayment => (
                    <tr className="bg-white" key={`otherpayment-${otherPayment.id}`}>
                      <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">{otherPayment.id}</td>
                      <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{numeral(otherPayment.servicesPhone).format()}</td>
                      <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{numeral(otherPayment.computerUpgrade).format()}</td>
                      <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{numeral(otherPayment.optiCompTaxes).format()}</td>
                      <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{numeral(otherPayment.medicalInsurance).format()}</td>
                      <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">
                        {editedOtherPaymentId === otherPayment.id ? (
                          <EditForm
                            id={otherPayment.id}
                            valueNames={['Services Phone', 'Computer Upgrade', 'OptiComp Taxes', 'Medical Insurance']}
                            values={[
                              otherPayment.servicesPhone.toString(),
                              otherPayment.computerUpgrade.toString(),
                              otherPayment.optiCompTaxes.toString(),
                              otherPayment.medicalInsurance.toString(),
                            ]}
                            onSave={(newValues) => handleSave(newValues, 'otherPayment', otherPayment.id)}
                            onClose={handleClose}
                          />
                        ) : (
                          <Button onClick={() => handleUpdateOtherPayment(otherPayment.id)}>Edit</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Currencies</h3>
                <table className="w-full mb-5">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="w-100 p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                      <th className="w-200 p-3 text-sm font-semibold tracking-wide text-left">Country</th>
                      <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">Currency</th>
                      <th className="w-100 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {existingCurrencies.map(currency => (
                      <tr className="bg-white" key={`currency-${currency.id}`}>
                        <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">{currency.id}</td>
                        <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{currency.country}</td>
                        <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{numeral(currency.currency).format()}</td>
                        <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">
                          {editedCurrencyId === currency.id ? (
                            <EditForm
                              id={currency.id}
                              valueNames={['Country', 'Currency']}
                              values={[ 
                                currency.currency.toString(),
                              ]}
                              onSave={(newValues) => handleSave(newValues, 'currency', currency.id)}
                              onClose={handleClose}
                            />
                          ) : (
                            <Button onClick={() => handleUpdateCurrency(currency.id)}>Edit</Button>
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
