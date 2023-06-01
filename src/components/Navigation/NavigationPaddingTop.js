import classNames from "classnames/bind";

import styles from "./Navigation.module.scss";

const cx = classNames.bind(styles);

function NavigationPaddingTop({ children }) {
	return <div className={cx("PaddingTop")}>{children}</div>;
}

export default NavigationPaddingTop;
