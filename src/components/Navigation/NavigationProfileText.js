import classNames from "classnames/bind";

import styles from "./Navigation.module.scss";

const cx = classNames.bind(styles);

function NavigationProfileText({ children }) {
	return <div className={cx("ProfileText")}>{children}</div>;
}

export default NavigationProfileText;
