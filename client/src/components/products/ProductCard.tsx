import type {RateInterval} from "@/types/RateInterval.ts";

type ProductCardProps = {
    id: string
    title: string
    description: string
    price: number
    productCategoryIds: string[]
    rate: number
    interval: RateInterval
};
const ProductCard = ({
    title,
    description,
    price,
    productCategoryIds,
    rate,
    interval,
}: ProductCardProps) => {
    return (
        <div className="border border-black px-2 py-2">
            <h2>{title}</h2>
            <h4>{description}</h4>
            <h4>${price}</h4>
            <h4>{rate}</h4>
            <div>
                {productCategoryIds.map((categoryId) => (
                    <div key={categoryId}>{categoryId}</div>
                ))}
            </div>
            <h4>{interval}</h4>
        </div>
    );
};
export default ProductCard;
