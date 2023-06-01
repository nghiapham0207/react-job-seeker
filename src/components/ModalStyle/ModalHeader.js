import classNames from "classnames/bind";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./ModalTest.module.scss";

const cx = classNames.bind(styles);

function ModalHeader({ header, handleShowModal }) {
	return (
		<header className={cx("ModalHeader")}>
			<h3>
				{header && (
					<p className={cx("modal-title", "Large-Text")}>
						<span>{header}</span>
					</p>
				)}
			</h3>
			<button onClick={handleShowModal} className={cx("UnstyleButton")} title="Close" type="button">
				<span className={cx("VerticalCenteredSvg")}> {<FontAwesomeIcon icon={faXmark} />} </span>
			</button>
		</header>
	);
}

export default ModalHeader;
