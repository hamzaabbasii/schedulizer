// import CustomerSatisfaction from "./CustomerSatisfaction";
// import DashboardAppointmentsToday from "./DashboardAppointmentsToday";
// import DashboardAppointmentTracker from "./DashboardAppointmentTracker";

import { useSelector } from "react-redux";
import Layout from "../Layout";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BusinessDashboard() {
	const state = useSelector((state) => state);
	console.log(state);

	const selectedBusiness = useSelector((state) => state.business.businessData);
	const imagePath = selectedBusiness?.profilePicture
		? selectedBusiness?.profilePicture.replace("public/", "/backend/public/")
		: "";

	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (!selectedBusiness) {
			setIsModalOpen(true);
			setTimeout(() => {
				navigate("/schedulizer/signin");
			}, 4000); // 4000 milliseconds = 4 seconds
		}
	}, [selectedBusiness, navigate]);

	const closeModalAndNavigate = () => {
		setIsModalOpen(false);
	};

	return (
		<Layout>
			<div className="pt-32 pb-12">
				<h1 className="flex justify-center font-bebas font-semibold text-8xl text-indigo-500 tracking-wide">
					BUSINESS DASHBOARD.
				</h1>
			</div>
			<div className="flex justify-center items-center space-x-6 py-12">
				<div className="flex justify-center items-center gap-5 space-x-12 border-2 border-indigo-200 bg-[#FAF8ED] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-8 rounded-2xl break-words group">
					<div className="flex flex-col justify-center items-center space-y-4">
						<img
							className="border-2 border-black rounded-full w-20 h-20"
							src={imagePath}
							alt="Profile"
						/>
						<div className="flex flex-col justify-center items-center">
							<div className="font-poppins font-semibold text-base text-black">
								{selectedBusiness?.name}
							</div>
							<div className="flex justify-between space-x-6">
								<div className="font-muktaVaani text-black text-xs">
									{selectedBusiness?.category}
								</div>
								<div className="font-muktaVaani text-black text-xs">
									{selectedBusiness?.city}
								</div>
								<div className="font-muktaVaani text-black text-xs">
									Rating: 4.5 / 5
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-center items-center w-96 font-muktaVaani font-normal text-black text-center text-sm">
						{selectedBusiness?.bio}
					</div>
				</div>
			</div>
			<Transition appear show={isModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="z-10 fixed inset-0 bg-indigo-600 overflow-y-auto pattern-texture-[#FAF8ED]/60 pattern-texture-scale-[1.5]"
					onClose={closeModalAndNavigate}
				>
					<div className="min-h-screen text-center">
						<Dialog.Overlay className="fixed" />
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Dialog.Description
							as="div"
							className="inline-block bg-[#FAF8ED] my-8 p-12 rounded-2xl w-full max-w-md text-center transform transition-all overflow-hidden align-middle"
						>
							<Dialog.Title
								as="h1"
								className="font-bebas font-semibold text-5xl text-indigo-500 leading-2"
							>
								Dashboard Access Denied.
							</Dialog.Title>
							<div className="mt-2">
								<p className="font-poppins text-black text-sm">
									You&rsquo;re not signed in as a business owner. Please sign in
									as a business owner to access the dashboard.
								</p>
							</div>
						</Dialog.Description>
					</div>
				</Dialog>
			</Transition>
		</Layout>
	);
}

export default BusinessDashboard;
