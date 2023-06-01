import classNames from "classnames/bind";

import styles from "./SearchField.module.scss";
import { SearchIcon } from "../Icon";
import { forwardRef } from "react";
import { flushSync } from "react-dom";

const cx = classNames.bind(styles);

function SearchItemWrapper({ keyword, onSuggestionClick, isActive, onHover, index }, ref) {
	return (
		<li
			className={cx("SearchItemWrapper", { active: isActive })}
			ref={ref}
			onMouseEnter={() => {
				flushSync(() => {
					onHover(index);
				});
			}}
			onClick={() => {
				onSuggestionClick(keyword);
			}}>
			<SearchIcon />
			<div className={cx("SuggestionItem")}>{keyword}</div>
		</li>
	);
}

export default forwardRef(SearchItemWrapper);
