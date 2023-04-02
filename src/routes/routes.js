import config from "../config";

import Home from "../pages/Home";
import JobPage from "../pages/JobPage";
import Company from "../pages/Company";
import BlogPage from "../pages/BlogPage";
import DetailJob from "../pages/DetailJob";
import ErrorPage from "../pages/ErrorPage";
import SignUp from "../pages/SignUp";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage";
import SettingPage from "../pages/SettingPage/SettingPage";

import HeaderOnly from "../layouts/HeaderOnly";
import SidebarSetting from "../layouts/SidebarSetting/SidebarSetting";

const settingRoutes = [
    { key: "change-password", path: "change-password", component: <p>test change password</p> },
    { key: "edit", path: "edit", component: <p>test edit</p> },
]

export const publicRoutes = [
    { key: "1", path: config.routes.home, component: Home },
    { key: "2", path: config.routes.company, component: Company },
    { key: "3", path: config.routes.blog, component: BlogPage },
    { key: "4", path: config.routes.error, component: ErrorPage },
    { key: "5", path: config.routes.job, component: JobPage },
    { key: "6", path: config.routes.detailJob, component: DetailJob },
    { key: "7", path: config.routes.signUp, component: SignUp, layout: HeaderOnly },
    { key: "8", path: config.routes.forgotPassword, component: ForgotPasswordPage, layout: HeaderOnly },
    { key: "9", path: config.routes.resetPassword, component: ResetPasswordPage, layout: HeaderOnly },
];

// must login
export const privateRoutes = [
    { key: "", path: "test", component: () => (<p>test privateRoutes</p>) },
    {
        key: "", path: config.routes.setting,
        component: SettingPage,
        layout: SidebarSetting,
        children: settingRoutes
    },
];
