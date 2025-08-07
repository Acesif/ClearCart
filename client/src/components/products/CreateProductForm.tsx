import React, { useState } from 'react';
import type {FormData} from "@/types/FormData.ts";
import CreateProductStep1 from "@/components/products/ProductCreationSteps/CreateProductStep1.tsx";
import CreateProductStep2 from "@/components/products/ProductCreationSteps/CreateProductStep2.tsx";
import CreateProductStep3 from "@/components/products/ProductCreationSteps/CreateProductStep3.tsx";
import CreateProductStep4 from "@/components/products/ProductCreationSteps/CreateProductStep4.tsx";
import CreateProductStep5 from "@/components/products/ProductCreationSteps/CreateProductStep5.tsx";

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
                <CreateProductStep1
                    onNext={handleNext}
                    title={title}
                    setTitle={setTitle}
                />
            )}
            {step === 2 && (
                <CreateProductStep2
                    onBack={handleBack}
                    onNext={handleNext}
                    categories={categories}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                />
            )}
            {step === 3 && (
                <CreateProductStep3
                    onBack={handleBack}
                    onNext={handleNext}
                    description={description}
                    setDescription={setDescription}
                />
            )}
            {step === 4 && (
                <CreateProductStep4
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
                <CreateProductStep5
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
