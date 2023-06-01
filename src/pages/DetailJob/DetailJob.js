import { useParams } from "react-router-dom";
import { useEffect, useState, createContext } from "react";

import { createAxiosJwt, get } from "../../utils/axiosAPI";
import GlintContainer from "../../components/GlintContainer";
import OpportunitySticky from "../../components/OpportunitySticky";
import Opportunity from "../../components/Opportunity";
import { BreadCrumbContainer, BreadCrumbInner, BreadCrumbItemWrapper } from "../../components/BreadCrumb";
import { useDocumentTitle } from "../../hooks";
import PsychFlatModal from "../../components/PsychFlatModal";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selector";
import instance from "../../utils/axiosAPI";
import config from "../../config";
import Error from "../../components/Error";
import InfiniteScrollContainer from "../../components/InfiniteScroll/InfiniteScrollContainer";
import { useUserActions } from "../../contexts/userActionsContext";

export const JobContext = createContext();

function DetailJob() {
	useDocumentTitle("Chi Tiết Công Việc", true);
	const UserActionsContext = useUserActions();
	const { handleShowLogin } = UserActionsContext;
	const [showPsychFlat, setShowPsychFlat] = useState(false);
	const [notFound, setNotFound] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const currentUser = useSelector(selectUser);
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	const dispatch = useDispatch();
	const { _id } = useParams(); // id must match id in url
	const [job, setJob] = useState({});
	const handleShowPsychFlat = () => {
		// check user then login then redirect
		if (currentUser) {
			setShowPsychFlat(!showPsychFlat);
		} else {
			// alert("You must login");
			handleShowLogin();
		}
	};
	useEffect(() => {
		let active = true;
		const fetchApi = async () => {
			setIsLoading(true);
			const axiosInstance = currentUser ? createAxiosJwt(accessToken, refreshToken, dispatch) : instance;
			try {
				const res = await get(
					`job/detail?id=${_id}`,
					{
						headers: {
							Authorization: currentUser ? `Bearer ${accessToken}` : null,
						},
					},
					axiosInstance,
				);
				if (active) {
					setJob(res.data);
				}
			} catch (error) {
				console.log(error);
				setNotFound(true);
			} finally {
				setIsLoading(false);
			}
		};
		fetchApi();
		return () => (active = false);
	}, [_id, accessToken, refreshToken, dispatch, currentUser]);
	// check if job not found caused by change url
	if (notFound) {
		return <Error />;
	}
	return isLoading ? (
		<div>
			<InfiniteScrollContainer size="3rem">Đang tải</InfiniteScrollContainer>
		</div>
	) : (
		<JobContext.Provider value={job}>
			<BreadCrumbContainer>
				<BreadCrumbInner>
					<BreadCrumbItemWrapper active url={config.routes.job} title={"Việc Làm"} />
					<BreadCrumbItemWrapper url={`${config.routes.job}/${job._id}`} title={job.name} />
				</BreadCrumbInner>
			</BreadCrumbContainer>
			<GlintContainer>
				<Opportunity openModal={handleShowPsychFlat} />
			</GlintContainer>
			<OpportunitySticky openModal={handleShowPsychFlat} />
			{/* modal here */}
			{showPsychFlat && <PsychFlatModal handleShowPsychFlat={handleShowPsychFlat} />}
		</JobContext.Provider>
	);
}

export default DetailJob;
