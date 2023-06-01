import classNames from "classnames/bind";

import styles from "./BadgeStyle.module.scss";

const cx = classNames.bind(styles);

export default function BadgeContainer({ className, children }) {
	return <div className={cx("BadgeContainer", className)}>{children}</div>;
}
