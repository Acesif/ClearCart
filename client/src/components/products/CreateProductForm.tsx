import React, { useState } from 'react';

interface Step1Props {
    onNext: () => void;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}

function Step1({ onNext, title, setTitle }: Step1Props) {
    return (
        <div className="bg-gray-100 p-8 rounded-lg w-[50%] mx-auto flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Select a title for your product</h2>
            <input
                type="text"
                className="w-full p-4 text-lg text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product title"
            />
            <button
                onClick={onNext}
                className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 self-end"
            >
                Next
            </button>
        </div>
    );
}

interface Step2Props {
    onBack: () => void;
    onNext: () => void;
    categories: string[];
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

function Step2({
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


interface Step3Props {
    onBack: () => void;
    onNext: () => void;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
}

function Step3({ onBack, onNext, description, setDescription }: Step3Props) {
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

function Step4({
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

interface FormData {
    title: string;
    description: string;
    selectedCategories: string[];
    price: string;
    rentAmount: string;
    rentOption: string;
}

interface Step5Props {
    onBack: () => void;
    onSubmit: (formData: FormData) => void;
    title: string;
    description: string;
    selectedCategories: string[];
    price: string;
    rentAmount: string;
    rentOption: string;
}

function Step5({
                   onBack,
                   onSubmit,
                   title,
                   description,
                   selectedCategories,
                   price,
                   rentAmount,
                   rentOption,
               }: Step5Props) {
    return (
        <div className="bg-gray-100 p-8 rounded-lg w-[50%] mx-auto">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <p><strong>Title:</strong> {title}</p>
            <p><strong>Categories:</strong> {selectedCategories.join(', ')}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>To rent:</strong> ${rentAmount} {rentOption}</p>

            <div className="flex justify-between mt-4">
                <button
                    onClick={onBack}
                    className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                    Back
                </button>
                <button
                    onClick={() =>
                        onSubmit({ title, description, selectedCategories, price, rentAmount, rentOption })
                    }
                    className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

const CreateProductForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [categories] = useState<string[]>(['Electronics', 'Furniture', 'Clothing', 'Accessories']);
    const [price, setPrice] = useState('');
    const [rentAmount, setRentAmount] = useState('');
    const [rentOption, setRentOption] = useState('');

    const handleNext = () => setStep((prevStep) => prevStep + 1);
    const handleBack = () => setStep((prevStep) => prevStep - 1);

    const handleSubmit = (formData: FormData) => {
        console.log('Form Submitted:', formData);
    };

    return (
        <div className="flex flex-col items-center justify-center h-[80vh] w-screen">
            {step === 1 && (
                <Step1 onNext={handleNext} title={title} setTitle={setTitle} />
            )}
            {step === 2 && (
                <Step2
                    onBack={handleBack}
                    onNext={handleNext}
                    categories={categories}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                />
            )}
            {step === 3 && (
                <Step3 onBack={handleBack} onNext={handleNext} description={description} setDescription={setDescription} />
            )}
            {step === 4 && (
                <Step4
                    onBack={handleBack}
                    onNext={handleNext}
                    price={price}
                    setPrice={setPrice}
                    rentAmount={rentAmount}
                    setRentAmount={setRentAmount}
                    rentOption={rentOption}
                    setRentOption={setRentOption}
                />
            )}
            {step === 5 && (
                <Step5
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    title={title}
                    description={description}
                    selectedCategories={selectedCategories}
                    price={price}
                    rentAmount={rentAmount}
                    rentOption={rentOption}
                />
            )}
        </div>
    );
};

export default CreateProductForm;
