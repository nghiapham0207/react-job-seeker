import classNames from "classnames/bind";
import { useState } from "react";

import styles from "./Checkbox.module.scss";

const cx = classNames.bind(styles);

function Checkbox({ obj, onChange }) {
	const [checkedState, setCheckedState] = useState(obj.checked);
	return (
		<div
			className={cx("CheckboxContainer", "styles__Checkbox")}
			data-checked={obj?.checked ? "true" : "false"}
			aria-label={obj?.id}
			tabIndex="0">
			<input
				type="checkbox"
				id={obj?.id}
				value={obj?.value}
				checked={checkedState}
				onChange={(e) => {
					obj.checked = e.target.checked;
					setCheckedState(e.target.checked);
					onChange(obj, e.target.checked);
				}}
			/>
			<label
				htmlFor={obj?.id}
				tabIndex="-1"
				onClick={() => {
					const e = document.querySelector(`[aria-label="${obj?.id}"]`);
					e.setAttribute("data-checked", checkedState ? "true" : "false");
				}}>
				{obj?.label}
			</label>
		</div>
	);
}

export default Checkbox;
