import classNames from "classnames/bind";

import styles from "./ParagraphStyle.module.scss";

const cx = classNames.bind(styles);

function Paragraph({ bold = "normal", color = "#000", className, children }) {
  // console.log("pass class name into component", className);
  const test = cx(className, "Paragraph");
  // console.log(test);
  return (
    <p className={test}
      style={{
        color: color,
        fontWeight: bold
      }} >
      {children}
    </p>
  )
}

export default Paragraph;
