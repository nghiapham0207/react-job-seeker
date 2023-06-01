import classNames from "classnames/bind";

import styles from "./BreadCrumb.module.scss";

const cx = classNames.bind(styles);

function BreadCrumbInner({ children }) {
	return <div className={cx("BreadCrumbInner")}>{children}</div>;
}

export default BreadCrumbInner;
