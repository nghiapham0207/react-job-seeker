import classNames from "classnames/bind";

import styles from "./ExploreTab.module.scss";
import { ModalDialog } from "../ModalStyle";
import { updateCompanies, updateLocationWorking, updateOccupations } from "../../redux/filterSlice";
import {
  CollapsibleContainer,
  CollapsibleContent,
  CollapsibleHeader,
  CollapsibleBody
} from "../CollapsibleStyle";
import Checkbox from "../CheckboxStyle";
import { memo } from "react";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

function FilterContainer({ locationWorkings, companies, occupations }) {
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
    <div className={cx("DesktopStickyFilterContainer")}>
      <ModalDialog>
        <div className={cx("styles__FilterList")}>
          <CollapsibleContainer className={cx("styles__Collapsible")}>
            <CollapsibleContent>
              <CollapsibleHeader title="Thành Phố"
                className={cx("collapsible-title")} />
              <CollapsibleBody>
                <div className={cx("styles__CheckboxContainer")}>
                  {locationWorkings.map((item) => {
                    return <Checkbox key={item.id} obj={item}
                      onChange={locationWorkingChange} />
                  })}
                </div>
              </CollapsibleBody>
            </CollapsibleContent>
          </CollapsibleContainer>

          <CollapsibleContainer className={cx("styles__Collapsible")}>
            <CollapsibleContent>
              <CollapsibleHeader title="Danh mục công việc"
                className={cx("collapsible-title")} />
              <CollapsibleBody>
                <div className={cx("styles__CheckboxContainer")}>
                  {occupations.map((item) => {
                    return <Checkbox key={item.id} obj={item}
                      onChange={occupationsChange}
                    />
                  })}
                </div>
              </CollapsibleBody>
            </CollapsibleContent>
          </CollapsibleContainer>

          <CollapsibleContainer className={cx("styles__Collapsible")}>
            <CollapsibleContent>
              <CollapsibleHeader title="Công ty"
                className={cx("collapsible-title")} />
              <CollapsibleBody>
                <div className={cx("styles__CheckboxContainer")}>
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
      </ModalDialog>
    </div>
  )
}

export default memo(FilterContainer);