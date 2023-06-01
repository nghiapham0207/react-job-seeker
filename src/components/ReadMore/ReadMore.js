import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./ReadMore.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ReadMore({ text, maxLength = 300 }) {
	const [isTruncated, setIsTruncated] = useState(text?.length < maxLength);
	const descRef = useRef(null);
	useEffect(() => {
		descRef.current.innerHTML = isTruncated ? `${text?.slice(0, maxLength)}....` : text;
	}, [text, isTruncated, maxLength]);
	return (
		<>
			<div className={cx("JobDescription__DescriptionContainer")}>
				{/* <p ref={descRef}>{isTruncated ? `${text?.slice(0, maxLength)}....` : text}</p> */}
				<p ref={descRef}></p>
			</div>
			<div className={cx("JobDescription__ReadButton")}>
				<button
					type="button"
					className={cx("ButtonStyle__Button", "ButtonStyle__LinkBtn")}
					onClick={() => {
						setIsTruncated(!isTruncated);
					}}>
					<span>{isTruncated ? "Xem thêm" : "Ẩn bớt"}</span>
					<span className={cx("ButtonStyle__EndIconContainer")}>
						<FontAwesomeIcon
							icon={isTruncated ? faAngleDown : faAngleUp}
							className={cx("IconStyle__VerticalCenteredSvg")}
						/>
					</span>
				</button>
			</div>
		</>
	);
}

export default ReadMore;
