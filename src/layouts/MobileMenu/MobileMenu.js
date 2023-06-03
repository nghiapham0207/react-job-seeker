import { faFile, faGear, faPowerOff, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DrawerContainer, DrawerWrapper } from "../../components/DrawerStyle";
import {
	NavigationContainer,
	NavigationIconWrapper,
	NavigationPaddingTop,
	NavigationTextWrapper,
	NavigationDivider,
	NavigationFlexCenter,
	NavigationProfileWrapper,
	NavigationProfileText,
} from "../../components/Navigation";
import config from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selector";
import { getImageUrl } from "../../utils/helpers";
import { logout } from "../../services/authService";
import { useUserActions } from "../../contexts/userActionsContext";
import { useLocation } from "react-router-dom";

function MobileMenu() {
	const currentUser = useSelector(selectUser);
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	const UserActionsContext = useUserActions();
	const { handleShowLogin } = UserActionsContext;
	const dispatch = useDispatch();
	const location = useLocation();
	const handleLogout = () => {
		logout(accessToken, refreshToken, dispatch);
	};
	return (
		<DrawerContainer>
			<DrawerWrapper className="drawer-background">
				<NavigationContainer>
					<NavigationIconWrapper>
						{/* <span>
										<FontAwesomeIcon className="IconStyle__VerticalCenteredSvg"
											width={"1em"} height={"1em"}
											icon={faTimes} />
									</span> */}
						<label htmlFor="mobile-menu">
							<FontAwesomeIcon className="IconStyle__VerticalCenteredSvg" width={"1em"} height={"1em"} icon={faTimes} />
						</label>
					</NavigationIconWrapper>

					{currentUser ? (
						<div>
							<NavigationFlexCenter>
								<NavigationProfileWrapper>
									<img
										className={"ProfilePicture"}
										alt="default user"
										src={currentUser.avatar ? getImageUrl(currentUser) : "/static/images/defaultUser.webp"}
										onError={(e) => {
											e.target.src = "/static/images/defaultUser.webp";
										}}
									/>
								</NavigationProfileWrapper>
								<NavigationProfileText>{currentUser.username}</NavigationProfileText>
							</NavigationFlexCenter>

							<NavigationPaddingTop>
								<NavigationTextWrapper url={config.routes.setting}>
									<NavigationFlexCenter>
										<FontAwesomeIcon className={"IconStyle__VerticalCenteredSvg"} icon={faGear} />
										<span>Cài đặt</span>
									</NavigationFlexCenter>
								</NavigationTextWrapper>
							</NavigationPaddingTop>

							<NavigationTextWrapper url={config.routes.myApplications}>
								<NavigationFlexCenter>
									<FontAwesomeIcon className={"IconStyle__VerticalCenteredSvg"} icon={faFile} />
									<span>Đơn ứng tuyển của tôi</span>
								</NavigationFlexCenter>
							</NavigationTextWrapper>

							<NavigationTextWrapper handleClick={handleLogout}>
								<NavigationFlexCenter>
									<FontAwesomeIcon className={"IconStyle__VerticalCenteredSvg"} icon={faPowerOff} />
									<span>Đăng xuất</span>
								</NavigationFlexCenter>
							</NavigationTextWrapper>
						</div>
					) : (
						<>
							<NavigationPaddingTop>
								<NavigationTextWrapper url={`${location.pathname}${location.search}`} handleClick={handleShowLogin}>
									<span>{"Đăng Nhập"}</span>
								</NavigationTextWrapper>
							</NavigationPaddingTop>
							<NavigationTextWrapper url={config.routes.signUp}>
								<span>{"Đăng Ký"}</span>
							</NavigationTextWrapper>
						</>
					)}

					<NavigationDivider />

					<NavigationTextWrapper url={config.routes.job}>
						<span>{"Tìm Việc Làm"}</span>
					</NavigationTextWrapper>
					<NavigationTextWrapper url={config.routes.company}>
						<span>{"Danh sách công ty"}</span>
					</NavigationTextWrapper>

					<NavigationDivider />

					<NavigationTextWrapper target="_blank" url={config.routes.recruitment}>
						<span>{"Dành Cho Nhà Tuyển Dụng"}</span>
					</NavigationTextWrapper>
					{/* <LanguageSwitcherContainer /> */}
				</NavigationContainer>
			</DrawerWrapper>
		</DrawerContainer>
	);
}

export default MobileMenu;
