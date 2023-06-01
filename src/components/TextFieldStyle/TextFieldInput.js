import classNames from "classnames/bind";
import { forwardRef } from "react";

import styles from "./TextFieldStyle.module.scss";

const cx = classNames.bind(styles);

function TextFieldInput(
	{ type = "text", isRequired = false, placeholder, ariaLabel, value, defaultValue, maxLength, onChange, onBlur },
	inputRef,
) {
	return (
		<input
			ref={inputRef}
			required={isRequired}
			// type={showPassword ? "text" : "password"}
			type={type}
			aria-label={ariaLabel}
			className={cx("TextFieldInput")}
			value={value}
			defaultValue={defaultValue}
			maxLength={maxLength}
			onChange={onChange}
			onBlur={onBlur}
			placeholder={placeholder}
		/>
	);
}

export default forwardRef(TextFieldInput);
