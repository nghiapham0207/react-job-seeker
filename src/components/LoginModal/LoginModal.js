import classNames from "classnames/bind";
import { useRef } from "react";
import ModalBody from "../ModalStyle/ModalBody";
import ModalContainer from "../ModalStyle/ModalContainer";
import ModalContentArea from "../ModalStyle/ModalContentArea";
import ModalDialog from "../ModalStyle/ModalDialog";
import ModalHeader from "../ModalStyle/ModalHeader";
import LoginForm from "./LoginForm/LoginForm";
import { useUserActions } from "../../contexts/userActionsContext";


import styles from "./LoginModal.module.scss";

const cx = classNames.bind(styles);

function LoginModal({ message = "Đăng nhập Glints để tiếp tục" }) {
  const modalRef = useRef();
  const UserActionsContext = useUserActions();
  const { handleShowLogin } = UserActionsContext;

  return (
    <div className={cx("LoginModalContainer")}>
      <ModalContainer
        handleShowModal={handleShowLogin} modalRef={modalRef}>
        <ModalDialog>
          <ModalContentArea
            modalRef={modalRef}>
            <ModalHeader header="Login" handleShowModal={handleShowLogin} />
            <ModalBody>
              <div className={cx("Large-Text")}
                style={{ padding: " 20px 20px 0px" }} >
                <span>{message}</span>
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
