import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  return (
    <div className="flex flex-row items-center justify-center flex-wrap gap-2 text-xs md:text-sm">
      {currentPage > 1 && (
        <button
          type="submit"
          name="page"
          value={currentPage - 1}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-border"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}

      {Array(totalPages)
        .fill(0)
        .map((_, index) => (
          <button
            key={index + 1}
            name="page"
            value={index + 1}
            type="submit"
            className={"w-10 h-10 flex items-center justify-center rounded-full " + (currentPage === index + 1 ? " bg-primary text-onPrimary" : "border border-border")}
          >
            {index + 1}
          </button>
        ))}

      {currentPage < totalPages && (
        <button
          
          className="w-10 h-10 flex items-center justify-center rounded-full border border-border"
          type="submit"
          name="page"
          value={currentPage + 1}
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
