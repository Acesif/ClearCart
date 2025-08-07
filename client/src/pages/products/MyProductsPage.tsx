import React, { useEffect, useState } from 'react';
import {useMutation, useQuery} from '@apollo/client';
import type {ProductCardType} from "@/types/ProductCardType.ts";
import {GET_ALL_PRODUCTS_QUERY} from "@/graphql/queries/products/getAllProducts.ts";
import ProductList from "@/components/products/ProductList.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import usePagination from "@/lib/paginationOptions.ts";
import {PackagePlusIcon} from "lucide-react";
import {ADD_PRODUCT_MUTATION} from "@/graphql/mutations/products/addProduct.ts";
import Loader from "@/components/commons/Loader.tsx";
import {toast} from "sonner";
import {useProductContext} from "@/components/context/ProductContext.tsx";

const MyProductsPage: React.FC = () => {
    const [myProducts, setMyProducts] = useState<ProductCardType[]>([]);
    const [maxPage, setMaxPage] = useState(Number.MAX_SAFE_INTEGER);
    const { createdProductId, setCreatedProductId } = useProductContext();
    const [productCreationStatus, setProductCreationStatus] = useState(false);
    const { page, handlePrevious, handleNext } = usePagination({ maxPage });
    const navigate = useNavigate();

    const { data, loading } = useQuery(GET_ALL_PRODUCTS_QUERY, {
        variables: {
            page,
            limit: 2,
            sortDirection: 'ASC'
        },
    });

    const [addProduct, { loading: mutationLoading }] = useMutation(ADD_PRODUCT_MUTATION);

    const handleProductCreation = async () => {
        const response = await addProduct();
        if (response?.data?.addProduct?.data) {
            setCreatedProductId(response?.data?.addProduct?.data?.id);
            setProductCreationStatus(true);
            console.log(createdProductId, productCreationStatus)
            toast.success("Product draft created successfully!");
            navigate("/myproducts/create");
        } else if (response?.errors) {
            setProductCreationStatus(false);
            console.log(response.errors[0].message);
            toast.warning("Failed to create product");
        }
    }

    useEffect(() => {
        if (data?.getAllProducts?.content) {
            setMyProducts(data.getAllProducts.content);
            setMaxPage(data.getAllProducts.totalPages - 1);
        }
    }, [data,setProductCreationStatus]);

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
