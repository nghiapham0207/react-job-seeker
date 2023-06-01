import classNames from "classnames/bind";

import styles from "./Shared.module.scss";

const cx = classNames.bind(styles);

function ContentSection({ children }) {
	return <div className={cx("ContentSection")}>{children}</div>;
}

export default ContentSection;
