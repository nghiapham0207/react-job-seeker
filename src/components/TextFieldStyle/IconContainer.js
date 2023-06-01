import classNames from "classnames/bind";

import styles from "./TextFieldStyle.module.scss";

const cx = classNames.bind(styles);

function IconContainer({ onClick, children }) {
	return (
		<div className={cx("TextFieldStyled__IconContainer")} onClick={onClick}>
			{children}
		</div>
	);
}

export default IconContainer;
