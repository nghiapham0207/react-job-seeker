import classNames from "classnames/bind";

import styles from "./PressFeatures.module.scss";
import images from "../../../assets/images";
import { useEffect } from "react";
import { useRef } from "react";

const cx = classNames.bind(styles);

function PressFeatures() {
	const pressFeaturesContainerRef = useRef();

	useEffect(() => {
		const element = pressFeaturesContainerRef.current;
		const isInViewport = (element) => {
			// var bounding = element.getBoundingClientRect(),
			// 	myElementHeight = element.offsetHeight,
			// 	myElementWidth = element.offsetWidth; // var declaration
			// if (bounding.top >= -myElementHeight
			// 	&& bounding.left >= -myElementWidth
			// 	&& bounding.right <= (window.innerWidth || document.documentElement.clientWidth) + myElementWidth
			// 	&& bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + myElementHeight) {
			// 	return true;
			// } else {
			// 	return false;
			// }

			// 
			var windowHeight = window.innerHeight;
			var elementTop = element.getBoundingClientRect().top;
			var elementVisible = 150;

			if (elementTop < windowHeight - elementVisible) {
				return true;
			} else {
				return false;
			}
		};
		const onScroll = () => {
			if (isInViewport(element)) {
				element.style.animation = "fadeInBottom 1s ease-in 0s 1 normal ";
				element.style.visibility = "visible";
			} else {
				element.style.animation = "none";
				element.style.visibility = "hidden";
			}
		};

		window.addEventListener("scroll", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
		}
	}, [])
	return (
		<div ref={pressFeaturesContainerRef} className={cx("Container")}>
			<div className={cx("FlexCenter")}>
				<h1 className={cx("HeadingContainer")}>
					<span className="heading-text">
						<span>Glints Trên Truyền Thông</span>
					</span>
				</h1>
			</div>
			<div className={cx("FlexBox")}>
				<img src={images.cna}
					alt="Channel NewsAsia" width="50px" height="45px"
					className={cx("Image")} />
				<img src={images.huffington}
					alt="The Huffington Post" width="293px" height="35px"
					className={cx("Image")} />
				<img src={images.yahoo}
					alt="Yahoo News" width="104px" height="45px"
					className={cx("Image")} />
				<img src={images.straitstimes}
					alt="Channel NewsAsia" width="63px" height="45px"
					className={cx("Image")} />
				<img src={images.techcrunch}
					alt="TechCrunch" width="181px" height="45px"
					className={cx("Image")} />
				<img src={images.bussinessTimes}
					alt="Business Times" width="293px" height="28px"
					className={cx("Image")} />
			</div>
		</div>
	)
}

export default PressFeatures;
