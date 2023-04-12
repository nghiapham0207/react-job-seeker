import classNames from "classnames/bind";
import styles from "./ScrollTopButton.module.scss";

const cx = classNames.bind(styles);

function ScrollTopContainer({ isVisible, children }) {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  return (
    <a
      // href="#top"
      style={{
        opacity: isVisible ? "1" : "0",
        display: isVisible ? "" : "none"
      }}
      className={cx("ScrollTopContainer")} aria-label="#top"
      title='Back to top'
      onClick={handleScroll}
    >
      {children}
    </a>
  )
}

export default ScrollTopContainer;
