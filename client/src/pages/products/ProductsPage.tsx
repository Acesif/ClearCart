import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import type {ProductCardType} from "@/types/ProductCardType.ts";
import {GET_PRODUCTS_BY_CATEGORY_QUERY} from "@/graphql/queries/products/getProductsByCategory.ts";
import {GET_ALL_PRODUCTS_QUERY} from "@/graphql/queries/products/getAllProducts.ts";
import ProductList from "@/components/products/ProductList.tsx";
import {CategoryTypeMapping} from "@/types/CategoryTypeMapping.ts";
import usePagination from "@/lib/paginationOptions.ts";

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<ProductCardType[]>([]);
    const [maxPage, setMaxPage] = useState(Number.MAX_SAFE_INTEGER);

    const { page, handlePrevious, handleNext } = usePagination({ maxPage });

    const navigate = useNavigate();
    const { categoryId } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const query = categoryId ? GET_PRODUCTS_BY_CATEGORY_QUERY : GET_ALL_PRODUCTS_QUERY;

    const variables = categoryId ?
        {
            categoryCode: categoryId,
            page, limit: 2,
            sortDirection: 'ASC'
        } :
        {
            page,
            limit: 2,
            sortDirection: 'ASC'
        };

    const { data, loading } = useQuery(query, {
        variables,
        fetchPolicy: queryParams.get('refresh') ? "network-only" : "cache-first"
    });

    useEffect(() => {
        if (categoryId && data?.getByCategory?.content) {
            setProducts(data.getByCategory.content);
            setMaxPage(data.getByCategory.totalPages - 1);
        } else if (!categoryId && data?.getAllProducts?.content) {
            setProducts(data.getAllProducts.content);
            setMaxPage(data.getAllProducts.totalPages - 1);
        }
        const urlWithoutParams = `${location.pathname}`;
        navigate(urlWithoutParams, { replace: true });
    }, [data, categoryId, location.pathname, navigate]);

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
