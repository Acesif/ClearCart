import React from "react";
import {CategoryTypeMapping} from "@/types/CategoryTypeMapping.ts";
import Select from "react-select";
import {buttonStyle} from "@/styles/buttonStyle.ts";

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

    const formattedCategories = categories.map(category => ({
        value: category,
        label: CategoryTypeMapping[category]
    }));

    const isInValid = (): boolean => {
        return selectedCategories.length === 0;
    }

    return (
        <div className="bg-gray-100 p-8 rounded-lg w-[50%] mx-auto">
            <h2 className="text-xl font-semibold mb-4">Select categories</h2>
            <Select
                isMulti
                value={formattedCategories.filter(option => selectedCategories.includes(option.value))}
                onChange={selectedOptions => setSelectedCategories(selectedOptions ? selectedOptions.map(option => option.value) : [])}
                options={formattedCategories}
                closeMenuOnSelect={false}
                placeholder="Select categories"
                className="w-full"
                classNamePrefix="react-select"
            />
            <p className="text-sm text-gray-500 mt-2">NOTE: Hold CTRL to select multiple items</p>
            <div className="flex justify-between mt-4">
                <button
                    onClick={onBack}
                    className={buttonStyle(false)}
                >
                    Back
                </button>
                <button
                    disabled={isInValid()}
                    onClick={onNext}
                    className={buttonStyle(isInValid())}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
export default CreateProductStep2;