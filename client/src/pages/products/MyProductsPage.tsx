import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import type {ProductCardType} from "@/types/ProductCardType.ts";
import {GET_ALL_PRODUCTS_QUERY} from "@/graphql/queries/getAllProducts.ts";
import ProductList from "@/components/products/ProductList.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

const MyProductsPage: React.FC = () => {
    const [myProducts, setmyProducts] = useState<ProductCardType[]>([]);
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
            page,
            limit: 2,
            sortDirection: 'ASC'
        },
    });

    useEffect(() => {
        if (data?.getAllProducts?.content) {
            setmyProducts(data.getAllProducts.content);
            setMaxPage(data.getAllProducts.totalPages - 1);
        }
    }, [data]);

    return (
        <div className="mt-15 flex flex-col items-center w-full">
            <h1 className="text-3xl mb-2 text-center">
                My Products
            </h1>
            <div className="flex flex-col items-center w-[40%]">
                <ProductList
                    products={myProducts}
                    loading={loading}
                    page={page}
                    maxPage={maxPage}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                />
                <div className="w-full flex justify-end mt-4">
                    <Button className="bg-green-800 hover:bg-green-200 hover:text-black cursor-pointer">
                        <Link to={`/myproducts/create`}>
                            Add Product
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MyProductsPage;
