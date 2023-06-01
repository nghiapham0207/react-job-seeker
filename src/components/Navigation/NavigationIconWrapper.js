import classNames from "classnames/bind";

import styles from "./Navigation.module.scss";

const cx = classNames.bind(styles);

function NavigationIconWrapper({ children }) {
	return <div className={cx("IconWrapper")}>{children}</div>;
}

export default NavigationIconWrapper;
