import FilterContainer from "../ExploreTab/FilterContainer";
import { Paragraph } from "../ParagraphStyle";
import { ModalBody, ModalContainer, ModalContentArea, ModalDialog, ModalHeader } from "../ModalStyle";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCompanies, updateLocationWorking, updateOccupations } from "../../redux/filterSlice";
import { get, path } from "../../utils/axiosAPI";
import { CollapsibleBody, CollapsibleContainer, CollapsibleContent, CollapsibleHeader } from "../CollapsibleStyle";
import Checkbox from "../CheckboxStyle/Checkbox";

// create context for it to reset when enter search
const initLocationWorking = [
  { id: 1, label: "Hồ Chí Minh", ariaLabel: "hcm", value: "Hồ Chí Minh", checked: false },
  { id: 2, label: "Hà Nội", ariaLabel: "hn", value: "Hà Nội", checked: false },
  { id: 3, label: "Đà Nẵng", ariaLabel: "dn", value: "Đà Nẵng", checked: false }
]

function MobileFilter({ handleShowModal, modalRef }) {
  const [occupations, setOccupations] = useState([]);
  const [companies, setCompanies] = useState([]);
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
  useEffect(() => {
    const fetchOccupations = async () => {
      const [resOccupations, resCompanies] = await Promise.all([
        get(path.occupations),
        get(path.companies)
      ]);
      // const resOccupations = await get(path.occupations);
      // console.log(resOccupations);
      const newOccupations = resOccupations.data.data.map((occupation) => {
        return {
          id: occupation._id,
          label: occupation.name,
          ariaLabel: occupation._id,
          value: occupation._id,
          checked: false
        }
      })
      const newCompanies = resCompanies.data.data.map((occupation) => {
        return {
          id: occupation._id,
          label: occupation.name,
          ariaLabel: occupation._id,
          value: occupation._id,
          checked: false
        }
      })
      // setOccupations([...occupations, ...newOccupations]);
      setOccupations(newOccupations);
      setCompanies(newCompanies);
    }
    fetchOccupations();
  }, []);
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
                      {initLocationWorking.map((item) => {
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
