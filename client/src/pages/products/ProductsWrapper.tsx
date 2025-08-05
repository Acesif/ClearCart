import ProductCard from "@/components/products/ProductCard.tsx";
import {RateIntervals} from "@/types/RateInterval.ts";
import Pagination from "@/components/commons/Pagination.tsx";

const ProductsWrapper = () => {
    return (
        <div className="w-full pt-20 flex flex-col items-center justify-center gap-5">
            <ProductCard
                id="product"
                title="Product"
                description="A sample product"
                price={50}
                productCategoryIds={["product1", "product2"]}
                rate={20}
                interval={RateIntervals.PER_DAY}
            />
            <ProductCard
                id="product"
                title="Product"
                description="A sample product"
                price={50}
                productCategoryIds={["product1", "product2"]}
                rate={20}
                interval={RateIntervals.PER_DAY}
            />
            <ProductCard
                id="product"
                title="Product"
                description="A sample product"
                price={50}
                productCategoryIds={["product1", "product2"]}
                rate={20}
                interval={RateIntervals.PER_DAY}
            />
            <div className="absolute bottom-20">
                <Pagination />
            </div>
        </div>
    );
};

export default ProductsWrapper;
