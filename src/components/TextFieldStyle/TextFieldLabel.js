import classNames from "classnames/bind";

import styles from "./TextFieldStyle.module.scss";

const cx = classNames.bind(styles);

function TextFieldLabel({ className, children }) {
	return <label className={cx("TextFieldLabel", className)}>{children}</label>;
}

export default TextFieldLabel;
