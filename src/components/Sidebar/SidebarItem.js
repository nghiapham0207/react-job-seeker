import classNames from "classnames/bind";

import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

function SidebarItem({ isActive = false, label, url, onClick }) {
	return (
		<div
			className={cx("Item", { SelectedItem: isActive })}
			onClick={() => {
				onClick(url);
			}}>
			<span>{label}</span>
		</div>
	);
}

export default SidebarItem;
