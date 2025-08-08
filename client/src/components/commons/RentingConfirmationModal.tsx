import React, { useState } from "react";

type RentingConfirmationModalProps = {
    closeModal: (e: { preventDefault: () => void }) => void,
    handleRent: (e: { preventDefault: () => void }, fromRentDate: string, toRentDate: string) => void,
}

const RentingConfirmationModal = ({
                                      handleRent,
                                      closeModal
                                  }: RentingConfirmationModalProps) => {
    const [fromRentDate, setFromRentDate] = useState("");
    const [toRentDate, setToRentDate] = useState("");

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        if (type === "from") {
            setFromRentDate(event.target.value);
            if (toRentDate && event.target.value > toRentDate) {
                setToRentDate("");
            }
        } else {
            setToRentDate(event.target.value);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="absolute inset-0 bg-blue-200 opacity-70"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative z-10">
                <h3 className="text-lg font-semibold mb-4">Rental period</h3>
                <div className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="fromRentDate" className="block text-sm text-gray-700">From</label>
                        <input
                            type="date"
                            id="fromRentDate"
                            value={fromRentDate}
                            onChange={(e) => handleDateChange(e, "from")}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="toRentDate" className="block text-sm text-gray-700">To</label>
                        <input
                            type="date"
                            id="toRentDate"
                            value={toRentDate}
                            onChange={(e) => handleDateChange(e, "to")}
                            className="w-full p-2 border rounded-md"
                            min={fromRentDate}
                        />
                    </div>
                </div>
                <div className="flex justify-between gap-4 mt-4">
                    <button
                        className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={closeModal}
                    >
                        Go Back
                    </button>
                    <button
                        className="bg-indigo-400 hover:bg-indigo-500 text-white px-4 py-2 rounded-md"
                        onClick={(e) => handleRent(e, fromRentDate, toRentDate)}
                        disabled={!fromRentDate || !toRentDate || toRentDate < fromRentDate}
                    >
                        Confirm Rent
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RentingConfirmationModal;
