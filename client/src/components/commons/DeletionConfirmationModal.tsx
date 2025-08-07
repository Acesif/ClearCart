import React from "react";

type DeletionConfirmationModalProps = {
    closeModal: () => void,
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const DeletionConfirmationModal = ({
    handleDelete,
    closeModal
}: DeletionConfirmationModalProps) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this product?</h3>
                <div className="flex justify-between gap-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={(e) => handleDelete(e)}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        onClick={closeModal}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};
export default DeletionConfirmationModal;
