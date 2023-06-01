import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import classNames from "classnames/bind";

import styles from "./SettingPage.module.scss";
import GlintContainer from "../../components/GlintContainer";
import { SidebarItem, SidebarTab, SidebarWrapper } from "../../components/Sidebar";
import EditProfilePage from "../EditProfilePage/EditProfilePage";

const cx = classNames.bind(styles);

const initTab = [
	{
		key: "edit",
		label: "Thông tin cá nhân",
		isActive: true,
		url: "/setting/edit",
	},
	{
		key: "change-password",
		label: "Thay đổ mật khẩu",
		isActive: false,
		url: "/setting/change-password",
	},
];

function SettingPage({ url, children = <EditProfilePage /> }) {
	// const currentUser = useSelector(selectUser);
	const currentPathName = window.location.pathname;
	const navigate = useNavigate();
	const handleClick = (url) => {
		navigate(url);
		// tạo layout cho setting chỉ thay thế phần content
	};
	return (
		<GlintContainer>
			<div className={cx("Title")}>Cài đặt tài khoản</div>
			<div className={cx("Wrapper")}>
				<div className={cx("SidebarWrapper")}>
					<SidebarWrapper>
						{/* <UserProfileWrapper>
              <ProfilePictureWrapper>
                <ProfilePictureContainer>
                  <ProfilePictureContent>
                    <img alt={currentUser.username}
                      src={currentUser.avatar} srcSet="/static/images/defaultUser.webp" />
                  </ProfilePictureContent>
                </ProfilePictureContainer>
              </ProfilePictureWrapper>
              <ProfileInfo>
                <ProfileName>
                  {currentUser.username}
                </ProfileName>
                <ProfileText>
                  Vietnam
                </ProfileText>
              </ProfileInfo>
            </UserProfileWrapper> */}

						<SidebarTab>
							{initTab.map((tab) => (
								<Fragment key={tab.key}>
									<SidebarItem
										label={tab.label}
										// isActive={tab.isActive}
										isActive={tab.url === currentPathName}
										url={tab.url}
										onClick={handleClick}
									/>
								</Fragment>
							))}
						</SidebarTab>
					</SidebarWrapper>
				</div>
				<div className={cx("ContentWrapper")}>{children}</div>
			</div>
		</GlintContainer>
	);
}

export default SettingPage;
