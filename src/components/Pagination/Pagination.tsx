import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css"

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination({
  pageCount,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={onPageChange}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      containerClassName={css.pagination}
      activeClassName="active"
      pageClassName=""
      breakClassName=""
    />
  );
}
