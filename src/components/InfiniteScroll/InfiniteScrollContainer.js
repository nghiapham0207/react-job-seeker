import classNames from "classnames/bind";

import styles from "./InfiniteScroll.module.scss";

const cx = classNames.bind(styles);

function InfiniteScrollContainer({ width = "2rem", height = "2rem", style, children }) {
  return (
    <div className={cx("InfiniteScrollContainer")}
      style={{ ...style }} >
      <div
        style={{ ...style, width: width, height: height }}
      ></div>
      <span>{children}</span>
    </div>
  )
}

export default InfiniteScrollContainer;
