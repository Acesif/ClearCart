import {buttonStyle} from "@/styles/buttonStyle.ts";
import type {ProductCardType} from "@/types/ProductCardType.ts";
import {CategoryTypeMapping} from "@/types/CategoryTypeMapping.ts";

const ProductDetailsCard = ({
    id,
    title,
    description,
    price,
    productCategoryIds,
    rate,
    interval
}: ProductCardType) => {
    return (
        <div id={id} className="bg-white p-8 rounded-lg shadow-lg w-[50%]">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h1>
            <p className="text-gray-600 mb-2">Categories:
                <span className="font-semibold text-gray-800"> {productCategoryIds.map(c => CategoryTypeMapping[c]).join(", ")}</span>
            </p>
            <p className="text-gray-600 mb-4">Price: <span className="font-semibold text-gray-800">${price}</span></p>
            <p className="text-gray-600 mb-4">Rent:
                <span className="font-semibold text-gray-800"> ${rate}</span> {interval.split("_").join(" ")}
            </p>
            <p className="text-gray-700 mb-4">
                {description}
            </p>
            <div className="flex justify-end space-x-4">
                <button className={buttonStyle(false)}>
                    Rent
                </button>
                <button className={buttonStyle(false)}>
                    Buy
                </button>
            </div>
        </div>
    );
};
export default ProductDetailsCard;
