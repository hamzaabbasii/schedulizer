import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/Signup.jsx";
import BusinessRegistrationForm from "./components/BusinessRegistrationForm.jsx";
import BusinessDashboard from "./components/businessDashboard/BusinessDashboard.jsx";
import BusinessInfo from "./components/BusinessInfo.jsx";
import Services from "./components/Services.jsx";
import Businesses from "./components/Businesses.jsx";
import Home from "./components/Home.jsx";
import ProfilePicBio from "./components/ProfilePicBio.jsx";
import Tests from "./components/Tests.jsx";
import store from "./redux/store/store.js";
import AppointmentForm from "./components/AppointmentForm.jsx";
import BusinessServices from "./components/businessDashboard/BusinessServices.jsx";
import BusinessAppointments from "./components/businessDashboard/BusinessAppointments.jsx";
import BusinessAnalytics from "./components/businessDashboard/BusinessAnalytics.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/schedulizer/" element={<Home />} />
					<Route
						path="/schedulizer/businessDashboard/:businessId"
						element={<BusinessDashboard />}
					/>
					<Route path="/schedulizer/businesses" element={<Businesses />} />
					<Route path="/schedulizer/services" element={<Services />} />
					<Route path="/schedulizer/signin" element={<SignIn />} />
					<Route path="/schedulizer/signup" element={<SignUp />} />
					<Route
						path="/schedulizer/profilepicbio/:businessId"
						element={<ProfilePicBio />}
					/>
					<Route path="/schedulizer/tests" element={<Tests />} />
					<Route
						path="/schedulizer/businessregistration"
						element={<BusinessRegistrationForm />}
					/>
					<Route
						path="/schedulizer/businessinfo/:businessId"
						element={<BusinessInfo />}
					/>
					<Route
						path="/schedulizer/appointmentform/:businessId/:serviceId"
						element={<AppointmentForm />}
					/>
					<Route
						path="/schedulizer/businessDashboard/:businessId/services"
						element={<BusinessServices />}
					/>
					<Route
						path="/schedulizer/businessDashboard/:businessId/appointments"
						element={<BusinessAppointments />}
					/>
					<Route
						path="/schedulizer/businessDashboard/:businessId/analytics"
						element={<BusinessAnalytics />}
					/>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
