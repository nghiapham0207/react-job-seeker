import classNames from "classnames/bind";

import styles from "./DrawerStyle.module.scss";

const cx = classNames.bind(styles);

function DrawerContainer({ children }) {
	return (
		// <div className={cx("DrawerContainer")}>
		<>
			<input
				type="checkbox"
				placeholder="placeholder"
				className={cx("mobile-menu")}
				onChange={(e) => {}}
				id="mobile-menu"
				style={{ display: "none" }}
			/>
			<label
				htmlFor="mobile-menu"
				className={cx("DrawerContainer")}
				onClick={(e) => {
					// e.preventDefault();
				}}>
				{/* <div className={cx("DrawerContainer")}> */}
				{children}
				{/* </div> */}
			</label>
		</>
	);
}

export default DrawerContainer;
