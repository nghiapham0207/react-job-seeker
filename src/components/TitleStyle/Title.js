import classNames from "classnames/bind";

import styles from "./TitleStyle.module.scss";

const cx = classNames.bind(styles);

function Title({ as: As = "h1", color = "#000", uppercase = false, className, children }) {
	return (
		<As
			style={{
				color: color,
				textTransform: uppercase ? "uppercase" : "",
			}}
			className={cx(className, "Title")}>
			{children}
		</As>
	);
}

export default Title;
