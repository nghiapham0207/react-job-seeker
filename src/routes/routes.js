import config from "../config";

import Home from "../pages/Home";
import JobPage from "../pages/JobPage";
import Company from "../pages/Company";
// import BlogPage from "../pages/BlogPage";
import DetailJob from "../pages/DetailJob";
import ErrorPage from "../pages/ErrorPage";
import SignUp from "../pages/SignUp";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage";
import SettingPage from "../pages/SettingPage/SettingPage";

import HeaderOnly from "../layouts/HeaderOnly";
import SidebarSetting from "../layouts/SidebarSetting/SidebarSetting";
import ChangePasswordPage from "../pages/ChangePasswordPage/ChangePasswordPage";
import EditProfilePage from "../pages/EditProfilePage/EditProfilePage";
import DetailCompany from "../pages/DetailCompany/DetailCompany";
import ExploreTabLayout from "../layouts/ExploreTabLayout/ExploreTabLayout";
import BookmarkedPage from "../pages/BookmarkedPage/BookmarkedPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ApplicationsPage from "../pages/ApplicationsPage";

const settingRoutes = [
	{
		key: "change-password",
		path: "change-password",
		component: ChangePasswordPage,
	},
	{ key: "edit", path: "edit", component: EditProfilePage },
];

const exploreRoutes = [
	{ key: "explore", path: "explore", component: JobPage },
	{ key: "bookmarked", path: "bookmarked", component: BookmarkedPage },
];

export const publicRoutes = [
	{
		key: "0",
		path: config.routes.login,
		component: LoginPage,
		layout: HeaderOnly,
	},
	{ key: "1", path: config.routes.home, component: Home },
	{ key: "2", path: config.routes.company, component: Company },
	{ path: config.routes.detailCompany, component: DetailCompany },
	// { key: "3", path: config.routes.blog, component: BlogPage },
	{ key: "4", path: config.routes.error, component: ErrorPage },
	{ key: "5", path: config.routes.job, component: JobPage },
	{ key: "6", path: config.routes.detailJob, component: DetailJob },
	{
		key: "7",
		path: config.routes.signUp,
		component: SignUp,
		layout: HeaderOnly,
	},
	{
		key: "8",
		path: config.routes.forgotPassword,
		component: ForgotPasswordPage,
		layout: HeaderOnly,
	},
	{
		key: "9",
		path: config.routes.resetPassword,
		component: ResetPasswordPage,
		layout: HeaderOnly,
	},
];

// must login
export const privateRoutes = [
	{ key: "", path: "test", component: () => <p>test privateRoutes</p> },
	{ key: "", path: config.routes.myApplications, component: ApplicationsPage },
	{
		key: "",
		path: config.routes.setting,
		component: SettingPage,
		layout: SidebarSetting,
		children: settingRoutes,
	},
	{
		key: "",
		path: config.routes.opportunities,
		component: JobPage,
		layout: ExploreTabLayout,
		children: exploreRoutes,
	},
];
