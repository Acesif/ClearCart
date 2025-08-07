import React from "react";

interface Step3Props {
    onBack: () => void;
    onNext: () => void;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
}

function CreateProductStep3({ onBack, onNext, description, setDescription }: Step3Props) {
    return (
        <div className="bg-gray-100 p-8 rounded-lg w-[50%] mx-auto">
            <h2 className="text-xl font-semibold mb-4">Select description</h2>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full h-80 p-4 text-lg text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
            <div className="flex justify-between mt-4">
                <button
                    onClick={onBack}
                    className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
export default CreateProductStep3;