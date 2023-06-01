import classNames from "classnames/bind";
import { useContext } from "react";
import { DropdownIcon } from "../Icon";

import styles from "./Collapsible.module.scss";
import { CollapsibleContext } from "./CollapsibleContainer";

const cx = classNames.bind(styles);

function CollapsibleHeader({ title, className }) {
	const { open, toggleOpen } = useContext(CollapsibleContext);
	return (
		<div className={cx(className, "CollapsibleHeader")} onClick={toggleOpen}>
			{title}
			<span
				style={{
					transform: open ? "rotate(180deg)" : "rotate(0)",
					transition: "transform 0.5s ease 0s",
				}}>
				<DropdownIcon className={cx("IconStyle__VerticalCenteredSvg")} />
			</span>
		</div>
	);
}

export default CollapsibleHeader;
