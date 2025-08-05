import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious,
    Paging
} from "@/components/ui/paging";
import {useState} from "react";

type PaginationProps = {
    initialPage?: number;
};

const Pagination = ({ initialPage = 1 }: PaginationProps) => {
    const [page, setPage] = useState(initialPage);

    const handlePrevious = () => {
        setPage((prev) => Math.max(1, prev - 1));
    };

    const handleNext = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <Paging>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className="cursor-pointer" onClick={handlePrevious} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink className="cursor-pointer">{page}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext className="cursor-pointer" onClick={handleNext} />
                </PaginationItem>
            </PaginationContent>
        </Paging>
    );
};

export default Pagination;
