import InputField from "../form/InputField";
import Button from "../Button";
import CheckboxList from "../form/CheckboxList";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Dropdown from "../form/Dropdown";
import { useSelector } from "react-redux";

function ServiceAddForm() {
	const [serviceTitle, setServiceTitle] = useState("");
	const [serviceDuration, setServiceDuration] = useState(["", 0]);
	const [servicePrice, setServicePrice] = useState("");
	const [serviceStartTime, setServiceStartTime] = useState("");
	const [serviceEndTime, setServiceEndTime] = useState("");
	const [serviceDescription, setServiceDescription] = useState("");
	const [selectedDays, setSelectedDays] = useState("");
	const [breakStartTime, setBreakStartTime] = useState("");
	const [breakEndTime, setBreakEndTime] = useState("");

	const selectedBusiness = useSelector((state) => state.business.businessData);
	const businessEmail = selectedBusiness?.workEmail;
	const businessId = selectedBusiness?._id;
	const [serverError, setApiError] = useState("");

	// console.log("selectedBusiness", businessEmail);

	// function convertTo24Hour(time) {
	// 	const [hour, minute] = time.split(":");
	// 	const period = time.includes("PM") ? "PM" : "AM";
	// 	return (
	// 		(period === "PM" ? (hour % 12) + 12 : hour) +
	// 		":" +
	// 		minute.replace(/\s[AP]M$/, "")
	// 	);
	// }

	function convertTo12Hour(time) {
		const [hour, minute] = time.split(":");
		return (hour % 12 || 12) + ":" + minute + " " + (hour >= 12 ? "PM" : "AM");
	}

	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [typedCharacters, setTypedCharacters] = useState(0);
	const typedCharactersElementRef = useRef(null);

	const handleDurationSelect = (value) => {
		let durationValue;
		switch (value) {
			case "15 mins":
				durationValue = 0.25;
				break;
			case "30 mins":
				durationValue = 0.5;
				break;
			case "45 mins":
				durationValue = 0.75;
				break;
			case "1 hour":
				durationValue = 1;
				break;
			case "2 hours":
				durationValue = 2;
				break;
			case "4 hours":
				durationValue = 4;
				break;
			default:
				durationValue = 0;
		}
		setServiceDuration([value, durationValue]);
	};

	const durationsList = [
		"15 mins",
		"30 mins",
		"45 mins",
		"1 hour",
		"2 hours",
		"4 hours",
	];

	const isAlphabetic = (value) => /^[A-Za-z\s&]+$/.test(value);
	// const isNumeric = (value) => /^\d{1,2}$/.test(value);
	const isPrice = (value) => /^[0-9]{1,5}(\.[0-9]{1,2})?$/.test(value);
	const isNotEmpty = (value) => value.trim() !== "";
	const isTextDescription = (value) => value.length >= 100;

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

	useEffect(() => {
		const textAreaElement = document.querySelector("#serviceDescription");
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

	const handleDaysSelect = (selectedDays) => {
		const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
		const sortedDays = selectedDays.sort(
			(a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b)
		);
		let formattedDays = "";
		for (let i = 0; i < sortedDays.length; i++) {
			if (
				i === 0 ||
				daysOfWeek.indexOf(sortedDays[i]) -
					daysOfWeek.indexOf(sortedDays[i - 1]) >
					1
			) {
				// Start of a new range
				formattedDays += (formattedDays ? ", " : "") + sortedDays[i];
			} else if (
				i === sortedDays.length - 1 ||
				daysOfWeek.indexOf(sortedDays[i]) -
					daysOfWeek.indexOf(sortedDays[i + 1]) <
					-1
			) {
				// End of a range
				formattedDays += "-" + sortedDays[i];
			}
		}
		setSelectedDays(formattedDays);
	};

	const handleSubmit = async (event) => {
		setIsLoading(true);
		event.preventDefault();

		const serviceData = {
			businessId,
			serviceTitle,
			serviceDuration,
			servicePrice,
			serviceStartTime,
			serviceEndTime,
			breakStartTime,
			breakEndTime,
			selectedDays,
			serviceDescription,
			businessEmail,
		};

		console.log("serviceData", serviceData);

		if (selectedDays.length === 0) {
			setError((prevErrors) => ({
				...prevErrors,
				selectedDays: "At least one day must be selected",
			}));
			setIsLoading(false);
			return;
		}

		try {
			const response = await axios.post("/services/add", serviceData);
			// console.log(response.data);

			// Check if the form submission was successful
			if (response.data.success) {
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		} catch (error) {
			// console.log("error data", error.response?.data);
			// console.log("Form data", serviceData);
			setIsLoading(false);
			setError(error.response.data.error);
			setApiError(error.response?.data || "An error occurred");
			console.log("error", error);
		}
	};

	// console.log("service data:", [
	// 	serviceTitle,
	// 	serviceDuration,
	// 	servicePrice,
	// 	serviceStartTime,
	// 	serviceEndTime,
	// 	breakStartTime,
	// 	breakEndTime,
	// 	selectedDays,
	// 	serviceDescription,
	// 	businessEmail,
	// 	businessId,
	// ]);

	return (
		<div className="flex justify-center items-center py-28">
			<div className="flex flex-col justify-center">
				<div className="md:w-full lg:w-[600px] xl:w-[800px]">
					<h2 className="flex justify-center items-center mb-12 md:px-24 xl:lg:px-12 font-bebas font-semibold text-8xl text-indigo-500">
						Add a Service.
					</h2>
					<form onSubmit={handleSubmit} className="">
						<div className="space-y-4 mt-12">
							<div className="justify-center space-x-4 grid grid-cols-5 w-full">
								<div className="col-span-5">
									<InputField
										inputFieldId="serviceTitle"
										inputFieldType="text"
										inputFieldPlaceholder="service title"
										inputFieldHtmlFor="serviceTitle"
										inputFieldLabelName="Title"
										isRequired={true}
										fieldType="input"
										value={serviceTitle}
										onChange={(e) => setServiceTitle(e.target.value)}
										validateOnBlur={true}
										validate={(value) =>
											validateField(
												value,
												isAlphabetic,
												"Business name should only contain alphabets",
												"serviceTitle",
												"Service Title" // pass the label name here
											)
										}
										inputFieldError={error.serviceTitle}
									/>
								</div>
							</div>

							<div className="gap-4 grid grid-flow-col w-full">
								<div className="">
									<Dropdown
										dropdownbuttonname="select duration"
										dropdownlabelname="Duration"
										dropdownlistLength={6}
										dropdownlabelhtmlfor="employeesno"
										dropdownliname1="15 mins"
										dropdownliname2="30 mins"
										dropdownliname3="45 mins"
										dropdownliname4="1 hour"
										dropdownliname5="2 hours"
										dropdownliname6="4 hours"
										onOptionSelect={handleDurationSelect}
										dropdownError={error.durationUnit}
										value={serviceDuration}
										onChange={(e) => setServiceDuration(e.target.value)}
										dropdownOptions={durationsList}
									/>
								</div>
								<div className="">
									<InputField
										inputFieldId="servicePrice"
										inputFieldType="text"
										inputFieldPlaceholder="service price"
										inputFieldHtmlFor="servicePrice"
										inputFieldLabelName="Price"
										isRequired={true}
										fieldType="input"
										value={servicePrice}
										onChange={(e) => {
											const value = parseFloat(e.target.value);
											if (!isNaN(value) && value >= 0) {
												setServicePrice(e.target.value);
											}
										}}
										validateOnBlur={true}
										validate={(value) =>
											validateField(
												value,
												isPrice,
												"Service price must be a non-negative integer of no more than 5 digits",
												"servicePrice",
												"Service Price"
											)
										}
										inputFieldError={error.servicePrice}
									/>
								</div>

								<div className="">
									<InputField
										inputFieldId="serviceStartTime"
										inputFieldType="time"
										inputFieldPlaceholder="xx am/pm"
										inputFieldHtmlFor="serviceStartTime"
										inputFieldLabelName="Start Time"
										isRequired={true}
										fieldType="input"
										value={serviceStartTime}
										onChange={(e) =>
											setServiceStartTime(convertTo12Hour(e.target.value))
										}
										validateOnBlur={true}
										validate={(value) =>
											validateField(
												value,
												isNotEmpty,
												"Service start time is required",
												"serviceStartTime",
												"Service Start Time"
											)
										}
										inputFieldError={error.serviceStartTime}
									/>
								</div>

								<div className="">
									<InputField
										inputFieldId="serviceEndTime"
										inputFieldType="time"
										inputFieldPlaceholder="xx am/pm"
										inputFieldHtmlFor="serviceEndTime"
										inputFieldLabelName="End Time"
										isRequired={true}
										fieldType="input"
										value={convertTo12Hour(serviceEndTime)}
										onChange={(e) =>
											setServiceEndTime(convertTo12Hour(e.target.value))
										}
										validateOnBlur={true}
										validate={(value) =>
											validateField(
												value,
												isNotEmpty,
												"Service end time is required",
												"serviceEndTime",
												"Service End Time"
											)
										}
										inputFieldError={error.serviceEndTime}
									/>
								</div>

								<div className="">
									<InputField
										inputFieldId="breakStartTime"
										inputFieldType="time"
										inputFieldPlaceholder="xx am/pm"
										inputFieldHtmlFor="breakStartTime"
										inputFieldLabelName="Break Start Time"
										isRequired={false}
										fieldType="input"
										value={convertTo12Hour(breakStartTime)}
										onChange={(e) =>
											setBreakStartTime(convertTo12Hour(e.target.value))
										}
										validateOnBlur={true}
										inputFieldError={error.breakStartTime}
									/>
								</div>

								<div className="">
									<InputField
										inputFieldId="breakEndTime"
										inputFieldType="time"
										inputFieldPlaceholder="xx am/pm"
										inputFieldHtmlFor="breakEndTime"
										inputFieldLabelName="Break End Time"
										isRequired={false}
										fieldType="input"
										value={convertTo12Hour(breakEndTime)}
										onChange={(e) =>
											setBreakEndTime(convertTo12Hour(e.target.value))
										}
										validateOnBlur={true}
										inputFieldError={error.breakEndTime}
									/>
								</div>
							</div>

							<CheckboxList
								onItemsChange={handleDaysSelect}
								label="Select Days"
								items={["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]}
								checkboxFor="serviceDays"
							/>
							{error.selectedDays && (
								<p className="mt-1 font-poppins text-red-500 text-xs">
									{error.selectedDays}
								</p>
							)}

							<InputField
								inputFieldId="serviceDescription"
								inputFieldType="text"
								inputFieldPlaceholder="service description"
								inputFieldHtmlFor="serviceDescription"
								inputFieldLabelName="Description"
								isRequired={true}
								fieldType="textarea"
								cols={10}
								rows={5}
								maxLength={500}
								value={serviceDescription}
								onChange={(e) => setServiceDescription(e.target.value)}
								validateOnBlur={true}
								validate={(value) =>
									validateField(
										value,
										isTextDescription,
										"Service description should be atleast 100 characters.",
										"serviceDescription",
										"Service Description"
									)
								}
								inputFieldError={error.serviceDescription}
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
						{serverError && (
							<p className="mt-1 font-poppins text-red-500 text-xs">
								{serverError}
							</p>
						)}
						<div className="md:px-32 xl:px-64 xs:px-16 py-8">
							<Button
								buttonName="ADD SERVICE"
								buttonType="submit"
								disabled={isLoading}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ServiceAddForm;
