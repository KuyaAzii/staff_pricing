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

    const saveInputFields = async () => {
        try {
            const response = await fetch('/api/additionalCost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputFields),
            });


            if (!response.ok) {
                throw new Error('Failed to save input fields');
            }

            console.log('Input fields saved successfully');
        } catch (error) {
            console.error('Error saving input fields:', error);
        }
    };

    return (
        <div>
            {showInputFields && (
                <>
                    {inputFields.map((field, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                placeholder="Title"
                                value={field.name}
                                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                className="mr-2 p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="How much yearly cost?"
                                value={field.cost}
                                onChange={(e) => handleInputChange(index, 'cost', e.target.value)}
                                className="mr-2 p-2 border rounded"
                            />
                            <button type="button" onClick={() => removeInputField(index)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                                Delete
                            </button>
                        </div>
                    ))}
                </>
            )}

            <button type="button" onClick={addInputField} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                {showInputFields ? "Add Another Cost" : "Add Other Cost"}
            </button>
            {showInputFields && (
                <>
                    <button type="button" onClick={clearInputFields} className="bg-white text-gray-800 font-bold py-2 px-4 rounded ml-2">
                        Clear
                    </button>
                    <button type="button" onClick={saveInputFields} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2">
                        Save
                    </button>
                </>
            )}
        </div>
    );
};

