import type {RateInterval} from "@/types/RateInterval.ts";
import {Link} from "react-router-dom";
import {CategoryTypeMapping} from "@/types/CategoryTypeMapping.ts";

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
 id,
 title,
 description,
 price,
 rate,
 interval,
 productCategoryIds,
}: ProductCardProps) => {
    return (
        <div className="border border-gray-200 rounded-md p-4 shadow-sm w-full max-w-2xl">
            <Link to={`/products/${id}`} >
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Categories: {productCategoryIds.map(p => CategoryTypeMapping[p]).join(", ")}
                </p>
                <p className="text-sm text-blue-600 font-medium mt-1">Price: ${price}</p>
                <p className="text-sm text-gray-700 mt-1">
                    Rate: ${rate} {interval.toLowerCase().replace("_", " ")}
                </p>
                <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                    Description: {description}{" "}
                </p>
                <Link to={`/products/${id}`} className="text-blue-600 hover:underline text-xs">
                    More Details
                </Link>
                <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                    <span>Date posted: 21st Sept 2021</span>
                    <span>1028376412 views</span>
                </div>
            </Link>
        </div>
    );
};


export default ProductCard;
