import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { useSearchInput } from "../../contexts/searchInputContext";
import { updateSearch } from "../../redux/filterSlice";

import styles from "./TagStyle.module.scss";

const cx = classNames.bind(styles);

function TagContainer({ keyword, isClickable = false, className, tabIndex = 0, children }) {
	const dispatch = useDispatch();
	const { setSearchInput } = useSearchInput();
	return (
		<div
			tabIndex={tabIndex}
			onClick={() => {
				dispatch(updateSearch(keyword));
				setSearchInput(keyword);
			}}
			className={cx(className, "TagStyle__TagContainer")}>
			{children}
		</div>
	);
}

export default TagContainer;
