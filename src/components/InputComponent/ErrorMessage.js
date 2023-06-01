import classNames from "classnames/bind";

import styles from "./InputComponent.module.scss";

const cx = classNames.bind(styles);

function InputComponent__ErrorMessage({ message }) {
	return (
		<span className={cx("InputComponent__ErrorMessage")}>
			<span>{message}</span>
		</span>
	);
}

export default InputComponent__ErrorMessage;
