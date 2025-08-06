import ProductCard from "@/components/products/ProductCard.tsx";
import Pagination from "@/components/commons/Pagination.tsx";
import {useEffect, useState} from "react";
import type {ProductCardType} from "@/types/ProductCardType.ts";
import {GET_ALL_PRODUCTS_QUERY} from "@/graphql/queries/getAllProducts.ts";
import {useQuery} from "@apollo/client";

const ProductsWrapper = () => {

    const [products, setProducts] = useState<ProductCardType[]>([]);
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(Number.MAX_SAFE_INTEGER);

    const handlePrevious = () => {
        setPage((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        if (page < maxPage) {
            setPage((prev) => prev + 1);
        }
    };

    const { data, loading } = useQuery(GET_ALL_PRODUCTS_QUERY, {
        variables: {
            page: page,
            limit: 2,
            sortDirection: 'ASC',
        },
    });

    useEffect(() => {
        if (data?.getAllProducts?.content) {
            setProducts(data.getAllProducts.content);
            setMaxPage(data.getAllProducts.totalPages - 1);
        }
    }, [data, setMaxPage]);

    return (
        <div className="w-full pt-10 flex flex-col items-center justify-center gap-5">
            <h1 className="text-3xl mb-2">ALL PRODUCTS</h1>
            <>
                {loading ? (
                    <div className="mt-50 flex justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-blue-500 border-gray-300" />
                    </div>
                ) : (
                    products.length > 0 ? (
                        <>
                            {products?.map((product: ProductCardType) => (
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
                        <>
                            <div className="text-red-700 mt-70">No products found</div>
                        </>
                    )
                )}
            </>
            <div className="absolute bottom-20">
                <Pagination initialPage={page} handlePrevious={handlePrevious} handleNext={handleNext} />
            </div>
        </div>
    );
};

export default ProductsWrapper;
