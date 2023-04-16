import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./Pagination.module.scss";
import { usePagination } from "../../hooks";

const cx = classNames.bind(styles);

function Pagination({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className
}) {
  const paginationRange = usePagination(totalCount, pageSize, siblingCount, currentPage);
  const onPrevious = () => {
    console.log("onPrevious");
    onPageChange(currentPage - 1);
  }
  const onNext = () => {
    console.log("onNext");
    onPageChange(currentPage + 1);
  }
  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={cx(className, "Container")}>
      <li className={cx("Arrow", { disabled: currentPage === 1 })}
        onClick={onPrevious} >
        <FontAwesomeIcon icon={faAngleLeft} className={cx("IconStyle__VerticalCenteredSvg")} />
      </li>
      {
        paginationRange.map((pagination) => {
          if (isNaN(Number(pagination))) {
            return <li key={pagination} className={cx("Number", "dots")}>{"..."}</li>;
          }
          return (
            <li key={pagination}
              className={cx("Number", { active: currentPage === pagination })}
              onClick={() => {
                onPageChange(pagination);
              }}>
              {pagination}
            </li>
          )
        })
      }
      <li className={cx("Arrow", { disabled: currentPage === lastPage })}
        onClick={onNext} >
        <FontAwesomeIcon icon={faAngleRight} className={cx("IconStyle__VerticalCenteredSvg")} />
      </li>
    </ul>
  )
}

export default Pagination;
