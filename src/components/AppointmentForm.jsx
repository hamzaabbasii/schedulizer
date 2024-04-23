// import { Datepicker } from "flowbite-react";

import Layout from "./Layout";
import InputField from "./form/InputField";
import { useEffect, useRef, useState, Fragment } from "react";
import TimeSlotSelectorButton from "./Form/TimeSlotSelectorButton";
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
	const user = useSelector((state) => state.user);
	const userId = user?.id;

	const { serviceId, businessId } = useParams();

	const isUserSignedIn = useSelector((state) => state.user.isUserSignedIn);
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (!isUserSignedIn) {
			setIsModalOpen(true);
			setTimeout(() => {
				navigate("/schedulizer/signin");
			}, 4000); // 4000 milliseconds = 4 seconds
		}
	}, [isUserSignedIn, navigate]);

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
	const textAreaElementRef = useRef(null);
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [nameForAppointment, setNameForAppointment] = useState("");
	const [appointmentDate, setAppointmentDate] = useState(null);
	const [appointmentMessage, setAppointmentMessage] = useState("");
	const [appointmentTime, setAppointmentTime] = useState("");

	useEffect(() => {
		typedCharactersElementRef.current =
			document.querySelector("#typed-characters");

		const updateCharacterCount = () => {
			if (textAreaElementRef.current) {
				setTypedCharacters(textAreaElementRef.current.value.length);
			}
		};

		if (textAreaElementRef.current) {
			textAreaElementRef.current.addEventListener(
				"input",
				updateCharacterCount
			);
		}

		return () => {
			if (textAreaElementRef.current) {
				textAreaElementRef.current.removeEventListener(
					"input",
					updateCharacterCount
				);
			}
		};
	}, []);

	useEffect(() => {
		if (typedCharactersElementRef.current) {
			typedCharactersElementRef.current.textContent = typedCharacters;
		}
	}, [typedCharacters]);

	const handleButtonClick = (id, slot) => {
		setAppointmentTime(slot);
	};

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

	console.log("appointmentTime", appointmentTime);

	const validateField = (
		value,
		validateFunc,
		errorMessage,
		fieldName,
		labelName
	) => {
		if (!value.trim()) {
			setError((prevErrors) => ({
				...prevErrors,
				[fieldName]: `${labelName} cannot be empty. Please fill this out.`,
			}));
		} else if (!validateFunc(value)) {
			setError((prevErrors) => ({
				...prevErrors,
				[fieldName]: errorMessage,
			}));
		} else {
			setError((prevErrors) => {
				//eslint-disable-next-line no-unused-vars
				const { [fieldName]: _, ...rest } = prevErrors;
				return rest;
			});
		}
	};

	const isAlphabetic = (value) => /^[A-Za-z\s&]+$/.test(value);
	const isNotEmpty = (value) => value.trim() !== "";
	const isServiceDescription = (value) => /^.{300,}$/.test(value);

	const handleSubmit = async (event) => {
		setIsLoading(true);
		event.preventDefault();

		const appointmentData = {
			nameForAppointment,
			appointmentDate,
			appointmentMessage,
			appointmentTime,
			serviceId,
			userId,
		};

		try {
			const response = await axios.post("/appointment/signup", appointmentData);
			console.log(response.data);

			// Check if the form submission was successful
			if (response.data.success) {
				setIsLoading(false);
				setIsModalOpen(true);
				// Delay navigation by 4 seconds
				setTimeout(() => {
					navigate("/schedulizer/services");
				}, 4000);
			} else {
				setIsLoading(false);
			}
		} catch (error) {
			console.log("error data", error.response?.data);
			console.log("Form data", appointmentData);
			setIsLoading(false);
		}
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

	return (
		<Layout>
			<Transition appear show={isModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="pattern-topography-[#FAF8ED]/40 pattern-topography-scale-[0.5] z-10 fixed inset-0 bg-indigo-600 overflow-y-auto"
					onClose={closeModalAndNavigate}
				>
					<div className="w-full min-h-screen text-center">
						<Dialog.Overlay className="fixed" />
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Dialog.Description
							as="div"
							className="inline-block space-y-6 bg-[#FAF8ED] my-8 p-12 rounded-2xl w-full max-w-lg text-center transform transition-all overflow-hidden align-middle"
						>
							<Dialog.Title
								as="h1"
								className="font-bebas font-semibold text-5xl text-indigo-500 leading-2"
							>
								Access Denied. <br /> Sign In Required!
							</Dialog.Title>
							<div className="mt-2">
								<p className="font-poppins text-black text-sm">
									You&rsquo;re not signed in. Please sign in to book an
									appointment.
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

				<div className="flex flex-col justify-center items-center space-y-5 border-2 border-indigo-500 bg-[#FAF8ED] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-6 rounded-2xl w-full md:max-w-sm h-fit break-words duration-500 ease-in-out group hover:scale-[1.02]">
					<div className="flex flex-col justify-center items-center gap-7">
						<div className="flex flex-col space-y-4">
							<div className="flex flex-col justify-center text-center">
								<div className="font-poppins font-semibold text-base text-black">
									{service?.title}
								</div>
								<div className="font-extralight font-muktaVaani text-black text-sm">
									by <span className="font-light">{business?.name}</span>
								</div>
							</div>

							<div className="flex flex-col justify-center items-center space-x-4 font-muktaVaani text-black text-xs service?Details">
								<div className="flex justify-start space-x-6">
									<div>
										Duration:
										<span className="font-semibold">
											{service?.duration[0]}
										</span>
									</div>
									<div>
										Price:{" "}
										<span className="font-semibold">Rs.{service?.price}</span>
									</div>
								</div>
								<div className="flex justify-start space-x-6">
									<div>
										Timings: <span className="font-semibold">{timing}</span>
									</div>
									<div>
										Days: <span className="font-semibold">{service?.days}</span>
									</div>
								</div>
							</div>
						</div>

						<div className="flex flex-wrap py-2 font-muktaVaani font-normal text-black text-center text-sm break-words description">
							{service?.description.substring(0, 250)}
						</div>
					</div>
				</div>

				<div className="flex justify-center items-center py-6">
					<form
						onSubmit={handleSubmit}
						className="flex justify-center items-center space-x-16 px-24"
					>
						<div className="flex flex-wrap justify-center gap-4 w-3/5">
							{calculateSlots(service).map((slot, slotIndex) => (
								<div key={slotIndex} className="relative">
									<TimeSlotSelectorButton
										isSelected={appointmentTime === slot}
										onClick={() =>
											handleButtonClick(`selection${slotIndex}`, slot)
										}
										clearSelection={() => handleButtonClick(null)}
										buttonName={slot}
									/>
								</div>
							))}
						</div>

						<div className="flex flex-col space-y-6 w-2/5 justufy-center">
							<div>
								<div className="flex justify-evenly gap-4">
									<InputField
										inputFieldId="nameForAppointment"
										inputFieldType="text"
										inputFieldPlaceholder="enter you name e.g. John"
										inputFieldHtmlFor="nameForAppointment"
										inputFieldLabelName="Name"
										isRequired={true}
										fieldType="input"
										value={nameForAppointment}
										onChange={(e) => setNameForAppointment(e.target.value)}
										validateOnBlur={true}
										validate={(value) =>
											validateField(
												value,
												isAlphabetic,
												"First name should only contain alphabets",
												"nameForAppointment",
												"First Name" // pass the label name here
											)
										}
										inputFieldError={error.userFirstName}
									/>

									<InputField
										inputFieldId="appointmentDate"
										inputFieldType="date"
										inputFieldPlaceholder="enter your date here"
										inputFieldHtmlFor="appointmentDate"
										inputFieldLabelName="Appointment Date"
										isRequired={true}
										fieldType="input"
										value={appointmentDate}
										onChange={(e) => setAppointmentDate(e.target.value)}
										validateOnBlur={true}
										validate={(value) =>
											validateField(
												value,
												isNotEmpty,
												"Appointment date is required",
												"appointmentDate",
												"Appointment Date"
											)
										}
										inputFieldError={error.appointmentDate}
									/>
								</div>

								<div className="flex flex-col">
									<InputField
										inputFieldId="appointmentMessage"
										inputFieldType="text"
										inputFieldPlaceholder="enter a message for appointment"
										inputFieldHtmlFor="appointmentMessage"
										inputFieldLabelName="Description"
										isRequired={false}
										fieldType="textarea"
										cols={10}
										rows={5}
										maxLength={500}
										value={appointmentMessage}
										onChange={(e) => setAppointmentMessage(e.target.value)}
										validateOnBlur={true}
										validate={(value) =>
											validateField(
												value,
												isServiceDescription,
												"Service description should be atleast 100 characters.",
												"appointmentMessage",
												"Service Description"
											)
										}
										inputFieldError={error.appointmentMessage}
									/>

									<div
										id="character-counter"
										className="text-right opacity-80 text-indigo-500 text-sm"
									>
										<span id="typed-characters">0</span>
										<span>/</span>
										<span id="maximum-characters">500</span>
									</div>
								</div>
							</div>

							<div className="px-12">
								<Button
									buttonName="BOOK NOW"
									disabled={isLoading}
									buttonType="submit"
								/>
							</div>
						</div>
					</form>
				</div>
			</div>

			<Transition appear show={isModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="pattern-topography-[#FAF8ED]/40 pattern-topography-scale-[0.5] z-10 fixed inset-0 bg-indigo-600 overflow-y-auto"
					onClose={closeModalAndNavigate}
				>
					<div className="w-full min-h-screen text-center">
						<Dialog.Overlay className="fixed" />
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Dialog.Description
							as="div"
							className="inline-block space-y-6 bg-[#FAF8ED] my-8 p-12 rounded-2xl w-full max-w-lg text-center transform transition-all overflow-hidden align-middle"
						>
							<Dialog.Title
								as="h1"
								className="font-bebas font-semibold text-5xl text-indigo-500 leading-2"
							>
								Access Denied. <br /> Sign In Required!
							</Dialog.Title>
							<div className="mt-2">
								<p className="font-poppins text-black text-sm">
									You&rsquo;re not signed in. Please sign in to book an
									appointment.
								</p>
							</div>
						</Dialog.Description>
					</div>
				</Dialog>
			</Transition>
		</Layout>
	);
}

export default AppointmentForm;
