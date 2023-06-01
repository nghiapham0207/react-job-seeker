import classNames from "classnames/bind";

import styles from "./NavigationMobile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/selector";

const cx = classNames.bind(styles);

function ContainerRightContent() {
	const currentUser = useSelector(selectUser);
	return (
		<div className={cx("ContainerRightContent")}>
			{currentUser && (
				<div className={cx("ContainerRightItem")}>
					<button className={cx("UnstyleButton")} aria-label="Notification" type="button">
						<FontAwesomeIcon className={cx("IconStyle__VerticalCenteredSvg")} icon={faBell} />
					</button>
				</div>
			)}
			<div className={cx("ToggleButton__IconContainer")}>
				<div className={cx("ToggleButton__IconWrapper")}>
					<label htmlFor="mobile-menu">
						<FontAwesomeIcon className={cx("IconStyle__VerticalCenterSvg")} icon={faBars} />
					</label>
				</div>
			</div>
		</div>
	);
}

export default ContainerRightContent;
