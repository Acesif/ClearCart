import React, { useEffect, useState } from 'react';
import {useQuery} from '@apollo/client';
import type {ProductCardType} from "@/types/ProductCardType.ts";
import ProductList from "@/components/products/ProductList.tsx";
import usePagination from "@/lib/paginationOptions.ts";
import { toast } from 'sonner';
import SEE_BOUGHT_QUERY from "@/graphql/queries/transactions/seeBoughtProducts.ts";

const BoughtProductsPage: React.FC = () => {
    const [myProducts, setMyProducts] = useState<ProductCardType[]>([]);
    const [maxPage, setMaxPage] = useState(Number.MAX_SAFE_INTEGER);
    const { page, handlePrevious, handleNext } = usePagination({ maxPage });

    const {data, loading, error} = useQuery(SEE_BOUGHT_QUERY)

    useEffect(() => {
        if (data?.seeBought?.content) {
            setMyProducts(data.seeBought.content);
            setMaxPage(data.seeBought.totalPages - 1);
        } else {
            console.error(error?.message);
        }
    }, [data,error]);

    if (error) {
        toast.error("No bought products found");
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

export default BoughtProductsPage;
