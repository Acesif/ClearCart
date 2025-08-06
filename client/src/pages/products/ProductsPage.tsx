import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import type {ProductCardType} from "@/types/ProductCardType.ts";
import {GET_PRODUCTS_BY_CATEGORY_QUERY} from "@/graphql/queries/getProductsByCategory.ts";
import {GET_ALL_PRODUCTS_QUERY} from "@/graphql/queries/getAllProducts.ts";
import ProductList from "@/components/products/ProductList.tsx";
import {CategoryTypeMapping} from "@/types/CategoryTypeMapping.ts";

const ProductsPage: React.FC = () => {
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

    const { categoryId } = useParams();

    const query = categoryId ? GET_PRODUCTS_BY_CATEGORY_QUERY : GET_ALL_PRODUCTS_QUERY;

    const variables = categoryId
        ? { categoryCode: categoryId, page, limit: 2, sortDirection: 'ASC' }
        : { page, limit: 2, sortDirection: 'ASC' };

    const { data, loading } = useQuery(query, {
        variables,
    });

    useEffect(() => {
        if (categoryId && data?.getByCategory?.content) {
            setProducts(data.getByCategory.content);
            setMaxPage(data.getByCategory.totalPages - 1);
        } else if (!categoryId && data?.getAllProducts?.content) {
            setProducts(data.getAllProducts.content);
            setMaxPage(data.getAllProducts.totalPages - 1);
        }
    }, [data, categoryId]);

    return (
        <div className="mt-15">
            <h1 className="text-3xl mb-2 text-center">
                {categoryId && CategoryTypeMapping[categoryId]
                    ? CategoryTypeMapping[categoryId]
                    : 'All Products'}
            </h1>
            <ProductList
                products={products}
                loading={loading}
                page={page}
                maxPage={maxPage}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
            />
        </div>
    );
};

export default ProductsPage;
