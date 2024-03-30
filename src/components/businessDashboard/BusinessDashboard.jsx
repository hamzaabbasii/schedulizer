// import CustomerSatisfaction from "./CustomerSatisfaction";
// import DashboardAppointmentsToday from "./DashboardAppointmentsToday";
// import DashboardAppointmentTracker from "./DashboardAppointmentTracker";

import { useSelector } from "react-redux";
import BacktoTopButton from "../BacktoTopButton";
import ServicesCRUD from "./ServicesCRUD";
import Layout from "../Layout";
import ServiceAddForm from "./ServiceAddForm";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BusinessDashboard() {
	const state = useSelector((state) => state);
	console.log(state);

	const selectedBusiness = useSelector((state) => state.business.businessData);
	const businessName = selectedBusiness?.name;
	// const businessId = selectedBusiness?._id;
	// const businessEmail = selectedBusiness?.businessEmail;

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
			<div className="md:px-24 xl:lg:px-20 py-20">
				<h2 className="flex justify-center items-baseline mb-20 md:px-24 xl:lg:px-52 font-medium font-poppins text-4xl text-indigo-500">
					Good day,
					<p className="font-bebas font-semibold text-6xl">
						&ensp; {businessName}
					</p>
				</h2>
				{/* <div className="flex xl:lg:flex-row sm:flex-col md:flex-col xs:flex-col justify-center items-top md:space-x-12 xl:lg:space-x-24 sm:space-y-12 md:space-y-16 xl:lg:space-y-0 xs:space-y-12 pt-6 pb-12">
					<CustomerSatisfaction />
					<div className="flex xl:lg:flex-row sm:flex-col md:flex-col xs:flex-col justify-evenly items-top md:space-x-12 xl:lg:space-x-20 sm:space-y-12 md:space-y-16 xl:lg:space-y-0 xs:space-y-12">
						<DashboardAppointmentTracker />
						<DashboardAppointmentsToday />
					</div>
				</div>
				<div className="flex xl:lg:flex-row sm:flex-col md:flex-col xs:flex-col justify-between items-center sm:gap-y-12 md:gap-y-16 xs:gap-y-12 md:space-x-12 xl:lg:space-x-6 md:px-12 xl:lg:px-48">
					<div className="bg-[#FAF8ED] shadow-indigo-800 shadow-sm px-12 py-6 rounded-xl">
						<div className="mb-2 text-grey-darker">
							<span className="align-top text-3xl">RS</span>
							<span className="text-5xl">21,404</span>
						</div>
						<div className="text-grey text-sm uppercase tracking-wide">
							Revenue This Month
						</div>
					</div>
					<div className="bg-[#FAF8ED] shadow-indigo-800 shadow-sm px-12 py-6 rounded-xl">
						<div className="mb-2 text-grey-darker">
							<span className="align-top text-3xl">RS</span>
							<span className="text-5xl">21,404</span>
						</div>
						<div className="text-grey text-sm uppercase tracking-wide">
							Revenue This Month
						</div>
					</div>
					<div className="bg-[#FAF8ED] shadow-indigo-800 shadow-sm px-12 py-6 rounded-xl">
						<div className="mb-2 text-grey-darker">
							<span className="align-top text-3xl">RS</span>
							<span className="text-5xl">21,404</span>
						</div>
						<div className="text-grey text-sm uppercase tracking-wide">
							Revenue This Month
						</div>
					</div>
				</div> */}
				<ServiceAddForm />
				<ServicesCRUD />
				<BacktoTopButton />
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
								Dashboard Access Denied
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
