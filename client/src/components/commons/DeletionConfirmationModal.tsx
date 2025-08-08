type DeletionConfirmationModalProps = {
    closeModal: (e: { preventDefault: () => void }) => void,
    handleDelete: (e: { preventDefault: () => void }) => void,
}

const DeletionConfirmationModal = ({
    handleDelete,
    closeModal
}: DeletionConfirmationModalProps) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="absolute inset-0 bg-blue-200 opacity-70"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative z-10">
                <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this product?</h3>
                <div className="flex justify-between gap-4">
                    <button
                        className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md cursor-pointer"
                        onClick={(e) => handleDelete(e)}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-md cursor-pointer"
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
