import PropTypes from "prop-types";
import { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

import styles from "./InputComponent.module.scss";
import { inputTypes } from "../../constants/htmlConstants";

const cx = classNames.bind(styles);

/**
 *
 * @param {Object} param0
 * @param {boolean} param0.valid
 * @param {import("react").HTMLInputTypeAttribute} param0.type
 * @param {import("react").ChangeEventHandler<HTMLInputElement>} param0.onChange
 * @returns
 */
function InputWrapper({ id, label, name, type = "text", valid = true, value, onChange, maxLength }) {
	const [floatLabel, setFloatLabel] = useState(false);
	return (
		<div className={cx("InputWrapper")}>
			<span className={cx(value || floatLabel ? "InputName--Float" : "InputName")}>{label}</span>
			<div className={cx("InputTypeWrapper")}>
				<input
					type={type}
					id={id}
					value={value}
					maxLength={maxLength}
					placeholder="placeholder" // to remove issue input has no title
					name={name}
					style={{ borderColor: !valid ? "red" : "" }}
					className={cx("InputType")}
					onChange={onChange}
					onFocus={() => {
						setFloatLabel(true);
					}}
					onBlur={(e) => {
						if (e.target.value !== "") {
							setFloatLabel(true);
						} else {
							setFloatLabel(false);
						}
					}}
				/>
				<div className={cx("ValidationIconContainer")}>
					{!valid && (
						<FontAwesomeIcon
							icon={faExclamation}
							width={"1em"}
							height={"1em"}
							className={cx("IconStyle__VerticalCenteredSvg")}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

InputWrapper.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.oneOf(inputTypes),
	valid: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
	maxLength: PropTypes.number,
};

export default InputWrapper;
