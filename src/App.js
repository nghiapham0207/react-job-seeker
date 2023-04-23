import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

import { privateRoutes, publicRoutes } from './routes/routes';
import DefaultLayout from './layouts/DefaultLayout';
import { selectUser } from './redux/selector';
import './App.css'; // to prioritize classes passed into component
import { memo } from 'react';

const ProtectedRoute = memo(({ user, redirectPath = '/' }) => {
	const currentPathName = window.location.pathname;
	if (!user) {
		return <Navigate to={`${redirectPath}?next=${encodeURIComponent(currentPathName)}`}
			replace
			state={{ showLogin: true }} />;
	}
	return <Outlet />;
});

function App() {
	// console.log("render App");
	const currentUser = useSelector(selectUser);
	return (
		<BrowserRouter>
			<div className="App">
				<ToastContainer />
				<Routes>
					{/* public routes */}
					{publicRoutes.map((route, index) => {
						const Layout = route.layout ?? DefaultLayout; // null or undefined
						const Page = route?.component;
						return (
							<Route key={index} path={route.path}
								element={<Layout><Page /></Layout>} />
						)
					})}
					{/* private route */}
					<Route element={<ProtectedRoute user={currentUser} />} >
						{privateRoutes.map((route, index) => {
							const Layout = route.layout ?? DefaultLayout; // null or undefined
							const Page = route?.component;
							const children = route.children;
							if (children?.length) {
								return (
									<Route key={index} path={route.path} element={<Outlet />} >
										<Route index element={<Layout></Layout>} />
										{children.map((childRoute) => {
											const ChildPage = childRoute.component;
											return (
												<Route
													key={childRoute.key}
													path={childRoute.path}
													element={<Layout><ChildPage /></Layout>} />
											)
										})}
									</Route>
								)
							} else {
								return (
									<Route key={index} path={route.path}
										element={<Layout><Page /></Layout>} />
								)
							}
						})}
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

ProtectedRoute.propTypes = {
	user: PropTypes.object,
}

export default App;
