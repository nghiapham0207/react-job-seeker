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

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
	const [gotoTop, setGoToTop] = useState(false);
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
