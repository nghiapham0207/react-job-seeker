import classNames from "classnames/bind";
import styles from "./ScrollTopButton.module.scss";
import { useRef } from "react";

const cx = classNames.bind(styles);

function ScrollTopContainer({ isVisible, children }) {
  const scrollTopRef = useRef(null);
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
    // document.querySelector("html, body").scrollTop = 0;
    // document.querySelector("html, body").animate([
    //   {
    //     scrollTop: 0
    //   }
    // ], 1500);
  }
  // const test = document.querySelector("#test");
  // test.animate()
  // const handleScroll = () => {
  //   window.scrollTo({
  //     top: 0
  //   })
  // console.log({ "test": document.querySelector("html, body") });
  //   document.querySelector("body").animate({scrollTop: 0}, 1500, 'easeInOutExpo');
  //   return false;
  // }
  return (
    <a
      ref={scrollTopRef}
      // href="#top"
      id="test"
      style={{
        opacity: isVisible ? "1" : "0",
        display: isVisible ? "" : "none",
        transition: "all 0.8s linear 0s"
      }}
      className={cx("ScrollTopContainer")}
      // title='Back to top'
      aria-label="Top"
      role="button"
      onClick={handleScroll}
    >
      {children}
    </a>
  )
}

export default ScrollTopContainer;
