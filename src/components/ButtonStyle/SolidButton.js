import classNames from "classnames/bind";

import styles from "./ButtonStyle.module.scss";

const cx = classNames.bind(styles);

function SolidButton({
	as: As = "button",
	type = "button",
	block = false,
	disable = false,
	className,
	onClick,
	children,
}) {
	return (
		<As
			type={type}
			onClick={onClick}
			disabled={disable}
			style={{ width: block ? "100%" : "" }}
			className={cx(className, "Button", "SolidBtn")}>
			{children}
		</As>
	);
}

export default SolidButton;
