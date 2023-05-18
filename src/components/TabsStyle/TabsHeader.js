import classNames from "classnames/bind";

import styles from "./TabsStyle.module.scss";

const cx = classNames.bind(styles);

export default function TabsHeader({ className, children }) {
  return (
    <div className={cx("TabsHeader", className)}>
      {children}
    </div>
  )
}