import classNames from "classnames/bind";

import styles from "./ModalTest.module.scss";

const cx = classNames.bind(styles);

function ModalBody({ className, children }) {
	return <section className={cx("ModalBody", { [className]: className })}>{children}</section>;
}

export default ModalBody;
