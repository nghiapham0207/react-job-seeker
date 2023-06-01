import { Link } from "react-router-dom";

import { LanguageIcon, DropdownIcon } from "../../components/Icon";
import { useEffect, useRef, useState } from "react";

function LanguageSwitcherContainer() {
	const [showLanguageMenu, setShowLanguageMenu] = useState(false);
	const languageRef = useRef();
	useEffect(() => {
		const handleLanguageMenuMousedown = (e) => {
			if (!languageRef.current?.contains(e.target)) {
				setShowLanguageMenu(false);
			}
		};
		window.addEventListener("click", handleLanguageMenuMousedown);
		return () => {
			window.removeEventListener("click", handleLanguageMenuMousedown);
		};
	});
	return (
		<div className={"language"}>
			<div className={"DropdownStyle__DropdownContainer"}>
				<div className={"DropdownStyle__DropdownWrapper"}>
					<div
						ref={languageRef}
						className={"DropdownStyle__DropdownHeader"}
						onClick={() => {
							setShowLanguageMenu(!showLanguageMenu);
						}}>
						<LanguageIcon width="12px" height="12px" />
						<span className={"mx-2"}>vi</span>
						<span
							className={"DropdownStyle__IconWrapper"}
							style={{
								transform: showLanguageMenu ? "rotate(180deg)" : "rotate(0)",
							}}>
							<DropdownIcon className={"IconStyle__VerticalCenteredSvg"} />
						</span>
					</div>
					<div
						className={"DropdownStyle__DropdownBody DropdownStyle__DropdownBody--Left"}
						style={{ display: showLanguageMenu ? "block" : "none" }}>
						<Link to={"/en"} className={"DropdownStyle__DropdownItemWrapper"}>
							Tiếng Anh
						</Link>
						<Link to={"/vi"} className={"DropdownStyle__DropdownItemWrapper"}>
							Tiếng Việt
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LanguageSwitcherContainer;

/*
<div className={cx("language")}>
    <div className={cx("DropdownStyle__DropdownContainer")}>
      <div className={cx("DropdownStyle__DropdownWrapper")}>
        <div ref={languageRef} className={cx("DropdownStyle__DropdownHeader")}
          onClick={() => {
            setShowLanguageMenu(!showLanguageMenu);
          }} >
          <LanguageIcon width="12px" height="12px" />
          <span className={cx("mx-2")}>vi</span>
          <span className={cx("DropdownStyle__IconWrapper")}
            style={{ transform: showLanguageMenu ? "rotate(180deg)" : "rotate(0)" }} >
            <DropdownIcon className={cx("IconStyle__VerticalCenteredSvg")} />
          </span>
        </div>
        <div className={cx("DropdownStyle__DropdownBody", "DropdownStyle__DropdownBody--Left")}
          style={{ display: showLanguageMenu ? "block" : "none" }} >
          <Link to={"/en"} className={cx("DropdownStyle__DropdownItemWrapper")}>
            Tiếng Anh
          </Link>
          <Link to={"/vi"} className={cx("DropdownStyle__DropdownItemWrapper")}>
            Tiếng Việt
          </Link>
        </div>
      </div>
    </div>
  </div>
*/
