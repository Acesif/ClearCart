type BuyingConfirmationModalProps = {
    closeModal: (e: { preventDefault: () => void }) => void,
    handleBuy: (e: { preventDefault: () => void }) => void,
    buyLoading: boolean,
}

const BuyingConfirmationModal = ({
    handleBuy,
    closeModal,
    buyLoading,
}: BuyingConfirmationModalProps) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="absolute inset-0 bg-blue-200 opacity-70"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative z-10">
                <h3 className="text-lg font-semibold mb-4">Are you sure you want to buy this product?</h3>
                <div className="flex justify-between gap-4">
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={(e) => handleBuy(e)}
                        disabled={buyLoading}
                    >
                        Yes, Buy
                    </button>
                    <button
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={closeModal}
                        disabled={buyLoading}
                    >
                        No, Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
export default BuyingConfirmationModal;
