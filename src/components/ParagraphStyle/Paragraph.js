import classNames from "classnames/bind";

import styles from "./ParagraphStyle.module.scss";

const cx = classNames.bind(styles);

function Paragraph({ bold = "normal", color = "#000", fontSize = "14px", className, children }) {
	const test = cx(className, "Paragraph");
	return (
		<p
			className={test}
			style={{
				color: color,
				fontWeight: bold,
				fontSize: fontSize,
			}}>
			{children}
		</p>
	);
}

export default Paragraph;
