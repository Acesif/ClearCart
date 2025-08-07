import {type Dispatch, type SetStateAction, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useProductStore} from "@/store/productStore.ts";
import {buttonStyle} from "@/styles/buttonStyle.ts";

interface Step1Props {
    onNext: () => void;
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
}

function CreateProductStep1({ onNext, title, setTitle }: Step1Props) {

    const { createdProductId } = useProductStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!createdProductId) {
            navigate("/myproducts")
        }
    })

    const isInValid = (): boolean => {
        return title.trim() === ''
    }

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
                disabled={isInValid()}
                onClick={onNext}
                className={buttonStyle(isInValid())}
            >
                Next
            </button>
        </div>
    );
}

export default CreateProductStep1;