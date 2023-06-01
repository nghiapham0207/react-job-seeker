import classNames from "classnames/bind";

import styles from "./InfiniteScroll.module.scss";

const cx = classNames.bind(styles);

function InfiniteScrollContainer({ size = "2rem", style, children }) {
	return (
		<div className={cx("InfiniteScrollContainer")} style={{ ...style }}>
			<div style={{ ...style, width: size, height: size }}></div>
			<span>{children}</span>
		</div>
	);
}

export default InfiniteScrollContainer;
