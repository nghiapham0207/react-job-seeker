import classNames from "classnames/bind";

import styles from "./AlertsErrorMessage.scss";

const cx = classNames.bind(styles);

function AlertsErrorMessage({ messageHeader, children }) {
	return (
		<div className={cx("alerts__ErrorMessage")}>
			<div className={cx("alerts__ErrorMessageHeader")}>{messageHeader}</div>
			{children}
		</div>
	);
}

export default AlertsErrorMessage;
