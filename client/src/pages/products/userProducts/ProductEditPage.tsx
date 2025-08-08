import ProductEditCard from "@/components/products/ProductEditCard.tsx";
import { useEffect, useState } from "react";
import {useMutation, useQuery} from "@apollo/client";
import GET_CATEGORIES_QUERY from "@/graphql/queries/products/getAllCategories.ts";
import {type RateInterval, RateIntervals} from "@/types/RateInterval.ts";
import {useNavigate, useParams} from "react-router-dom";
import { GET_PRODUCT } from "@/graphql/queries/products/getProduct.ts";
import { toast } from "sonner";
import type { ProductCardType } from "@/types/ProductCardType.ts";
import Loader from "@/components/commons/Loader.tsx";
import type {FormData} from "@/types/FormData.ts";
import UPDATE_PRODUCT_MUTATION from "@/graphql/mutations/products/updateProduct.ts";

const ProductEditPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { data: productData, error, loading } = useQuery(GET_PRODUCT, {
        variables: { id: productId },
    });

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [rentAmount, setRentAmount] = useState<number>(0);
    const [rentOption, setRentOption] = useState<RateInterval>(RateIntervals.PER_DAY);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);

    if (error) {
        toast.error(error.message);
    }

    useEffect(() => {
        if (productData?.getProduct?.data) {
            const product: ProductCardType = productData.getProduct.data;
            setRentAmount(product.rate);
            setRentOption(product.interval);
            setTitle(product.title);
            setDescription(product.description);
            setPrice(product.price);
            setSelectedCategories(product.productCategoryIds)
        }
    }, [productData]);

    const { data } = useQuery(GET_CATEGORIES_QUERY);
    const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);

    useEffect(() => {
        if (data?.getAllCategories) {
            setCategories(data.getAllCategories);
        }
    }, [data]);

    const handleSubmit = async (formData: FormData) => {
        await updateProduct({
            variables: {
                id: productId,
                title: formData.title,
                description: formData.description,
                productCategoryIds: formData.selectedCategories,
                price: formData.price,
                rate: formData.rentAmount,
                interval: formData.rentOption,
            },
        });
        console.log('Form Submitted:', formData);
        navigate("/myproducts?refresh=true");
    };
    const handleNext = () => {};
    const handleBack = () => {};

    return (
        <div className="flex justify-center items-center h-[80vh]">
            {loading ? (
                <Loader className="w-10 h-10"/>
            ) : (
                <ProductEditCard
                    step={0}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    handleSubmit={handleSubmit}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    price={price}
                    setPrice={setPrice}
                    categories={categories}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    rentAmount={rentAmount}
                    setRentAmount={setRentAmount}
                    rentOption={rentOption}
                    setRentOption={setRentOption}
                />
            )}
        </div>
    );
};

export default ProductEditPage;
