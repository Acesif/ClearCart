import type {FormData} from "@/types/FormData.ts";
import {CategoryTypeMapping} from "@/types/CategoryTypeMapping.ts";

interface Step5Props {
    onBack: () => void;
    onSubmit: (formData: FormData) => void;
    title: string;
    description: string;
    selectedCategories: string[];
    price: number;
    rentAmount: number;
    rentOption: string;
}

function CreateProductStep5({
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
            <p><strong>Categories:</strong> {selectedCategories.map(s => CategoryTypeMapping[s]).join(', ')}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>To rent:</strong> ${rentAmount} {rentOption.replace('_', ' ').toUpperCase()}</p>

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
export default CreateProductStep5;