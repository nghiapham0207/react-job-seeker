import classNames from "classnames/bind";

import styles from "./Shared.module.scss";

const cx = classNames.bind(styles);

function ContentSectionMain({ children }) {
	return <div className={cx("ContentSectionMain")}>{children}</div>;
}

export default ContentSectionMain;
