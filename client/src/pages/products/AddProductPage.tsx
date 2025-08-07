import CreateProductForm from "@/components/products/CreateProductForm.tsx";
import type {FormData} from "@/types/FormData.ts";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import UPDATE_PRODUCT_MUTATION from "@/graphql/mutations/products/updateProduct.ts";
import {useProductStore} from "@/store/productStore.ts";
import {type RateInterval, RateIntervals} from "@/types/RateInterval.ts";

const AddProductPage = () => {

    const [step, setStep] = useState(1);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [price, setPrice] = useState(0);
    const [rentAmount, setRentAmount] = useState(0);
    const [rentOption, setRentOption] = useState<RateInterval>(RateIntervals.PER_DAY);
    const { createdProductId } = useProductStore();

    const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);

    const [categories] = useState<string[]>(['Electronics', 'Furniture', 'Clothing', 'Accessories']);

    const handleNext = async () => {
        await updateProduct({
            variables: {
                id: createdProductId,
                title,
                description,
                price,
                productCategoryIds: selectedCategories,
                rate: rentAmount,
                interval: rentOption,
            },
        });
        setStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => setStep((prevStep) => prevStep - 1);

    const handleSubmit = (formData: FormData) => {
        console.log('Form Submitted:', formData);
    };


    return (
        <CreateProductForm
            step={step}
            title={title}
            description={description}
            setDescription={setDescription}
            setTitle={setTitle}
            handleNext={handleNext}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            categories={categories}
            price={price}
            setPrice={setPrice}
            rentAmount={rentAmount}
            setRentAmount={setRentAmount}
            rentOption={rentOption}
            setRentOption={setRentOption}
        />
    );
};
export default AddProductPage;
