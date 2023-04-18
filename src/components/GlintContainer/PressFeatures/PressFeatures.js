import classNames from "classnames/bind";

import styles from "./PressFeatures.module.scss";
import images from "../../../assets/images";

const cx = classNames.bind(styles);

function PressFeatures() {
	return (
		<div className={cx("Container")}>
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
