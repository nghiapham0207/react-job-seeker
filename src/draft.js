{
	/* public routes */
}
{
	/* {
			publicRoutes.map((route, index) => {
				const Layout = route.layout ?? DefaultLayout; // null or undefined
				const Page = route?.component;
				return (
					<Route key={index} path={route.path}
						element={<Layout><Page /></Layout>} />
				)
			})
		} */
}
{
	/* private route */
}
{
	/* <Route element={<ProtectedRoute />} >
			{
				privateRoutes.map((route, index) => {
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
				})
			}
		</Route> */
}

// const initJobList = [
//   {
//     "_id": "64168368eb7ad99a3466e6b9",
//     "deadline": "2024-12-30T17:00:00.000Z",
//     "status": true,
//     "name": "Lập trình viên back-end",
//     "description": "Tham gia thiết kế giao diện, ...",
//     "requirement": "C#, ASP.NET Core",
//     "hourWorking": "40hrs/week Monday to Friday",
//     "postingDate": "2023-02-05T17:00:00.000Z",
//     "salary": "20000000",
//     "locationWorking": "Hồ Chí Minh",
//     "idOccupation": {
//       "_id": "64100616fdd527b2f096944a",
//       "name": "IT",
//       "__v": 0,
//       "isDelete": false
//     },
//     "idCompany": {
//       "_id": "641003eafe045f194923dc8a",
//       "isDelete": false,
//       "name": "FPT Software",
//       "totalEmployee": 10000,
//       "type": "software, outsource",
//       "about": "top company about technology in Viet Nam",
//       "phone": "033947586",
//       "location": "Ho Chi Minh, Ha Noi",
//       "idUser": "6403449d78ddac861ce0b13d",
//       "__v": 0,
//       "createDate": "2023-04-17T19:38:37.669Z"
//     },
//     "__v": 0,
//     "updateDate": "2023-04-15T07:09:35.497Z"
//   },
//   {
//     "_id": "641683dfa8922acf0dfc7a8a",
//     "postingDate": "2023-03-19T00:00:00.000Z",
//     "deadline": "2024-12-30T17:00:00.000Z",
//     "status": true,
//     "name": "Lập trình viên front-end",
//     "description": "Tham gia thiết kế giao diện, ...",
//     "requirement": "HTML, CSS, JS, Angular",
//     "hourWorking": "40hrs/week Monday to Friday",
//     "salary": "15000000",
//     "locationWorking": "Hồ Chí Minh",
//     "idOccupation": {
//       "_id": "64100616fdd527b2f096944a",
//       "name": "IT",
//       "__v": 0,
//       "isDelete": false
//     },
//     "idCompany": {
//       "_id": "641003eafe045f194923dc8a",
//       "isDelete": false,
//       "name": "FPT Software",
//       "totalEmployee": 10000,
//       "type": "software, outsource",
//       "about": "top company about technology in Viet Nam",
//       "phone": "033947586",
//       "location": "Ho Chi Minh, Ha Noi",
//       "idUser": "6403449d78ddac861ce0b13d",
//       "__v": 0,
//       "createDate": "2023-04-17T19:38:37.669Z"
//     },
//     "__v": 0,
//     "updateDate": "2023-04-15T07:09:35.497Z"
//   },
//   {
//     "_id": "64168513a8922acf0dfc7a8e",
//     "postingDate": "2023-03-18T17:00:00.000Z",
//     "deadline": "2024-12-30T17:00:00.000Z",
//     "status": true,
//     "name": "Lập trình viên back-end Python",
//     "description": "Tham gia thiết kế giao diện, ...",
//     "requirement": "Django, Flask",
//     "hourWorking": "40hrs/week Monday to Friday",
//     "salary": "15000000",
//     "locationWorking": "Hồ Chí Minh",
//     "idOccupation": {
//       "_id": "64100616fdd527b2f096944a",
//       "name": "IT",
//       "__v": 0,
//       "isDelete": false
//     },
//     "idCompany": {
//       "_id": "641684bda8922acf0dfc7a8c",
//       "isDelete": false,
//       "name": "NCC",
//       "totalEmployee": 300,
//       "type": "software, outsource",
//       "about": "startup company",
//       "phone": "0653748823",
//       "location": "Ho Chi Minh",
//       "idUser": "63dfb79ce2b2004977bc1b07",
//       "__v": 0,
//       "createDate": "2023-04-17T19:38:37.669Z"
//     },
//     "__v": 0,
//     "updateDate": "2023-04-15T07:09:35.497Z"
//   },
//   {
//     "_id": "6427dd722c7b6260aa9860a9",
//     "postingDate": "2023-03-31T17:00:00.000Z",
//     "deadline": "2024-12-30T17:00:00.000Z",
//     "status": true,
//     "name": "Lập trình viên mobile Flutter",
//     "description": "Tham gia thiết kế giao diện, ...",
//     "requirement": "Flutter, Dart",
//     "hourWorking": "40hrs/week Monday to Friday",
//     "salary": "15000000",
//     "locationWorking": "Hà Nội",
//     "idOccupation": {
//       "_id": "64100616fdd527b2f096944a",
//       "name": "IT",
//       "__v": 0,
//       "isDelete": false
//     },
//     "idCompany": {
//       "_id": "641684bda8922acf0dfc7a8c",
//       "isDelete": false,
//       "name": "NCC",
//       "totalEmployee": 300,
//       "type": "software, outsource",
//       "about": "startup company",
//       "phone": "0653748823",
//       "location": "Ho Chi Minh",
//       "idUser": "63dfb79ce2b2004977bc1b07",
//       "__v": 0,
//       "createDate": "2023-04-17T19:38:37.669Z"
//     },
//     "__v": 0,
//     "updateDate": "2023-04-15T07:09:35.497Z"
//   },
// ]
