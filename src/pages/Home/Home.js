import { useLocation } from "react-router-dom";

import GlintContainer from "../../components/GlintContainer/GlintContainer";
import SearchSection from "../../components/SearchSection/SearchSection";
import ValueProposition from '../../components/GlintContainer/ValueProposition';
import StatisticDisplay from "../../components/GlintContainer/StatisticDisplay/";
import CareersGrid from "../../components/GlintContainer/CareersGrid/";
import PressFeatures from "../../components/GlintContainer/PressFeatures/PressFeatures";
import Testimonial from "../../components/GlintContainer/Testimonial/Testimonial";
import { useDocumentTitle } from "../../hooks";
import { useUserActions } from "../../contexts/userActionsContext";
import { useEffect } from "react";

function Home() {
    useDocumentTitle("Glints - Kênh Tuyển Dụng", true);
    const { state } = useLocation();
    // console.log(state);
    const UserActionsContext = useUserActions();
    const { handleShowLogin } = UserActionsContext;
    // if (state) {
    //     toast.info("Trang bạn đang truy cập yêu cầu đăng nhập!", {
    //         autoClose: 2000
    //     });
    // }
    useEffect(() => {
        if (state?.showLogin) {
            // console.log(idToast);
            handleShowLogin(true);
        }
        return () => {
            // toast.dismiss(idToast);
        }
        // eslint-disable-next-line
    }, []);
    return (
        <div className="Landing">
            <SearchSection />
            <GlintContainer>
                <StatisticDisplay />
                <CareersGrid />
                <ValueProposition />
                <PressFeatures />
                <Testimonial />
            </GlintContainer>
        </div>
    )
}

export default Home;
