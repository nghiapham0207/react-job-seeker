import classNames from "classnames/bind";

import styles from "./ExploreTab.module.scss";
import { ModalDialog } from "../ModalStyle";
import { useFilterOptions } from "../../contexts/filterOptionsContext";
import { updateCompanies, updateLocationWorking, updateOccupations } from "../../redux/filterSlice";
import { CollapsibleContainer, CollapsibleContent, CollapsibleHeader, CollapsibleBody } from "../CollapsibleStyle";
import Checkbox from "../CheckboxStyle";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { get, path } from "../../utils/axiosAPI";

const cx = classNames.bind(styles);

function FilterContainer() {
	const { filterOptions, setFilterOptions } = useFilterOptions();
	const dispatch = useDispatch();
	const occupationsChange = (obj, checked) => {
		dispatch(updateOccupations({ obj, checked }));
	};
	const companiesChange = (obj, checked) => {
		dispatch(updateCompanies({ obj, checked }));
	};
	const locationWorkingChange = (obj, checked) => {
		dispatch(updateLocationWorking({ obj, checked }));
	};
	useEffect(() => {
		const fetchOccupations = async () => {
			const [resOccupations, resCompanies] = await Promise.all([get(path.occupations), get(path.companies)]);
			const newOccupations = resOccupations?.data?.data.map((occupation) => {
				return {
					id: occupation._id,
					label: occupation.name,
					ariaLabel: occupation._id,
					value: occupation._id,
					checked: false,
				};
			});
			const newCompanies = resCompanies?.data?.data.map((occupation) => {
				return {
					id: occupation._id,
					label: occupation.name,
					ariaLabel: occupation._id,
					value: occupation._id,
					checked: false,
				};
			});
			setFilterOptions((pre) => {
				return {
					...pre,
					companies: newCompanies,
					occupations: newOccupations,
				};
			});
		};
		fetchOccupations();
		// Not
	}, [setFilterOptions]);
	return (
		<div className={cx("DesktopStickyFilterContainer")}>
			<ModalDialog>
				<div className={cx("styles__FilterList")}>
					<CollapsibleContainer className={cx("styles__Collapsible")}>
						<CollapsibleContent>
							<CollapsibleHeader title="Thành Phố" className={cx("collapsible-title")} />
							<CollapsibleBody>
								<div className={cx("styles__CheckboxContainer")}>
									{filterOptions.locationWorkings.map((item) => {
										return <Checkbox key={item.id} obj={item} onChange={locationWorkingChange} />;
									})}
								</div>
							</CollapsibleBody>
						</CollapsibleContent>
					</CollapsibleContainer>

					<CollapsibleContainer className={cx("styles__Collapsible")}>
						<CollapsibleContent>
							<CollapsibleHeader title="Danh mục công việc" className={cx("collapsible-title")} />
							<CollapsibleBody>
								<div className={cx("styles__CheckboxContainer")}>
									{filterOptions.occupations.map((item) => {
										return <Checkbox key={item.id} obj={item} onChange={occupationsChange} />;
									})}
								</div>
							</CollapsibleBody>
						</CollapsibleContent>
					</CollapsibleContainer>

					<CollapsibleContainer className={cx("styles__Collapsible")}>
						<CollapsibleContent>
							<CollapsibleHeader title="Công ty" className={cx("collapsible-title")} />
							<CollapsibleBody>
								<div className={cx("styles__CheckboxContainer")}>
									{filterOptions.companies.map((item) => {
										return <Checkbox key={item.id} obj={item} onChange={companiesChange} />;
									})}
								</div>
							</CollapsibleBody>
						</CollapsibleContent>
					</CollapsibleContainer>
				</div>
			</ModalDialog>
		</div>
	);
}

export default memo(FilterContainer);
