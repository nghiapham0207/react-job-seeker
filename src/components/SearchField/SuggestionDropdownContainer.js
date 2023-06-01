import classNames from "classnames/bind";

import styles from "./SearchField.module.scss";
import { forwardRef } from "react";

const cx = classNames.bind(styles);

function SuggestionDropdownContainer({ children }, ref) {
	return (
		<div ref={ref} className={cx("SuggestionDropdownContainer")}>
			{children}
		</div>
	);
}

export default forwardRef(SuggestionDropdownContainer);
