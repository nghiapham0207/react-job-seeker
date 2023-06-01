import classNames from "classnames/bind";

import styles from "./Navigation.module.scss";

const cx = classNames.bind(styles);

function NavigationContainer({ children }) {
	return (
		<div
			className={cx("Container")}
			onClick={(e) => {
				e.stopPropagation();
			}}>
			{children}
		</div>
	);
}

export default NavigationContainer;
