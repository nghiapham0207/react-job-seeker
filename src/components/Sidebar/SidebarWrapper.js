import classNames from "classnames/bind";

import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

function SidebarWrapper({ children }) {
	return <div className={cx("Wrapper")}>{children}</div>;
}

export default SidebarWrapper;
