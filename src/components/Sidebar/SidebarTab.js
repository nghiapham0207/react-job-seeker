import classNames from "classnames/bind";

import style from "./Sidebar.module.scss";

const cx = classNames.bind(style);

function SidebarTab({ children }) {
	return <div className={cx("Tab")}>{children}</div>;
}

export default SidebarTab;
