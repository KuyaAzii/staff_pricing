// components/InputField.tsx
import React, { Dispatch, SetStateAction, useState } from 'react';

type PropsType = {
    inputFields: { name: string; cost: string }[], setInputFields: Dispatch<SetStateAction<{ name: string; cost: string }[]>>
}

export default function DynamicInputFields(
    { inputFields, setInputFields }: PropsType) {

    const [showInputFields, setShowInputFields] = useState<boolean>(false);

    const addInputField = () => {
        setInputFields(prevFields => [...prevFields, { name: '', cost: '' }]);
        setShowInputFields(true);
    };

    const handleInputChange = (index: number, fieldName: keyof { name: string; cost: string }, value: string) => {
        const newInputFields = [...inputFields];
        newInputFields[index][fieldName] = value;
        setInputFields(newInputFields);
    };

    const removeInputField = (index: number) => {
        setInputFields(prevFields => prevFields.filter((_, i) => i !== index));
    };

    const clearInputFields = () => {
        setInputFields([]);
        setShowInputFields(false);
    };

    return (
        <div className=" justify-between items-start">
            {showInputFields && (
                <>
                    {inputFields.map((field, index) => (
                        <div key={index} className="sm:flex-row items-center mb-2">
                            <input
                                type="text"
                                placeholder="Title"
                                value={field.name}
                                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                className="mr-2 mb-2 sm:mb-0 p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="How much yearly cost?"
                                value={field.cost}
                                onChange={(e) => handleInputChange(index, 'cost', e.target.value)}
                                className="mr-2 mb-2 sm:mb-0 p-2 border rounded"
                            />
                           <button type="button" onClick={() => removeInputField(index)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-auto">
                                Delete
                            </button>
                        </div>
                    ))}
                </>
            )}

            <button type="button" onClick={addInputField} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-1">
                {showInputFields ? "Add Another Cost" : "Add Other Cost"}
            </button>
            {showInputFields && (
                <>
                    <button type="button" onClick={clearInputFields} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-auto">
                        Clear
                    </button>
                </>
            )}
        </div>
    );
};
