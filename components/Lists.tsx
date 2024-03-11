// components/Lists.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { ClientProfiles } from '@prisma/client';

const Lists = () => {
  const [clientData, setClientData] = useState<ClientProfiles[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); 

  useEffect(() => {
    fetchData();
  }, [currentPage, rowsPerPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/lists?page=${currentPage}&limit=${rowsPerPage}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setClientData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1); 
  };

  async function handleViewPDF(id: number) {
    if (!id || typeof id !== 'number') {
      throw new Error('Invalid Client ID. Please provide a valid number.');
    }
  
    const jsonData = { id }; 
  
    try {
      const response = await fetch('/api/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
      }
  
      const blob = await response.blob(); 
  
      if (!blob) {
        throw new Error('Empty PDF response received');
      }
  
      
      const url = URL.createObjectURL(blob); 
      const link = document.createElement('a');
      link.href = url;
      link.download = `our-pdf-${id}.pdf`; 
      link.click(); 
  

  
    } catch (error) {
      console.error('Error fetching PDF:');
      
    }
  }

  async function handleSecondViewPDF(id: number) {
    if (!id || typeof id !== 'number') {
      throw new Error('Invalid Client ID. Please provide a valid number.');
    }
  
    const jsonData = { id }; 
  
    try {
      const response = await fetch('/api/secondview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
      }
  
      const blob = await response.blob(); 
  
      if (!blob) {
        throw new Error('Empty PDF response received');
      }
  
      
      const url = URL.createObjectURL(blob); 
      const link = document.createElement('a');
      link.href = url;
      link.download = `client-pdf-${id}.pdf`; 
      link.click(); 
  

  
    } catch (error) {
      console.error('Error fetching PDF:');
      
    }
  }
  
  

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/delete?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }
    
      console.log(`Successfully deleted data with ID ${id}`);
     
      fetchData(); 
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  
  

  return (
    <div className="p-5 h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Invoice Lists</h1>
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className=" bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="w-100 p-3 text-sm font-semibold tracking-wide text-left">ID</th>
              <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">Name</th>
              <th className="w-150 p-3 text-sm font-semibold tracking-wide text-left">Company</th>
              <th className="w-100 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clientData.map(client => (
              <tr className="bg-white" key={client.id}>
                <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">{client.id}</td>
                <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{client.name}</td>
                <td className="w-30 p-3 text-sm text-gray-700 whitespace-nowrap">{client.company}</td>
                <td className="w-20 p-3 text-sm text-gray-700 whitespace-nowrap">
                <select
                  onChange={(e) => {
                    const selectedAction = e.target.value;
                    if (selectedAction === 'OurPDF') {
                      handleViewPDF(client.id);
                    } else if (selectedAction === 'ClientPDF') {
                      handleSecondViewPDF(client.id);
                    } else if (selectedAction === 'delete') {
                      handleDelete(client.id);
                    }
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <option value="default">Select Action</option>
                  <option value="OurPDF">Download Our PDF</option>
                  <option value="ClientPDF">Download Client PDF</option>
                  <option value="delete">Delete</option>
                </select>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="mr-2">Rows per page:</span>
            <select
              className="p-2 border border-gray-300 rounded-md"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value="5                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 px-4 py-2 bg-gray-200 rounded-md"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={clientData.length < rowsPerPage}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lists;
