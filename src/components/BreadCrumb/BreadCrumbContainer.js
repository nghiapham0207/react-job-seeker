import classNames from "classnames/bind";

import styles from "./BreadCrumb.module.scss";

const cx = classNames.bind(styles);

function BreadCrumbContainer({ children }) {
	return <div className={cx("BreadCrumbContainer")}>{children}</div>;
}

export default BreadCrumbContainer;
