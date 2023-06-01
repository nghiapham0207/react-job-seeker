import classNames from "classnames/bind";

import styles from "./ModalTest.module.scss";

const cx = classNames.bind(styles);

function ModalContainer({ modalRef, handleShowModal, className, children }) {
	return (
		// <div className={cx("ModalContainer", { [className]: className })}
		<div
			className={cx(className, "ModalContainer")}
			onClick={(e) => {
				if (!modalRef.current?.contains(e.target)) {
					handleShowModal();
				}
			}}>
			{children}
		</div>
	);
}

export default ModalContainer;
