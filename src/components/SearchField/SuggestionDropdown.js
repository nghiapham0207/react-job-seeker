import classNames from "classnames/bind";

import styles from "./SearchField.module.scss";
import { forwardRef } from "react";

const cx = classNames.bind(styles);

function SuggestionDropdown({ children }, ref) {
	return (
		<ul ref={ref} className={cx("SuggestionDropdown")}>
			{children}
		</ul>
	);
}

export default forwardRef(SuggestionDropdown);
