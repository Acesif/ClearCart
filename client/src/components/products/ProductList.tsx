import React from 'react';
import type {ProductCardType} from "@/types/ProductCardType.ts";
import ProductCard from "@/components/products/ProductCard.tsx";
import Pagination from "@/components/commons/Pagination.tsx";
import Loader from "@/components/commons/Loader.tsx";

interface ProductListProps {
    products: ProductCardType[];
    loading: boolean;
    page: number;
    maxPage: number;
    handlePrevious: () => void;
    handleNext: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
                                                     products,
                                                     loading,
                                                     page,
                                                     handlePrevious,
                                                     handleNext,
                                                 }) => {
    return (
        <div className="w-full pt-10 flex flex-col items-center justify-center gap-5">
            {loading ? (
                <div className="mt-50 flex justify-center">
                    <Loader className="w-10 h-10" />
                </div>
            ) : (
                products.length > 0 ? (
                    <>
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                description={product.description}
                                price={product.price}
                                productCategoryIds={product.productCategoryIds}
                                rate={product.rate}
                                interval={product.interval}
                            />
                        ))}
                    </>
                ) : (
                    <div className="text-red-700 mt-70">No products found</div>
                )
            )}

            <div className="absolute bottom-20">
                <Pagination initialPage={page} handlePrevious={handlePrevious} handleNext={handleNext} />
            </div>
        </div>
    );
};

export default ProductList;
