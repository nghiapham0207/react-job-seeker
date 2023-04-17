import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

import { privateRoutes, publicRoutes } from './routes/routes';
import DefaultLayout from './layouts/DefaultLayout';
import { selectUser } from './redux/selector';
import { ToastContainer } from 'react-toastify';
import Error from './components/Error/Error';
import './App.css'; // to prioritize classes passed into component

const ProtectedRoute = ({ user, redirectPath = '/' }) => {
	if (!user) {
		alert("Chưa đăng nhập!");
		return <Navigate to={redirectPath} replace />;
	}
	return <Outlet />;
};

function App() {
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
							// return (
							// 	<Route key={index} path={route.path}
							// 		element={<Layout><Page /></Layout>} />
							// )
						})}
					</Route>
					<Route path="test" element={<ProtectedRoute user={currentUser} />}>
						<Route index element={<p>setting</p>} />
						<Route path="cc" element={<p>test</p>} />
						<Route path="*" element={<Error />} />
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
