// import { Datepicker } from "flowbite-react";

import Layout from "./Layout";
import InputField from "./form/InputField";
import { useEffect, useRef, useState, Fragment } from "react";
import TimeSlotSelectorButton from "./TimeSlotSelectorButton";
import Button from "./Button";
import moment from "moment";
import { useParams } from "react-router-dom";
import axios from "axios";
// import Datepicker from "react-tailwindcss-datepicker";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AppointmentForm() {
	const [service, setService] = useState();
	const [business, setBusiness] = useState();
	const { serviceId, businessId } = useParams();

	const selectedUser = useSelector((state) => state.user.userData);

	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (!selectedUser) {
			setIsModalOpen(true);
			setTimeout(() => {
				navigate("/schedulizer/signin");
			}, 4000); // 4000 milliseconds = 4 seconds
		}
	}, [selectedUser, navigate]);

	const closeModalAndNavigate = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		const fetchService = async () => {
			try {
				const response = await axios.get(`/services/${serviceId}`);
				setService(response.data.data);
				console.log("service data:", response.data.data);
			} catch (error) {
				console.error("Fetch error oioiservice: ", error);
			}
		};

		fetchService();
		const fetchBusiness = async () => {
			try {
				const response = await axios.get(`/business/${businessId}`);
				setBusiness(response.data);
				console.log("business data:", response.data);
			} catch (error) {
				console.error("Fetch error: ", error);
			}
		};

		fetchBusiness();
	}, [serviceId, businessId]);

	const [typedCharacters, setTypedCharacters] = useState(0);
	const typedCharactersElementRef = useRef(null);

	useEffect(() => {
		const textAreaElement = document.querySelector("#appointmentMessage");
		typedCharactersElementRef.current =
			document.querySelector("#typed-characters");

		const updateCharacterCount = () => {
			setTypedCharacters(textAreaElement.value.length);
		};

		textAreaElement.addEventListener("input", updateCharacterCount);

		return () => {
			textAreaElement.removeEventListener("input", updateCharacterCount);
		};
	}, []);

	useEffect(() => {
		if (typedCharactersElementRef.current) {
			typedCharactersElementRef.current.textContent = typedCharacters;
		}
	}, [typedCharacters]);

	const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

	const handleButtonClick = (selectionId, slot) => {
		setSelectedTimeSlot(slot);
	};
	console.log("selectedTimeSlot:", selectedTimeSlot);

	const calculateSlots = (service) => {
		const start = moment(service?.startTime, "h:mm A");
		const end = moment(service?.endTime, "h:mm A");
		const breakStart = moment(service?.breakStartTime, "h:mm A");
		const breakEnd = moment(service?.breakEndTime, "h:mm A");

		let slots = [];
		let current = start;

		while (current < end) {
			if (!(current >= breakStart && current < breakEnd)) {
				let slotEnd = moment(current).add(service?.duration[1], "hours");
				slots.push(
					current.format("h:mm A") + " to " + slotEnd.format("h:mm A")
				);
			}
			current.add(service?.duration[1], "hours");
		}

		return slots;
	};

	// const [value, setValue] = useState({
	// 	startDate: new Date(),
	// 	endDate: new Date().setMonth(11),
	// });

	// const handleValueChange = (newValue) => {
	// 	console.log("newValue:", newValue);
	// 	setValue(newValue);
	// };

	const timing = `${service?.startTime} to ${service?.endTime}`;

	if (!selectedUser) {
		return null;
	}

	return (
		<Layout>
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
			<div className="flex flex-col justify-center items-center py-12 h-auto">
				<h1 className="flex justify-center py-16 font-bebas font-semibold text-8xl text-indigo-500 tracking-wide">
					BOOK YOUR APPOINTMENT.
				</h1>
				<div className="inline-flex flex-col justify-center items-center gap-5 border-2 border-indigo-200 bg-[#FAF8ED] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-6 rounded-2xl md:max-w-sm break-words group hover:scale-[1.02] duration-500 ease-in-out">
					<div className="flex flex-col space-y-4">
						<div className="flex flex-col justify-center text-center">
							<div className="font-poppins font-semibold text-base text-black">
								{service?.title}
							</div>
							<div className="font-light font-muktaVaani text-black text-sm">
								by <strong>{business?.name}</strong>
							</div>
						</div>

						<div className="flex flex-col flex-wrap justify-center items-center serviceDetails">
							<div className="flex space-x-4">
								<div className="font-light font-muktaVaani text-black text-xs">
									Duration: <strong>{service?.duration[0]}</strong>
								</div>
								<div className="font-light font-muktaVaani text-black text-xs">
									Price: Rs. <strong>{service?.price}</strong>
								</div>
							</div>
							<div className="flex space-x-4">
								<div className="font-light font-muktaVaani text-black text-xs">
									Timings: <strong>{timing}</strong>
								</div>
								<div className="font-light font-muktaVaani text-black text-xs">
									Days: <strong>{service?.days}</strong>
								</div>
							</div>
						</div>
					</div>
					<div className="font-muktaVaani font-normal text-black text-center text-sm break-words serviceDescription">
						{service?.description}
					</div>
				</div>
				<div className="flex justify-center items-center px-32 pt-12 w-full">
					<form
						action=""
						className="flex flex-col justify-center items-center space-x-24 w-full"
					>
						<div className="flex flex-col space-y-8">
							<div className="flex justify-center items-center space-x-12">
								<div className="flex flex-col justify-center w-2/5">
									<div className="flex flex-col space-y-4">
										<div>
											<div className="flex justify-between gap-4">
												<div className="flex-grow w-3/5">
													<InputField
														inputFieldName="nameForAppointment"
														inputFieldLabelName="Name"
														inputFieldId="nameForAppointment"
														inputFieldType="text"
														inputFieldPlaceholder="enter your name"
														inputFieldHtmlFor="nameForAppointment"
														isRequired={true}
													/>
												</div>
												<div className="flex-grow w-2/5">
													<InputField
														inputFieldType="date"
														inputFieldName="appointmentDate"
														inputFieldLabelName="Appointment Date"
														inputFieldId="appointmentDate"
														inputFieldHtmlFor="nameForAppointment"
														isRequired={true}
													/>
												</div>
											</div>

											<InputField
												inputFieldId="appointmentMessage"
												inputFieldType="text"
												inputFieldPlaceholder="enter your message here"
												inputFieldHtmlFor="appointmentMessage"
												inputFieldLabelName="Message"
												fieldType="textarea"
												cols={10}
												rows={5}
												maxLength={500}
											/>
											<div
												id="character-counter"
												className="text-right opacity-80 text-indigo-500 text-sm"
											>
												<span id="typed-characters">0</span>
												<span>/</span>
												<span id="maximum-characters">300</span>
											</div>
										</div>
										<div className="px-12">
											<Button buttonName="BOOK NOW" />
										</div>
									</div>
								</div>
								<div className="flex flex-col space-y-8 w-3/5 max-h-screen overflow-y-auto">
									<div className="flex flex-wrap justify-center gap-4">
										{calculateSlots(service).map((slot, slotIndex) => (
											<div key={slotIndex} className="relative">
												<TimeSlotSelectorButton
													isSelected={selectedTimeSlot === slot}
													onClick={() =>
														handleButtonClick(`selection${slotIndex}`, slot)
													}
													clearSelection={() => handleButtonClick(null)}
													buttonName={slot}
												/>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
}

export default AppointmentForm;
