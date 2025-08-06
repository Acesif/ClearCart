import {
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious,
    Paging
} from "@/components/ui/paging";

type PaginationProps = {
    initialPage: number;
    handlePrevious: () => void;
    handleNext: () => void;
};

const Pagination = ({ initialPage, handlePrevious, handleNext }: PaginationProps) => {

    return (
        <Paging>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className="cursor-pointer" onClick={handlePrevious} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink className="cursor-pointer">{initialPage + 1}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext className="cursor-pointer" onClick={handleNext} />
                </PaginationItem>
            </PaginationContent>
        </Paging>
    );
};

export default Pagination;
