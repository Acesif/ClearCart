import React, {useEffect} from "react";
import {useProductContext} from "@/components/context/ProductContext.tsx";
import {useNavigate} from "react-router-dom";

interface Step1Props {
    onNext: () => void;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}

function CreateProductStep1({ onNext, title, setTitle }: Step1Props) {

    const { createdProductId } = useProductContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!createdProductId) {
            navigate("/myproducts")
        }
    })

    return (
        <div className="bg-gray-100 p-8 rounded-lg w-[50%] mx-auto flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Select a title for your product</h2>
            <p className="mb-4">Draft ID: {createdProductId}</p>
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

export default CreateProductStep1;