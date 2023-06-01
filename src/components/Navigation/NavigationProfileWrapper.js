import classNames from "classnames/bind";

import styles from "./Navigation.module.scss";

const cx = classNames.bind(styles);

function NavigationProfileWrapper({ children }) {
	return <div className={cx("ProfileWrapper")}>{children}</div>;
}

export default NavigationProfileWrapper;
