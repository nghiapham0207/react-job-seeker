import classNames from "classnames/bind";

import styles from "./ButtonStyle.module.scss";

const cx = classNames.bind(styles);

function GhostBtn({ type, onClick, className, children }) {
	return (
		<button type={type} onClick={onClick} className={cx(className, "Button", "GhostBtn")}>
			{children}
		</button>
	);
}

export default GhostBtn;
