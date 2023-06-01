import classNames from "classnames/bind";

import styles from "./TabsStyle.module.scss";
import { NavLink } from "react-router-dom";
import config from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCompass } from "@fortawesome/free-solid-svg-icons";
import BadgeContainer from "../BadgeStyle/BadgeContainer";
import { useSelector } from "react-redux";
import { selectSavedJobs } from "../../redux/selector";

const cx = classNames.bind(styles);

export default function TabsHeader({ className }) {
	const savedJobs = useSelector(selectSavedJobs);
	const totalJobs = savedJobs.length;
	const currentPathName = window.location.pathname;
	return (
		<div className={cx("TabsHeader", className)}>
			<ul className="tabs-list horizontal-tabs-list">
				<li
					className={`horizontal-tab ${
						currentPathName === "/opportunities/explore" || currentPathName === "/job" ? "active" : ""
					}`}>
					<NavLink to={config.routes.opportunities + "/explore"} className={(nav) => cx({ active: nav.isActive })}>
						<FontAwesomeIcon className="IconStyle__VerticalCenteredSvg" icon={faCompass} />
						khám phá ngay
					</NavLink>
				</li>
				<li className={`horizontal-tab ${currentPathName === "/opportunities/bookmarked" ? "active" : ""}`}>
					<NavLink to={config.routes.opportunities + "/bookmarked"} className={(nav) => cx({ active: nav.isActive })}>
						<FontAwesomeIcon className="IconStyle__VerticalCenteredSvg" icon={faBookmark} />
						đã lưu
						{totalJobs > 0 && (
							<BadgeContainer>
								<span>{totalJobs}</span>
							</BadgeContainer>
						)}
					</NavLink>
				</li>
			</ul>
		</div>
	);
}
