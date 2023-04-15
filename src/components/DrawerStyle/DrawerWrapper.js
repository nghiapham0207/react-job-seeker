import classNames from "classnames/bind";

import styles from "./DrawerStyle.module.scss";

const cx = classNames.bind(styles);

function DrawerWrapper({ className, children }) {
  return (
    <div className={cx(className, "DrawerWrapper")}>
      {children}
    </div>
  )
}

export default DrawerWrapper;
