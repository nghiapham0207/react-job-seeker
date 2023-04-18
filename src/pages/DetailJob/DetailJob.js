import { Link, useParams } from "react-router-dom";
import { useEffect, useState, createContext } from "react";

import { createAxiosJwt, get } from "../../utils/axiosAPI";
import GlintContainer from "../../components/GlintContainer";
import OpportunitySticky from "../../components/OpportunitySticky";
import Opportunity from "../../components/Opportunity";
import {
  BreadCrumbContainer,
  BreadCrumbInner,
  BreadCrumbItemWrapper
} from "../../components/BreadCrumb";
import { useDocumentTitle } from "../../hooks";
import PsychFlatModal from "../../components/PsychFlatModal";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selector";
import instance from "../../utils/axiosAPI";
import config from "../../config";
import Error from "../../components/Error";
import { dateToString } from "../../utils/helpers";
import InfiniteScrollContainer from "../../components/InfiniteScroll/InfiniteScrollContainer";
import { useUserActions } from "../../contexts/userActionsContext";

export const JobContext = createContext();

function DetailJob() {
  // console.log("Render DetailJob");
  useDocumentTitle("Chi Tiết Công Việc");
  const UserActionsContext = useUserActions();
  const { handleShowLogin } = UserActionsContext;
  const [showPsychFlat, setShowPsychFlat] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
  }
  useEffect(() => {
    const fetchApi = async () => {
      setIsLoading(true);
      const axiosInstance = currentUser ?
        createAxiosJwt(accessToken, refreshToken, dispatch) : instance;
      try {
        const res = await get(`job/detail?id=${_id}`, {
          headers: {
            Authorization: currentUser ? `Bearer ${accessToken}` : null
          }
        }, axiosInstance);
        console.log(res);
        setJob(res.data);
      } catch (error) {
        console.log(error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchApi();
  }, []);
  // check if job not found caused by change url
  return (
    notFound ? <Error /> :
      <>
        {
          isLoading ?
            <div>
              <InfiniteScrollContainer width="3rem" height="3rem">
                Đang tải
              </InfiniteScrollContainer>
            </div> :
            <JobContext.Provider value={job}>
              {/* breadcrumpm has not completed yet */}
              <BreadCrumbContainer>
                <BreadCrumbInner>
                  <BreadCrumbItemWrapper active
                    url={config.routes.job} title={"Việc Làm"} />
                  <BreadCrumbItemWrapper
                    url={`${config.routes.job}/${job._id}`} title={job.name} />
                </BreadCrumbInner>
              </BreadCrumbContainer>
              <GlintContainer>
                <Opportunity openModal={handleShowPsychFlat} />
              </GlintContainer>
              <OpportunitySticky openModal={handleShowPsychFlat} />
              {/* modal here */}
              {showPsychFlat && <PsychFlatModal handleShowPsychFlat={handleShowPsychFlat} />}
            </JobContext.Provider>
        }
      </>
  )
}

export default DetailJob;
