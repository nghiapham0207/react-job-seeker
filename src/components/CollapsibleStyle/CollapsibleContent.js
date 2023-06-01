import classNames from "classnames/bind";

import styles from "./Collapsible.module.scss";

const cx = classNames.bind(styles);

function CollapsibleContent({ children }) {
	return <div className={cx("CollapsibleContent")}>{children}</div>;
}

export default CollapsibleContent;
