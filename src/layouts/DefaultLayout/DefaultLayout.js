import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from "../Header/Header";
import styles from "../MainContainer.module.scss";
import Footer from '../Footer/Footer';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import ScrollTopContainer from '../../components/ScrollTopButton/ScrollTopContainer';
import MobileMenu from '../MobileMenu/MobileMenu';
import ModalContainer from '../../components/ModalStyle/ModalContainer';
import ModalHeader from '../../components/ModalStyle/ModalHeader';
import ModalDialog from '../../components/ModalStyle/ModalDialog';
import ModalContentArea from '../../components/ModalStyle/ModalContentArea';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
	const [gotoTop, setGoToTop] = useState(false);
	// toast.info("Server sẽ tự động tắt sau một thời gian không sử dụng, vui lòng đợi phản hồi từ server", {
	// 	position: "top-center",
	// 	autoClose: false,
	// 	closeButton: true
	// });
	// const ref = useRef();
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setGoToTop(true);
			} else {
				setGoToTop(false);
			}
		}
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		}
	}, []);
	return (
		<div>
			{/* Modal here */}
			{/* <ModalContainer>
				<ModalDialog>
					<ModalContentArea>
						<ModalHeader header={"Server sẽ tự động tắt sau một thời gian không sử dụng, vui lòng đợi phản hồi từ server"}/>
					</ModalContentArea>
				</ModalDialog>
			</ModalContainer> */}
			<div className={cx("DrawerContainer")}>
				<div className={cx("fresnel-lessThan-desktopS")}>
					<MobileMenu />
				</div>
				<div className={cx("MainLayout")}>
					<Header />
					<div className={cx("MainBody")}>
						{children}
						<Footer />
					</div>
				</div>
			</div>
			{<ScrollTopContainer isVisible={gotoTop}>
				<FontAwesomeIcon icon={faArrowUp} />
			</ScrollTopContainer>}
		</div>
	)
}

DefaultLayout.propTypes = {
	children: PropTypes.node.isRequired
}

export default DefaultLayout;
