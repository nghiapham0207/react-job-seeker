import classNames from "classnames/bind";

import styles from "../MainContainer.module.scss";
// import {
//   TabsContainer,
//   TabsHeader
// } from "../../components/TabsStyle";
import { useEffect, useState } from "react";
import MobileMenu from "../MobileMenu/MobileMenu";
import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer/Footer";
import ScrollTopContainer from "../../components/ScrollTopButton/ScrollTopContainer";
// import config from '../../config';

const cx = classNames.bind(styles);

export default function ExploreTabLayout({ children }) {
	const [gotoTop, setGoToTop] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setGoToTop(true);
			} else {
				setGoToTop(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<div>
			<div className={cx("DrawerContainer")}>
				<div className={cx("fresnel-lessThan-desktopS")}>
					<MobileMenu />
				</div>
				<div className={cx("MainLayout")}>
					<Header />
					<div className={cx("MainBody")}>
						{/* <TabsContainer className={"styles__JobTabList"}>
              <TabsHeader className={"tabs-header"} />
            </TabsContainer> */}
						{children}
						<Footer />
					</div>
				</div>
			</div>
			{
				<ScrollTopContainer isVisible={gotoTop}>
					<FontAwesomeIcon icon={faArrowUp} />
				</ScrollTopContainer>
			}
		</div>
	);
}
