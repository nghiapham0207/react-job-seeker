import classNames from "classnames/bind";
import { useContext } from "react";

import styles from "./Collapsible.module.scss";
import { CollapsibleContext } from "./CollapsibleContainer";

const cx = classNames.bind(styles);

function CollapsibleBody({ children }) {
	const { open } = useContext(CollapsibleContext);
	return <>{open && <div className={cx("CollapsibleBody")}>{children}</div>}</>;
}

export default CollapsibleBody;
