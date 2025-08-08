import CreateProductForm from "@/components/products/CreateProductForm.tsx";
import type {FormData} from "@/types/FormData.ts";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import UPDATE_PRODUCT_MUTATION from "@/graphql/mutations/products/updateProduct.ts";
import {useProductStore} from "@/store/productStore.ts";
import {type RateInterval, RateIntervals} from "@/types/RateInterval.ts";
import GET_CATEGORIES_QUERY from "@/graphql/queries/products/getAllCategories.ts";
import {useNavigate} from "react-router-dom";

const AddProductPage = () => {

    const [step, setStep] = useState(1);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [rentAmount, setRentAmount] = useState(0);
    const [rentOption, setRentOption] = useState<RateInterval>(RateIntervals.PER_DAY);
    const { createdProductId } = useProductStore();

    const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);
    const { data } = useQuery(GET_CATEGORIES_QUERY);
    const navigate = useNavigate();

    const [categories, setCategories] = useState<string[]>([]);

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

    const handleSubmit = async (formData: FormData) => {
        await updateProduct({
            variables: {
                id: createdProductId,
                isDraft: false
            },
        });
        console.log('Form Submitted:', formData);
        navigate("/myproducts?refresh=true");
    };

    useEffect(() => {
        if (data?.getAllCategories) {
            setCategories(data.getAllCategories);
        }
    }, [data]);

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
