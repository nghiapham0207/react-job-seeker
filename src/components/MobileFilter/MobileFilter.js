import FilterContainer from "../ExploreTab/FilterContainer";
import { Paragraph } from "../ParagraphStyle";
import { ModalBody, ModalContainer, ModalContentArea, ModalDialog, ModalHeader } from "../ModalStyle";


function MobileFilter() {
  return (
    <ModalContainer className="MobileModal">
      <ModalDialog>
        <ModalContentArea className={"modal-content"}>
          <ModalBody className={"modal-body"}>
            <div className="styles__Header">
              <Paragraph>
                Lọc tìm kiếm của bạn
              </Paragraph>
            </div>
          </ModalBody>
        </ModalContentArea>
      </ModalDialog>
    </ModalContainer>
  )
}

export default MobileFilter;
