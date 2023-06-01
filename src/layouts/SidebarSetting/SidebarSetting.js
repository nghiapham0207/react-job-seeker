import classNames from "classnames/bind";

import styles from "../MainContainer.module.scss";
import SettingPage from "../../pages/SettingPage/SettingPage";
import Header from "../Header";
import MobileMenu from "../MobileMenu/MobileMenu";

const cx = classNames.bind(styles);

function SidebarSetting({ children }) {
	return (
		<div>
			<div className={cx("DrawerContainer")}>
				<div className={cx("fresnel-lessThan-desktopS")}>
					<MobileMenu />
				</div>
				<div className={cx("MainLayout")}>
					<Header />
					<div className={cx("MainBody")}>
						<SettingPage>{children}</SettingPage>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SidebarSetting;
