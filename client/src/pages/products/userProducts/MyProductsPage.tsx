import React, { useEffect, useState } from 'react';
import {useMutation, useQuery} from '@apollo/client';
import type {ProductCardType} from "@/types/ProductCardType.ts";
import {ADD_PRODUCT_MUTATION} from "@/graphql/mutations/products/addProduct.ts";
import ProductList from "@/components/products/ProductList.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import usePagination from "@/lib/paginationOptions.ts";
import {PackagePlusIcon} from "lucide-react";
import Loader from "@/components/commons/Loader.tsx";
import {toast} from "sonner";
import {useProductStore} from "@/store/productStore.ts";
import {GET_ALL_MY_PRODUCTS_QUERY} from "@/graphql/queries/products/getAllProductsByUser.ts";

const MyProductsPage: React.FC = () => {
    const [myProducts, setMyProducts] = useState<ProductCardType[]>([]);
    const [maxPage, setMaxPage] = useState(Number.MAX_SAFE_INTEGER);
    const { setCreatedProductId } = useProductStore();
    const { page, handlePrevious, handleNext } = usePagination({ maxPage });

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);


    const { data, loading } = useQuery(GET_ALL_MY_PRODUCTS_QUERY, {
        variables: {
            page,
            limit: 2,
            sortDirection: 'ASC'
        },
        fetchPolicy: queryParams.get('refresh') ? "network-only" : "cache-first"
    });

    const [addProduct, { loading: mutationLoading }] = useMutation(ADD_PRODUCT_MUTATION, {
        onCompleted: (response) => {
            if (response?.addProduct?.data) {
                setCreatedProductId(response?.addProduct?.data?.id);
                console.log(response?.addProduct?.data?.id, true);
                toast.success("Product draft created successfully!");
                navigate("/myproducts/create");
            }
        },
        onError: (error) => {
            console.error(error.message);
            toast.warning("Failed to create product");
        }
    });

    const handleProductCreation = async () => {
        try {
            await addProduct();
        } catch (error) {
            console.error("Error during product creation:", error);
            toast.warning("Error during product creation");
        }
    };

    useEffect(() => {
        if (data?.getAllProductsByUser?.content) {
            setMyProducts(data.getAllProductsByUser.content);
            setMaxPage(data.getAllProductsByUser.totalPages - 1);
        }
        const urlWithoutParams = `${location.pathname}`;
        navigate(urlWithoutParams, { replace: true });
    }, [data, location.pathname, navigate]);

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
            <div className="w-full flex justify-center mt-4 absolute bottom-40">
                <Button
                    onClick={handleProductCreation}
                    className="bg-green-800 hover:bg-green-200 hover:text-black cursor-pointer"
                >
                    <div className="flex gap-2 items-center">
                        {mutationLoading ? <Loader className="w-5 h-5" /> : <PackagePlusIcon />}
                        <span>Add Product</span>
                    </div>
                </Button>
            </div>

        </div>
    );
};

export default MyProductsPage;
