import classNames from "classnames/bind";

import styles from "./ButtonStyle.module.scss";

const cx = classNames.bind(styles);

function GhostBtnContainer({ className, children }) {
	return <div className={cx(className, "GhostBtnContainer")}>{children}</div>;
}

export default GhostBtnContainer;
