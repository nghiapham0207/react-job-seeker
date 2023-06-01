import classNames from "classnames/bind";

import styles from "./TabsStyle.module.scss";

const cx = classNames.bind(styles);

export default function TabsContainer({ className, children }) {
	return <div className={cx("TabsContainer", className)}>{children}</div>;
}
