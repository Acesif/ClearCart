import ProductDetailsCard from "@/components/products/ProductDetailsCard.tsx";
import {useNavigate, useParams} from "react-router-dom";
import { GET_PRODUCT } from "@/graphql/queries/products/getProduct.ts";
import { useQuery } from "@apollo/client";
import type { ProductCardType } from "@/types/ProductCardType.ts";
import Loader from "@/components/commons/Loader.tsx";
import {toast} from "sonner";

const ProductPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(GET_PRODUCT, {
        variables: {
            id: productId,
        },
    });

    if (error) {
        toast.error(error.message);
    }

    const product: ProductCardType = data?.getProduct?.data;

    if (!product) {
        navigate("/404");
    }

    return (
        <div className="flex justify-center items-center h-[80vh]">
            {loading ? (
                <Loader className="w-10 h-10"/>
            ) : (
                <ProductDetailsCard
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    productCategoryIds={product.productCategoryIds}
                    rate={product.rate}
                    interval={product.interval}
                    owner={product.owner}
                />
            )}
        </div>
    );
};

export default ProductPage;
