import { Suspense, lazy } from "react";

import config from "../config";
import HeaderOnly from "../layouts/HeaderOnly";
import SidebarSetting from "../layouts/SidebarSetting";
import ExploreTabLayout from "../layouts/ExploreTabLayout";

const Home = lazy(() => import("../pages/Home"));
const ChangePasswordPage = lazy(() => import("../pages/ChangePasswordPage"));
const JobPage = lazy(() => import("../pages/JobPage"));
const Company = lazy(() => import("../pages/Company"));
const DetailJob = lazy(() => import("../pages/DetailJob"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const SignUp = lazy(() => import("../pages/SignUp"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../pages/ResetPasswordPage"));
const SettingPage = lazy(() => import("../pages/SettingPage"));
const EditProfilePage = lazy(() => import("../pages/EditProfilePage"));
const DetailCompany = lazy(() => import("../pages/DetailCompany"));
const BookmarkedPage = lazy(() => import("../pages/BookmarkedPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const ApplicationsPage = lazy(() => import("../pages/ApplicationsPage"));

const settingRoutes = [
	{
		key: "change-password",
		path: "change-password",
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<ChangePasswordPage />
			</Suspense>
		),
	},
	{
		key: "edit",
		path: "edit",
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<EditProfilePage />
			</Suspense>
		),
	},
];

const exploreRoutes = [
	{
		key: "explore",
		path: "explore",
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<JobPage />
			</Suspense>
		),
	},
	{
		key: "bookmarked",
		path: "bookmarked",
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<BookmarkedPage />
			</Suspense>
		),
	},
];

export const publicRoutes = [
	{
		key: "0",
		path: config.routes.login,
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<LoginPage />
			</Suspense>
		),
		layout: HeaderOnly,
	},
	{
		key: "1",
		path: config.routes.home,
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<Home />
			</Suspense>
		),
	},
	{
		key: "2",
		path: config.routes.company,
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<Company />
			</Suspense>
		),
	},
	{
		path: config.routes.detailCompany,
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<DetailCompany />
			</Suspense>
		),
	},
	{
		key: "4",
		path: config.routes.error,
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<ErrorPage />
			</Suspense>
		),
	},
	{
		key: "5",
		path: config.routes.job,
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<JobPage />
			</Suspense>
		),
	},
	{
		key: "6",
		path: config.routes.detailJob,
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<DetailJob />
			</Suspense>
		),
	},
	{
		key: "7",
		path: config.routes.signUp,
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<SignUp />
			</Suspense>
		),
		layout: HeaderOnly,
	},
	{
		key: "8",
		path: config.routes.forgotPassword,
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<ForgotPasswordPage />
			</Suspense>
		),
		layout: HeaderOnly,
	},
	{
		key: "9",
		path: config.routes.resetPassword,
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<ResetPasswordPage />
			</Suspense>
		),
		layout: HeaderOnly,
	},
];

// must login
export const privateRoutes = [
	{
		key: "",
		path: config.routes.myApplications,
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<ApplicationsPage />
			</Suspense>
		),
	},
	{
		key: "",
		path: config.routes.setting,
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<SettingPage />
			</Suspense>
		),
		layout: SidebarSetting,
		children: settingRoutes,
	},
	{
		key: "",
		path: config.routes.opportunities,
		component: () => (
			<Suspense
			// fallback={<InfiniteScrollContainer />}
			>
				<JobPage />
			</Suspense>
		),
		layout: ExploreTabLayout,
		children: exploreRoutes,
	},
];
