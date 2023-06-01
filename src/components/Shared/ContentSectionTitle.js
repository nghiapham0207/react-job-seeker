import classNames from "classnames/bind";

import styles from "./Shared.module.scss";

const cx = classNames.bind(styles);

function ContentSectionTitle({ label }) {
	return <div className={cx("ContentSectionTitle")}>{label}</div>;
}

export default ContentSectionTitle;
