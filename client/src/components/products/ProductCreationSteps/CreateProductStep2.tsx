import React from "react";

interface Step2Props {
    onBack: () => void;
    onNext: () => void;
    categories: string[];
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

function CreateProductStep2({
                   onBack,
                   onNext,
                   categories,
                   selectedCategories,
                   setSelectedCategories,
               }: Step2Props) {
    return (
        <div className="bg-gray-100 p-8 rounded-lg w-[50%] mx-auto">
            <h2 className="text-xl font-semibold mb-4">Select categories</h2>
            <select
                multiple
                value={selectedCategories}
                onChange={(e) =>
                    setSelectedCategories([...e.target.selectedOptions].map((o) => o.value))
                }
                className="w-full p-4 text-lg text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            >
                {categories.map((category, idx) => (
                    <option key={idx} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <p className="text-sm text-gray-500 mt-2">NOTE: Hold CTRL to select multiple items</p>
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
export default CreateProductStep2;