import { useDispatch } from "react-redux";
import {
  ModalBody,
  ModalContainer,
  ModalContentArea,
  ModalDialog,
  ModalHeader
} from "../ModalStyle";
import {
  updateCompanies,
  updateLocationWorking,
  updateOccupations
} from "../../redux/filterSlice";
import {
  CollapsibleBody,
  CollapsibleContainer,
  CollapsibleContent,
  CollapsibleHeader
} from "../CollapsibleStyle";
import Checkbox from "../CheckboxStyle/Checkbox";

function MobileFilter({ handleShowModal, modalRef, locationWorkings, companies, occupations }) {
  const dispatch = useDispatch();
  const occupationsChange = (obj, checked) => {
    dispatch(updateOccupations({ obj, checked }))
  }
  const companiesChange = (obj, checked) => {
    dispatch(updateCompanies({ obj, checked }))
  }
  const locationWorkingChange = (obj, checked) => {
    dispatch(updateLocationWorking({ obj, checked }))
  }
  return (
    <ModalContainer modalRef={modalRef}
      className={("MobileModal")}
      handleShowModal={handleShowModal} >
      <ModalDialog>
        <ModalContentArea modalRef={modalRef} className={("modal-content")}>
          <ModalHeader header={"Lọc tìm kiếm của bạn"}
            className={("styles__Header")}
            handleShowModal={handleShowModal} />
          <ModalBody className={"modal-body"}>
            <div className={("styles__FilterList")}>
              <CollapsibleContainer className={("styles__Collapsible")}>
                <CollapsibleContent>
                  <CollapsibleHeader title="Thành Phố"
                    className={("collapsible-title")} />
                  <CollapsibleBody>
                    <div className={("styles__CheckboxContainer")}>
                      {locationWorkings.map((item) => {
                        return <Checkbox key={item.id} obj={item}
                          onChange={locationWorkingChange} />
                      })}
                    </div>
                  </CollapsibleBody>
                </CollapsibleContent>
              </CollapsibleContainer>

              <CollapsibleContainer className={("styles__Collapsible")}>
                <CollapsibleContent>
                  <CollapsibleHeader title="Danh mục công việc"
                    className={("collapsible-title")} />
                  <CollapsibleBody>
                    <div className={("styles__CheckboxContainer")}>
                      {occupations.map((item) => {
                        return <Checkbox key={item.id} obj={item}
                          onChange={occupationsChange}
                        />
                      })}
                    </div>
                  </CollapsibleBody>
                </CollapsibleContent>
              </CollapsibleContainer>

              <CollapsibleContainer className={("styles__Collapsible")}>
                <CollapsibleContent>
                  <CollapsibleHeader title="Công ty"
                    className={("collapsible-title")} />
                  <CollapsibleBody>
                    <div className={("styles__CheckboxContainer")}>
                      {companies.map((item) => {
                        return <Checkbox key={item.id} obj={item}
                          onChange={companiesChange}
                        />
                      })}
                    </div>
                  </CollapsibleBody>
                </CollapsibleContent>
              </CollapsibleContainer>
            </div>
          </ModalBody>
        </ModalContentArea>
      </ModalDialog>
    </ModalContainer>
  )
}

export default MobileFilter;
