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
 rate,
 interval,
 productCategoryIds,
}: ProductCardProps) => {
    return (
        <div className="border border-gray-200 rounded-md p-4 shadow-sm w-full max-w-2xl">
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">
                Categories: {productCategoryIds.join(", ")}
            </p>
            <p className="text-sm text-blue-600 font-medium mt-1">Price: ${price}</p>
            <p className="text-sm text-gray-700 mt-1">
                Rate: ${rate} {interval.toLowerCase().replace("_", " ")}
            </p>
            <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                {description}{" "}
                <a href="#" className="text-blue-600 hover:underline">
                    More Details
                </a>
            </p>
            <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                <span>Date posted: 21st Sept 2021</span>
                <span>1028376412 views</span>
            </div>
        </div>
    );
};


export default ProductCard;
