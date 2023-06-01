import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { usePastJobSearch } from "../../contexts/pastJobSearchContext";
import { useSearchInput } from "../../contexts/searchInputContext";
import { updateSearch } from "../../redux/filterSlice";

import { SearchIcon, LocationIcon, CloseIcon } from "../Icon";
import { SuggestionDropdownContainer, SuggestionDropdown, SearchItemWrapper } from "../SearchField";
import styles from "./SearchContainer.module.scss";
import { get, path } from "../../utils/axiosAPI";
import { useNavigate } from "react-router-dom";
import routes from "../../config/routes";
import { useEffect, useRef, useState } from "react";
import { useDeferred } from "../../hooks";
import SolidBtnContainer from "../ButtonStyle/SolidBtnContainer";
import SolidButton from "../ButtonStyle/SolidButton";
import IconContainer from "../TextFieldStyle/IconContainer";
import { flushSync } from "react-dom";

const cx = classNames.bind(styles);

// const initKey = [
//   "test 1",
//   "test 2",
//   "test 3"
// ]

function SearchContainer(isHomePage = false) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [currentActive, setCurrentActive] = useState(-1);
	const selectedRef = useRef(null);
	const [showSuggestion, setShowSuggestion] = useState(false);
	const [suggestionKey, setSuggestionKey] = useState([]);
	const PastJobSearchContext = usePastJobSearch();
	const { pastJobSearch, updatePastJobSearch } = PastJobSearchContext;
	const SearchInputContext = useSearchInput();
	const { searchInput, setSearchInput } = SearchInputContext;
	const testArray = pastJobSearch ? [...pastJobSearch] : [];
	const deferredValue = useDeferred(searchInput, 500);
	const suggestionRef = useRef(null);
	const inputRef = useRef(null);
	const scrollIntoView = (node) => {
		node?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center",
		});
	};
	const savePastJobSearch = (keyword) => {
		if (keyword) {
			let isExist = false;
			isExist = testArray.some((item) => {
				return item.keyword === keyword;
			});
			if (!isExist) {
				if (testArray?.length >= 3) {
					testArray?.shift();
				}
				testArray?.push({
					label: "Tìm kiếm gần đây:",
					keyword: keyword,
				});
				updatePastJobSearch({
					label: "Tìm kiếm gần đây:",
					keyword: keyword,
				});
				if (testArray.length) {
					localStorage.setItem("pastJobSearch", JSON.stringify(testArray));
				}
			}
		}
	};
	useEffect(() => {
		if (deferredValue.trim()) {
			const fetchSuggestion = async () => {
				try {
					const res = await get(path.searchSuggestion, {
						params: {
							keyword: deferredValue,
						},
					});
					setSuggestionKey(res.data);
					setCurrentActive(-1);
				} catch (error) {
					console.log(error);
				}
			};
			fetchSuggestion();
		} else {
			setSuggestionKey([]);
		}
	}, [deferredValue]);
	const handleEnter = (searchInput) => {
		if (isHomePage && searchInput) {
			setShowSuggestion(false);
			navigate(routes.job);
		}
		savePastJobSearch(searchInput);
		dispatch(updateSearch(searchInput));
		setShowSuggestion(false);
	};
	const handleSuggestionClick = (keyword) => {
		setShowSuggestion(false);
		setSearchInput(keyword);
		handleEnter(keyword);
	};
	const handleInputFocus = (e) => {
		if (e.target.value) {
			setShowSuggestion(true);
		}
	};
	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (!suggestionRef?.current?.contains(e.target) && e.target !== inputRef.current) {
				setShowSuggestion(false);
			}
		};
		window.addEventListener("mousedown", handleOutsideClick);
		return () => {
			window.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);
	return (
		<div className={cx("Container")}>
			<div className={cx("FieldWrapper")}>
				<div className={cx("TextFieldStyled__TextFieldContainer")}>
					<input
						className={cx("TextFieldStyled__TextFieldInput")}
						placeholder="Tìm kiếm việc làm"
						spellCheck={false}
						ref={inputRef}
						value={searchInput}
						onChange={(e) => {
							setSearchInput(e.target.value);
							setShowSuggestion(true);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								if (currentActive >= 0 && currentActive <= suggestionKey.length - 1) {
									handleSuggestionClick(selectedRef.current.innerText);
								} else {
									handleSuggestionClick(searchInput);
								}
							} else if (e.key === "ArrowUp") {
								flushSync(() => {
									if (currentActive === 0) {
										setCurrentActive(suggestionKey.length - 1);
									} else {
										setCurrentActive(currentActive - 1);
									}
								});
								scrollIntoView(selectedRef.current);
							} else if (e.key === "ArrowDown") {
								flushSync(() => {
									if (currentActive < suggestionKey.length - 1) {
										setCurrentActive(currentActive + 1);
									} else {
										setCurrentActive(0);
									}
								});
								scrollIntoView(selectedRef.current);
							}
						}}
						onFocus={handleInputFocus}
					/>
					<div className={cx("TextFieldStyled__StartIconContainer")}>
						<SearchIcon className={cx("IconStyle__VerticalCenteredSvg")} />
					</div>
					{searchInput && (
						<IconContainer
							onClick={() => {
								setSearchInput("");
							}}>
							<CloseIcon className={cx("IconStyle__VerticalCenteredSvg")} />
						</IconContainer>
					)}
				</div>

				{/* suggestion here */}
				{
					<SuggestionDropdownContainer ref={suggestionRef}>
						<SuggestionDropdown>
							{searchInput &&
								showSuggestion &&
								suggestionKey.map((item, index) => {
									return (
										<SearchItemWrapper
											key={index}
											keyword={item}
											ref={currentActive === index ? selectedRef : null}
											index={index}
											isActive={currentActive === index}
											onHover={setCurrentActive}
											onSuggestionClick={handleSuggestionClick}
										/>
									);
								})}
						</SuggestionDropdown>
					</SuggestionDropdownContainer>
				}
			</div>
			<div className={cx("FieldWrapper")}>
				<div className={cx("TextFieldStyled__TextFieldContainer")}>
					<input
						className={cx("TextFieldStyled__TextFieldInput")}
						placeholder="Thêm quốc gia hoặc thành phố"
						defaultValue="Vietnam"
					/>
					<div className={cx("TextFieldStyled__StartIconContainer")}>
						<LocationIcon className={cx("IconStyle__VerticalCenteredSvg")} />
					</div>
					<div className={cx("TextFieldStyled__IconContainer")}>
						<CloseIcon className={cx("IconStyle__VerticalCenteredSvg")} />
					</div>
				</div>
			</div>
			<SolidBtnContainer className={cx("SearchButton")}>
				<SolidButton
					onClick={() => {
						handleEnter(searchInput);
					}}>
					TÌM KIẾM
				</SolidButton>
			</SolidBtnContainer>
		</div>
	);
}

export default SearchContainer;
