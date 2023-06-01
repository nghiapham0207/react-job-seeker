import classNames from "classnames/bind";

import styles from "./ModalTest.module.scss";

const cx = classNames.bind(styles);

function ModalContentArea({ className, modalRef, children }) {
	return (
		<div ref={modalRef} className={cx(className, "ModalContentArea")}>
			{children}
		</div>
	);
}

export default ModalContentArea;
