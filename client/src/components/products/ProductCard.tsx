import { Link, useNavigate } from "react-router-dom";
import { CategoryTypeMapping } from "@/types/CategoryTypeMapping.ts";
import type { ProductCardType } from "@/types/ProductCardType.ts";
import { Pencil, Trash } from "lucide-react";
import { extractUserInformation } from "@/lib/token.ts";
import { useMutation } from "@apollo/client";
import DELETE_PRODUCT_QUERY from "@/graphql/mutations/products/deleteProduct.ts";
import { toast } from "sonner";
import { GET_ALL_MY_PRODUCTS_QUERY } from "@/graphql/queries/products/getAllProductsByUser.ts";
import {useState} from "react";
import DeletionConfirmationModal from "@/components/commons/DeletionConfirmationModal.tsx";

const ProductCard = ({
    id,
    title,
    description,
    price,
    rate,
    interval,
    productCategoryIds,
    owner,
}: ProductCardType) => {
    const userInformation = extractUserInformation();
    const userId: string = userInformation?.userId as string;

    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setModalOpen(!modalOpen);
    }

    const navigate = useNavigate();
    const [deleteProduct] = useMutation(DELETE_PRODUCT_QUERY, {
        refetchQueries: [
            GET_ALL_MY_PRODUCTS_QUERY,
            "GetAllProductsByUser",
        ],
        onCompleted: (data) => {
            if (data?.deleteProduct?.message) {
                toast.success(data.deleteProduct.message);
            } else {
                toast.error("Product deleted, but no message returned.");
            }
        },
        onError: (error) => {
            toast.error(error?.message || "An error occurred during deletion.");
        },
    });


    const handleDelete = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            await deleteProduct({
                variables: {
                    id,
                },
            });
        } catch (err) {
            console.error("Mutation error:", err);
        }
    };

    const handleEdit = (e: { preventDefault: () => void }) => {
        navigate(`/products/${id}/edit`);
        e.preventDefault();
    };

    return (
        <div className="border border-gray-200 rounded-md p-4 shadow-sm w-full max-w-2xl">
            <Link to={`/products/${id}`}>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                    {owner === userId && (
                        <div className="flex flex-wrap gap-5 mr-5 mt-2">
                            <div
                                className="text-red-300 hover:text-red-500"
                                onClick={toggleModal}
                            >
                                <Trash />
                            </div>
                            <div
                                className="text-blue-300 hover:text-blue-500"
                                onClick={handleEdit}
                            >
                                <Pencil />
                            </div>
                        </div>
                    )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                    Categories: {productCategoryIds.map((p) => CategoryTypeMapping[p]).join(", ")}
                </p>
                <p className="text-sm text-blue-600 font-medium mt-1">Price: ${price}</p>
                <p className="text-sm text-gray-700 mt-1">
                    Rate: ${rate} {interval.toLowerCase().replace("_", " ")}
                </p>
                <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                    Description: {description}{" "}
                </p>
                <Link to={`/products/${id}`} className="text-blue-600 hover:underline text-xs">
                    More Details
                </Link>
                <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                    <span>Date posted: 21st Sept 2021</span>
                    <span>1028376412 views</span>
                </div>
            </Link>
            {modalOpen && (
                <DeletionConfirmationModal closeModal={toggleModal} handleDelete={handleDelete} />
            )}
        </div>
    );
};

export default ProductCard;
