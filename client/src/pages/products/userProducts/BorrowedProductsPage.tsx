import React, { useEffect, useState } from 'react';
import type {ProductCardType} from "@/types/ProductCardType.ts";
import ProductList from "@/components/products/ProductList.tsx";
import usePagination from "@/lib/paginationOptions.ts";
import SEE_BORROWED_QUERY from "@/graphql/queries/transactions/seeBorrowedProducts.ts";
import {useQuery} from "@apollo/client";
import { toast } from 'sonner';

const BorrowedProductsPage: React.FC = () => {
    const [myProducts, setMyProducts] = useState<ProductCardType[]>([]);
    const [maxPage, setMaxPage] = useState(Number.MAX_SAFE_INTEGER);
    const { page, handlePrevious, handleNext } = usePagination({ maxPage });

    const {data, loading, error} = useQuery(SEE_BORROWED_QUERY)

    useEffect(() => {
        if (data?.seeBorrowed?.content) {
            setMyProducts(data.seeBorrowed.content);
            setMaxPage(data.seeBorrowed.totalPages - 1);
        } else {
            console.error(error?.message);
        }
    }, [data, error]);

    if (error) {
        toast.error("No products borrowed");
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

export default BorrowedProductsPage;
