import ProductEditCard from "@/components/products/ProductEditCard.tsx";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import GET_CATEGORIES_QUERY from "@/graphql/queries/products/getAllCategories.ts";
import {type RateInterval, RateIntervals} from "@/types/RateInterval.ts";

const ProductEditPage = () => {

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [rentAmount, setRentAmount] = useState(0);
    const [rentOption, setRentOption] = useState<RateInterval>(RateIntervals.PER_DAY);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState(0);

    const handleSubmit = async () => {}

    const handleNext = () => {}
    const handleBack = () => {}

    const { data } = useQuery(GET_CATEGORIES_QUERY);

    useEffect(() => {
        if (data?.getAllCategories) {
            setCategories(data.getAllCategories);
        }
    }, [data]);

    return (
        <div className="flex justify-center items-center h-[80vh]">
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
        </div>
    );
};
export default ProductEditPage;
