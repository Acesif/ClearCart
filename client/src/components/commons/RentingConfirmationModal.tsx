import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import GET_TRANSACTIONS_BY_PRODUCT_ID_QUERY from "../../graphql/queries/transactions/getTransactionsByProductId.ts";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { type DateRange } from "react-day-picker";
import type {RentDateRange} from "@/types/RentDateRange.ts";

type RentingConfirmationModalProps = {
    closeModal: (e: { preventDefault: () => void }) => void,
    handleRent: (e: { preventDefault: () => void }, fromRentDate: string, toRentDate: string) => void,
    productId: string;
    rentLoading: boolean;
}

const RentingConfirmationModal = ({
    handleRent,
    closeModal,
    productId,
    rentLoading,
}: RentingConfirmationModalProps) => {
    const [range, setRange] = useState<DateRange | undefined>();

    const { data, loading, error } = useQuery(GET_TRANSACTIONS_BY_PRODUCT_ID_QUERY, {
        variables: { productId },
        skip: !productId,
        fetchPolicy: "network-only"
    });

    const disabledRanges = useMemo(() => {
        const ranges = [];
        if (data?.getTransactionsByProductId?.data) {
            const transactionRanges = data.getTransactionsByProductId.data.map((transaction: RentDateRange) => ({
                from: new Date(transaction.fromRentDate),
                to: new Date(transaction.toRentDate),
            }));
            ranges.push(...transactionRanges);
        }
        ranges.push({ before: new Date() });
        return ranges;
    }, [data]);

    const isSelectionInvalid = !range?.from || !range?.to;

    const fromRentDate = range?.from ? range.from.toISOString().split("T")[0] : "";
    const toRentDate = range?.to ? range.to.toISOString().split("T")[0] : "";

    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="absolute inset-0 bg-blue-200 opacity-70"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-auto relative z-10">
                <h3 className="text-lg font-semibold mb-4">Rental period</h3>
                {loading && <p>Loading unavailable dates...</p>}
                {error && <p>Error loading dates. Please try again.</p>}
                <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    disabled={disabledRanges}
                />
                <div className="flex justify-between gap-4 mt-4">
                    <button
                        className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={closeModal}
                        disabled={ loading || rentLoading}
                    >
                        Go Back
                    </button>
                    <button
                        className="bg-indigo-400 hover:bg-indigo-500 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={(e) => handleRent(e, fromRentDate, toRentDate)}
                        disabled={isSelectionInvalid || loading || rentLoading }
                    >
                        Confirm Rent
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RentingConfirmationModal;
