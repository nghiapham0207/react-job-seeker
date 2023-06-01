import classNames from "classnames/bind";

import styles from "./ButtonStyle.module.scss";

const cx = classNames.bind(styles);

function SolidBtnContainer({ block = true, className, children }) {
	return (
		<div
			className={cx(className, "SolidBtnContainer")}
			style={{
				display: block ? "flex" : "inline-flex",
			}}>
			{children}
		</div>
	);
}

export default SolidBtnContainer;
