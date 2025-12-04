import { Button } from "./ui/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrev,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={!hasPrev}>
        Previous
      </Button>

      <span className="text-gray-300 font-medium">
        Page {currentPage} {totalPages > 0 && `of ${totalPages}`}
      </span>

      <Button onClick={() => onPageChange(currentPage + 1)} disabled={!hasNext}>
        Next
      </Button>
    </div>
  );
};
