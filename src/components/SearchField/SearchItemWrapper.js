import classNames from "classnames/bind";

import styles from "./SearchField.module.scss";
import { SearchIcon } from "../Icon";
// import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

function SearchItemWrapper({ keyword, onSuggestionClick }) {
  // const dispatch = useDispatch();

  return (
    <li className={cx("SearchItemWrapper")}
      onClick={() => {
        onSuggestionClick(keyword);
        // dispatch(updateSearch(keyword));
      }} >
      <SearchIcon />
      <div className={cx("SuggestionItem")}>
        {keyword}
      </div>
    </li>
  )
}

export default SearchItemWrapper;
