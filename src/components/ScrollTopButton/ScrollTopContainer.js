import classNames from "classnames/bind";
import styles from "./ScrollTopButton.module.scss";
import { useRef } from "react";

const cx = classNames.bind(styles);

function ScrollTopContainer({ isVisible, children }) {
	const scrollTopRef = useRef(null);
	const handleScroll = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<div
			ref={scrollTopRef}
			// href="#top"
			id="test"
			style={{
				opacity: isVisible ? "1" : "0",
				display: isVisible ? "" : "none",
				transition: "all 0.8s linear 0s",
			}}
			className={cx("ScrollTopContainer")}
			// title='Back to top'
			aria-label="Top"
			role="button"
			onClick={handleScroll}>
			{children}
		</div>
	);
}

export default ScrollTopContainer;
