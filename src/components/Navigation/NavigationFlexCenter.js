import classNames from "classnames/bind";

import styles from "./Navigation.module.scss";

const cx = classNames.bind(styles);

function NavigationFlexCenter({ children }) {
	return <div className={cx("FlexCenter")}>{children}</div>;
}

export default NavigationFlexCenter;
