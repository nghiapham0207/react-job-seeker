import classNames from "classnames/bind";

import styles from "./TextFieldStyle.module.scss";

const cx = classNames.bind(styles);

function TextFieldContainer({ className, children }) {
	return <div className={cx("TextFieldContainer", className)}>{children}</div>;
}

export default TextFieldContainer;
