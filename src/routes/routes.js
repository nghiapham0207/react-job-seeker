import { Outlet, Route } from "react-router-dom";

import config from "../config";
import DefaultLayout from "../layouts/DefaultLayout";
import HeaderOnly from "../layouts/HeaderOnly";
import { Fragment, Suspense, lazy } from "react";
import { ProtectedRoute } from "../App";
import SidebarSetting from "../layouts/SidebarSetting";
import ExploreTabLayout from "../layouts/ExploreTabLayout";

const Home = lazy(() => import("../pages/Home"));
const Company = lazy(() => import("../pages/Company"));
const DetailCompany = lazy(() => import("../pages/DetailCompany"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const JobPage = lazy(() => import("../pages/JobPage"));
const DetailJob = lazy(() => import("../pages/DetailJob"));
const SignUp = lazy(() => import("../pages/SignUp"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../pages/ResetPasswordPage"));
const ApplicationsPage = lazy(() => import("../pages/ApplicationsPage"));
const ChangePasswordPage = lazy(() => import("../pages/ChangePasswordPage"));
const EditProfilePage = lazy(() => import("../pages/EditProfilePage"));
const BookmarkedPage = lazy(() => import("../pages/BookmarkedPage"));

export default function getRoutes() {
	return (
		<Fragment>
			<Route
				path={config.routes.login}
				element={
					<HeaderOnly>
						<Suspense>
							<LoginPage />
						</Suspense>
					</HeaderOnly>
				}
			/>
			<Route
				index
				path={config.routes.home}
				element={
					<DefaultLayout>
						<Suspense>
							<Home />
						</Suspense>
					</DefaultLayout>
				}
			/>
			<Route
				path={config.routes.company}
				element={
					<DefaultLayout>
						<Suspense>
							<Company />
						</Suspense>
					</DefaultLayout>
				}
			/>
			<Route
				path={config.routes.detailCompany}
				element={
					<DefaultLayout>
						<Suspense>
							<DetailCompany />
						</Suspense>
					</DefaultLayout>
				}
			/>
			<Route
				path={config.routes.job}
				element={
					<DefaultLayout>
						<Suspense>
							<JobPage />
						</Suspense>
					</DefaultLayout>
				}
			/>
			<Route
				path={config.routes.detailJob}
				element={
					<DefaultLayout>
						<Suspense>
							<DetailJob />
						</Suspense>
					</DefaultLayout>
				}
			/>
			<Route
				path={config.routes.signUp}
				element={
					<HeaderOnly>
						<Suspense>
							<SignUp />
						</Suspense>
					</HeaderOnly>
				}
			/>
			<Route
				path={config.routes.forgotPassword}
				element={
					<HeaderOnly>
						<Suspense>
							<ForgotPasswordPage />
						</Suspense>
					</HeaderOnly>
				}
			/>
			<Route
				path={config.routes.resetPassword}
				element={
					<HeaderOnly>
						<Suspense>
							<ResetPasswordPage />
						</Suspense>
					</HeaderOnly>
				}
			/>
			<Route path="" element={<ProtectedRoute />}>
				<Route
					path={config.routes.myApplications}
					element={
						<DefaultLayout>
							<Suspense>
								<ApplicationsPage />
							</Suspense>
						</DefaultLayout>
					}
				/>
				<Route path={config.routes.setting} element={<Outlet />}>
					<Route index element={<SidebarSetting></SidebarSetting>} />
					<Route
						path="change-password"
						element={
							<SidebarSetting>
								<Suspense>
									<ChangePasswordPage />
								</Suspense>
							</SidebarSetting>
						}
					/>
					<Route
						path="edit"
						element={
							<SidebarSetting>
								<Suspense>
									<EditProfilePage />
								</Suspense>
							</SidebarSetting>
						}
					/>
				</Route>
				<Route path={config.routes.opportunities} element={<Outlet />}>
					<Route index element={<ExploreTabLayout></ExploreTabLayout>} />
					<Route
						path="explore"
						element={
							<ExploreTabLayout>
								<Suspense>
									<JobPage />
								</Suspense>
							</ExploreTabLayout>
						}
					/>
					<Route
						path="bookmarked"
						element={
							<ExploreTabLayout>
								<Suspense>
									<BookmarkedPage />
								</Suspense>
							</ExploreTabLayout>
						}
					/>
				</Route>
			</Route>
			<Route
				path={config.routes.error}
				element={
					<DefaultLayout>
						<Suspense>
							<ErrorPage />
						</Suspense>
					</DefaultLayout>
				}
			/>
		</Fragment>
	);
}
