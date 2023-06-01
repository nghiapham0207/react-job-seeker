import classNames from "classnames/bind";

import styles from "./DrawerStyle.module.scss";
import { useRef } from "react";

const cx = classNames.bind(styles);

function DrawerWrapper({ className, children }) {
	const ref = useRef();
	return (
		<div
			className={cx(className, "DrawerWrapper")}
			ref={ref}
			onClick={(e) => {
				e.stopPropagation();
			}}>
			{children}
		</div>
	);
}

export default DrawerWrapper;
