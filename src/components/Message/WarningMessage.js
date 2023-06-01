import classNames from "classnames/bind";

import styles from "./Message.module.scss";
import Paragraph from "../ParagraphStyle/Paragraph";

const cx = classNames.bind(styles);

export default function WarningMessage({ title, subTitle }) {
	return (
		<div className={cx("WarningMessage")}>
			<Paragraph bold="bold" fontSize="18px" color="inherit">
				{title}
			</Paragraph>
			<p>{subTitle}</p>
		</div>
	);
}
