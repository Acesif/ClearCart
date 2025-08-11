import {buttonStyle} from "@/styles/buttonStyle.ts";
import type {ProductCardType} from "@/types/ProductCardType.ts";
import {CategoryTypeMapping} from "@/types/CategoryTypeMapping.ts";
import BuyingConfirmationModal from "@/components/commons/BuyingConfirmationModal.tsx";
import {useState} from "react";
import RentingConfirmationModal from "@/components/commons/RentingConfirmationModal.tsx";
import {useMutation} from "@apollo/client";
import BUY_PRODUCT_MUTATION from "@/graphql/mutations/transactions/buyProduct.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {GET_ALL_PRODUCTS_QUERY} from "@/graphql/queries/products/getAllProducts.ts";
import RENT_PRODUCT_MUTATION from "@/graphql/mutations/transactions/rentProduct.ts";

const ProductDetailsCard = ({
    id,
    title,
    description,
    price,
    productCategoryIds,
    rate,
    interval
}: ProductCardType) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rentModalOpen, setRentModalOpen] = useState(false);
    const navigate = useNavigate();

    const toggleModal = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setModalOpen(!modalOpen);
    }

    const toggleRentModal = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setRentModalOpen(!rentModalOpen);
    }

    const [buyProduct, { loading: buyLoading }] = useMutation(BUY_PRODUCT_MUTATION, {
        refetchQueries: [
            GET_ALL_PRODUCTS_QUERY,
            "GetAllProducts",
        ],
        variables: { id },
        onCompleted: (data) => {
            if (data?.buyProduct?.message) {
                console.log(data.buyProduct.message);
                setModalOpen(false);
                toast.success("Successfully bought product");
                navigate(`/browse/all?refresh=true`);
            }
        },
        onError: (error) => {
            console.error("Error buying product:", error);
        },
    });

    const [rentProduct, { loading: rentLoading}] = useMutation(RENT_PRODUCT_MUTATION, {
        refetchQueries: [
            GET_ALL_PRODUCTS_QUERY,
            "GetAllProducts",
        ],
        onCompleted: (data) => {
            if (data?.rentProduct?.message) {
                console.log(data.rentProduct.message);
                setRentModalOpen(false);
                toast.success("Successfully rented product");
                navigate(`/browse/all`);

            }
        },
        onError: (error) => {
            console.error("Error renting product:", error);
        },
    });

    const handleBuy = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            await buyProduct();
        } catch (err) {
            console.error("Error executing mutation:", err);
        }
    }

    const handleRent = async (e: { preventDefault: () => void }, fromRentDate: string, toRentDate: string) => {
        e.preventDefault();
        console.log("Renting product with ID:", id, "From:", fromRentDate, "To:", toRentDate);

        try {
            await rentProduct({
                variables: {
                    id,
                    fromRentDate,
                    toRentDate
                }
            });
        } catch (err) {
            console.error("Error executing mutation:", err);
        }
    }

    return (
        <div id={id} className="bg-white p-8 rounded-lg shadow-lg w-[50%]">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h1>
            <p className="text-gray-600 mb-2">Categories:
                <span className="font-semibold text-gray-800"> {productCategoryIds.map(c => CategoryTypeMapping[c]).join(", ")}</span>
            </p>
            <p className="text-gray-600 mb-4">Price: <span className="font-semibold text-gray-800">${price}</span></p>
            <p className="text-gray-600 mb-4">Rent:
                <span className="font-semibold text-gray-800"> ${rate}</span> {interval.split("_").join(" ")}
            </p>
            <p className="text-gray-700 mb-4">
                {description}
            </p>
            <div className="flex justify-end space-x-4">
                <button
                    className={buttonStyle(rentLoading)}
                    onClick={toggleRentModal}
                    disabled={rentLoading}
                >
                    Rent
                </button>
                <button
                    className={buttonStyle(buyLoading)}
                    onClick={toggleModal}
                    disabled={buyLoading}
                >
                    Buy
                </button>
            </div>

            {modalOpen && (
                <BuyingConfirmationModal closeModal={toggleModal} handleBuy={handleBuy} buyLoading={buyLoading}/>
            )}

            {rentModalOpen && (
                <RentingConfirmationModal closeModal={toggleRentModal} handleRent={handleRent} productId={id} rentLoading={rentLoading}/>
            )}
        </div>
    );
};

export default ProductDetailsCard;

