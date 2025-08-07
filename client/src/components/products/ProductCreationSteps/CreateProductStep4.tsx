import React from "react";

interface Step4Props {
    onBack: () => void;
    onNext: () => void;
    price: string;
    setPrice: React.Dispatch<React.SetStateAction<string>>;
    rentAmount: string;
    setRentAmount: React.Dispatch<React.SetStateAction<string>>;
    rentOption: string;
    setRentOption: React.Dispatch<React.SetStateAction<string>>;
}

function CreateProductStep4({
                   onBack,
                   onNext,
                   price,
                   setPrice,
                   rentAmount,
                   setRentAmount,
                   rentOption,
                   setRentOption,
               }: Step4Props) {

    return (
        <div className="bg-gray-100 p-8 rounded-lg w-[50%] mx-auto">
            <h2 className="text-xl font-semibold mb-4">Select price</h2>
            <input
                type="number"
                placeholder="Purchase price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-4 text-lg text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 mb-4"
            />
            <div className="flex space-x-4">
                <div className="w-1/2">
                    <label className="block text-gray-800">Rent:</label>
                    <input
                        type="number"
                        placeholder="Rent"
                        value={rentAmount}
                        onChange={(e) => setRentAmount(e.target.value)}
                        className="w-full p-4 text-lg text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-gray-800">Select option</label>
                    <select
                        value={rentOption}
                        onChange={(e) => setRentOption(e.target.value)}
                        className="w-full p-4 text-lg text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    >
                        <option value="">Select option</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
            </div>
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
export default CreateProductStep4;