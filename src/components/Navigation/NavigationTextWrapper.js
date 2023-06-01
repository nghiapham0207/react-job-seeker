import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./Navigation.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function NavigationTextWrapper({ children, url, target = "_self", role = "button", handleClick }) {
	const handleShowMobileMenu = (e) => {
		e.stopPropagation();
		const toggle = document.querySelector("#mobile-menu");
		toggle.checked = false;
		//
		if (handleClick) {
			handleClick();
		}
	};
	return (
		<Link
			onClick={handleShowMobileMenu}
			to={url}
			// to={url ? url : null}
			target={target}>
			<div role={role} className={cx("TextWrapper")}>
				{children}
			</div>
		</Link>
	);
}

NavigationTextWrapper.propTypes = {
	children: PropTypes.node.isRequired,
};

export default NavigationTextWrapper;
