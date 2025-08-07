import CreateProductStep1 from "@/components/products/ProductCreationSteps/CreateProductStep1.tsx";
import CreateProductStep2 from "@/components/products/ProductCreationSteps/CreateProductStep2.tsx";
import CreateProductStep3 from "@/components/products/ProductCreationSteps/CreateProductStep3.tsx";
import CreateProductStep4 from "@/components/products/ProductCreationSteps/CreateProductStep4.tsx";
import CreateProductStep5 from "@/components/products/ProductCreationSteps/CreateProductStep5.tsx";
import type {createProductFormProps} from "@/types/createProductFormProps.ts";


function CreateProductForm({
   step,
   title,
   description,
   setTitle,
   setDescription,
   handleNext,
   handleBack,
   handleSubmit,
   selectedCategories,
   setSelectedCategories,
   categories,
   price,
   setPrice,
   rentAmount,
   setRentAmount,
   rentOption,
   setRentOption
}: createProductFormProps) {

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
}

export default CreateProductForm;
