import classNames from "classnames/bind";
import { useRef } from "react";
import ModalBody from "../ModalStyle/ModalBody";
import ModalContainer from "../ModalStyle/ModalContainer";
import ModalContentArea from "../ModalStyle/ModalContentArea";
import ModalDialog from "../ModalStyle/ModalDialog";
import ModalHeader from "../ModalStyle/ModalHeader";
import LoginForm from "./LoginForm/LoginForm";

import styles from "./LoginModal.module.scss";

const cx = classNames.bind(styles);

function LoginModal({ handleShowLogin }) {
  const modalRef = useRef();

  return (
    <div className={cx("LoginModalContainer")}>
      <ModalContainer
        className={cx("MobileModal")}
        handleShowModal={handleShowLogin} modalRef={modalRef}>
        <ModalDialog>
          <ModalContentArea
            className={cx("modal-content")}
            modalRef={modalRef}>
            <ModalHeader header="Login" handleShowModal={handleShowLogin} />
            <ModalBody className={cx("modal-body")}>
              <div className={cx("Large-Text")}
                style={{ padding: " 20px 20px 0px" }} >
                <span>Đăng nhập Glints để tiếp tục</span>
              </div>
              <div>
                <LoginForm handleShowLogin={handleShowLogin} />
              </div>
            </ModalBody>
          </ModalContentArea>
        </ModalDialog>
      </ModalContainer>
    </div>
  )
}

export default LoginModal;
