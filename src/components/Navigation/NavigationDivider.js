import classNames from "classnames/bind";

import styles from "./Navigation.module.scss";

const cx = classNames.bind(styles);

function NavigationDivider() {
	return <div className={cx("Divider")} />;
}

export default NavigationDivider;
