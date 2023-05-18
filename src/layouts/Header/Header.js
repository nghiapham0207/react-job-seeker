import classNames from 'classnames/bind';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import config from '../../config';
import { RightArrowIcon } from '../../components/Icon';
import LoginModal from '../../components/LoginModal/LoginModal';
import { selectUser } from '../../redux/selector';
import UserMenu from './UserMenu/UserMenu';
import GlintContainer from '../../components/GlintContainer/GlintContainer';
import { Container, ContainerRightContent } from './NavigationMobile';
import LanguageSwitcherContainer from '../../components/LanguageSwitcher';
import { useUserActions } from "../../contexts/userActionsContext";

const cx = classNames.bind(styles);

function Header() {
	const currentUser = useSelector(selectUser);
	const UserActionsContext = useUserActions();
	const { showLogin, handleShowLogin } = UserActionsContext;
	const { state } = useLocation();

	const navigate = useNavigate();
	const handleSignUp = () => {
		navigate(config.routes.signUp);
	}
	if (state?.showLogin) {
		// handleShowLogin(true);
		// toast.info("Trang bạn truy cập yêu cầu đăng nhập!");
	}
	//  else {
	// 	// handleShowLogin(false);
	// }
	// stupid code
	// useEffect(() => {
	// 	if (state?.showLogin) {
	// 		handleShowLogin(true);
	// 	}
	// }, [state, handleShowLogin]);

	return (
		<div className={cx("MainHeader")}>
			<GlintContainer>
				{/* LoginModal */}
				{showLogin && <LoginModal
					message={state?.showLogin ?
						<span style={{ color: 'red' }}>Trang bạn truy cập yêu cầu đăng nhập để tiếp tục</span> :
						undefined} />}
				<div className={cx("fresnel-lessThan-desktopS")}>
					{/* mobile menu */}
					<Container>
						<NavLink to={config.routes.home}>
							<img src={"/static/images/logo.webp"} alt="icon" className={cx("Logo")} />
						</NavLink>
						<ContainerRightContent />
					</Container>
				</div>
				<div className={cx("fresnel-greaterThanOrEqual-desktopS")}>
					<nav className={cx("Container")}>
						<NavLink to={config.routes.home}>
							<img src={"/static/images/logo.webp"} alt="icon" className={cx("Logo")} />
						</NavLink>
						<div className={cx("MenuItem")}>
							<NavLink to={config.routes.job}
								className={(nav) => cx({ Active: nav.isActive })}
							>tìm việc làm</NavLink>
						</div>
						<div className={cx("MenuItem")}>
							<NavLink to={config.routes.company}
								className={(nav) => cx({ Active: nav.isActive })}
							>danh sách công ty</NavLink>
						</div>
						{/* <div className={cx("MenuItem")}>
							<NavLink to={config.routes.blog}
								className={(nav) => cx({ Active: nav.isActive })}
							>blog</NavLink>
						</div> */}
						<div className={cx("RightMenuContainer")}>
							<div className={cx("UserMenuItem")}>
								<LanguageSwitcherContainer />
							</div>
							{currentUser ?
								<>
									<div className={cx("UserMenuItem")}>
										{/* chuaw code xong */}
										<div className={cx("DropdownStyle__DropdownContainer")}>
											<div>
												<button className={cx("UnstyleButton")} aria-label="Notification"
													type="button" >
													<FontAwesomeIcon className={cx("IconStyle__VerticalCenteredSvg")} icon={faBell} />
												</button>
											</div>
										</div>
									</div>
									<div className={cx("UserMenuItem")}>
										{<UserMenu currentUser={currentUser} />}
									</div>
								</> :
								<>
									<div onClick={handleSignUp} className={cx("MenuItem")}>đăng ký</div>
									<div onClick={handleShowLogin} className={cx("MenuItem")}>đăng nhập</div>
									<div className={cx("EmployersButton")}>
										<Link
											to={config.routes.recruitment}
											target="_blank" >
											dành cho nhà tuyển dụng
											<span><RightArrowIcon className={cx("EndIconContainer")} /></span>
										</Link>
									</div>
								</>}
						</div>
					</nav>
				</div>
			</GlintContainer>
		</div>
	);
}

export default Header;
