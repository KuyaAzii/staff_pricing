//components/EditForm.tsx
"use client";
import React, { useState } from "react";

interface EditFormProps {
  id: number;
  values: string[];
  onSave: (newValues: string[]) => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ id, values, onSave, onClose }) => {
  const [newValues, setNewValues] = useState<string[]>(values);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValues = [...newValues];
    updatedValues[index] = e.target.value;
    setNewValues(updatedValues);
  };

  const handleSubmit = () => {
    onSave(newValues);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Edit Values</h2>
        <div className="grid grid-cols-2 gap-4">
          {newValues.map((value, index) => (
            <input
              key={index}
              type="text"
              className="w-full p-2 border rounded"
              value={value}
              onChange={(e) => handleChange(index, e)}
            />
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleSubmit}>
            Save
          </button>
          <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;