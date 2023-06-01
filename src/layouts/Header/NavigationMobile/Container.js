import classNames from "classnames/bind";

import styles from "./NavigationMobile.module.scss";

const cx = classNames.bind(styles);

function Container({ children }) {
	return <div className={cx("Container")}>{children}</div>;
}

export default Container;
