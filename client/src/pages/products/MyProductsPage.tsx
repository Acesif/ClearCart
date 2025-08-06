import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import type {ProductCardType} from "@/types/ProductCardType.ts";
import {GET_ALL_PRODUCTS_QUERY} from "@/graphql/queries/getAllProducts.ts";
import ProductList from "@/components/products/ProductList.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import usePagination from "@/lib/paginationOptions.ts";
import {PackagePlusIcon} from "lucide-react";

const MyProductsPage: React.FC = () => {
    const [myProducts, setMyProducts] = useState<ProductCardType[]>([]);
    const [maxPage, setMaxPage] = useState(Number.MAX_SAFE_INTEGER);

    const { page, handlePrevious, handleNext } = usePagination({ maxPage });

    const { data, loading } = useQuery(GET_ALL_PRODUCTS_QUERY, {
        variables: {
            page,
            limit: 2,
            sortDirection: 'ASC'
        },
    });

    useEffect(() => {
        if (data?.getAllProducts?.content) {
            setMyProducts(data.getAllProducts.content);
            setMaxPage(data.getAllProducts.totalPages - 1);
        }
    }, [data]);

    return (
        <div className="mt-15 flex flex-col items-center w-full">
            <h1 className="text-3xl mb-2 text-center">
                My Products
            </h1>
            {myProducts.length > 0 && (
                <ProductList
                products={myProducts}
                loading={loading}
                page={page}
                maxPage={maxPage}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
            />)
            }
            <div className="w-full flex justify-center mt-4">
                <Button className="bg-green-800 hover:bg-green-200 hover:text-black cursor-pointer">
                    <Link to={`/myproducts/create`} className="flex gap-3 items-center">
                        <PackagePlusIcon />
                        <span>Add Product</span>
                    </Link>
                </Button>
            </div>
    </div>
    );
};

export default MyProductsPage;
