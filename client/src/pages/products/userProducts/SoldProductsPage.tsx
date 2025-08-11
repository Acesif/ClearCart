import React, { useEffect, useState } from 'react';
import type {ProductCardType} from "@/types/ProductCardType.ts";
import ProductList from "@/components/products/ProductList.tsx";
import usePagination from "@/lib/paginationOptions.ts";
import SEE_SOLD_QUERY from "@/graphql/queries/transactions/seeSoldProducts.ts";
import {useQuery} from "@apollo/client";
import {toast} from "sonner";

const SoldProductsPage: React.FC = () => {
    const [myProducts, setMyProducts] = useState<ProductCardType[]>([]);
    const [maxPage, setMaxPage] = useState(Number.MAX_SAFE_INTEGER);
    const { page, handlePrevious, handleNext } = usePagination({ maxPage });

    const { data, loading, error } = useQuery(SEE_SOLD_QUERY, {
        variables: {
            page,
            limit: 2,
            sortDirection: 'ASC'
        }
    });

    useEffect(() => {
        if (data?.seeSold?.content) {
            const productsOnly = data.seeSold.content.map((t: any) => t.product);

            const uniqueProducts = Array.from(
                new Map(productsOnly.map((p: ProductCardType) => [p.id, p])).values()
            );

            const normalized = uniqueProducts.map((p: any) => ({
                ...p,
                productCategoryIds: p.productCategoryIds ?? [],
            }));

            setMyProducts(normalized);
            setMaxPage(data.seeSold.totalPages - 1);
        } else {
            console.error(error?.message)
        }
    }, [data, error]);

    if (error) {
        toast.error("No sold products found");
    }

    return (
        <div className="mt-15 flex flex-col items-center w-full">
            <h1 className="text-3xl mb-2 text-center">
                My Products
            </h1>
            <ProductList
                products={myProducts}
                loading={loading}
                page={page}
                maxPage={maxPage}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
            />
        </div>
    );
};

export default SoldProductsPage;
