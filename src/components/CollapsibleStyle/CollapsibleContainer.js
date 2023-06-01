import classNames from "classnames/bind";
import { createContext, useState } from "react";

import styles from "./Collapsible.module.scss";

const cx = classNames.bind(styles);

export const CollapsibleContext = createContext();

function CollapsibleContainer({ className, children }) {
	const [open, setOpen] = useState(true);
	const toggleOpen = () => {
		setOpen(!open);
	};
	return (
		<CollapsibleContext.Provider value={{ open, toggleOpen }}>
			<div className={cx(className, "CollapsibleContainer")}>{children}</div>
		</CollapsibleContext.Provider>
	);
}

export default CollapsibleContainer;
