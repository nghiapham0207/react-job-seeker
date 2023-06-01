import classNames from "classnames/bind";

import styles from "./TagStyle.module.scss";

const cx = classNames.bind(styles);

function TagContent({ children }) {
	return <label className={cx("TagStyle__TagContent")}>{children}</label>;
}

export default TagContent;
