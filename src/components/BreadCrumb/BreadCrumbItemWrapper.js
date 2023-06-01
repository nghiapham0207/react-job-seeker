import classNames from "classnames/bind";

import styles from "./BreadCrumb.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function BreadCrumbItemWrapper({ active, title, url }) {
	return (
		<label style={{ cursor: active ? "pointer" : "default" }} className={cx("BreadCrumbItemWrapper")}>
			{active ? <Link to={url}>{title}</Link> : <p className={cx("BreadCrumbJobTitle")}>{title}</p>}
			<span>/</span>
		</label>
	);
}

export default BreadCrumbItemWrapper;
