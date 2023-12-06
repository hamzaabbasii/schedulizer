import Button from "./Button";
import DropdownButton from "./Form/DropdownButton";
import InputField from "./Form/InputField";
import Navbar from "./Navbar/Navbar";

function BusinessRegistrationForm() {
	return (
		<div className="m-0">
			<Navbar />
			<div className="flex bg-[#FAF8ED] justify-center items-center pt-24 h-screen">
				<div className="flex flex-col justify-center py-12">
					<h3 className="pb-6 px-4 text-6xl font-medium text-dark-grey-900 font-bebas">
						Let us <br />
						<p className="text-9xl font-extrabold">
							know more about your business.
						</p>
					</h3>
					<div className="px-72 items-center justify-center w-full">
						{/* <div className="mt-6">
							<h1 className="text-black">Select type of account</h1>

							<div className="mt-3 md:flex md:items-center md:-mx-2">
								<button className="flex justify-center w-full px-6 py-3 text-black rounded-md md:w-auto md:mx-2 focus:outline-none">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										/>
									</svg>

									<span className="mx-2">client</span>
								</button>

								<button className="flex justify-center w-full px-6 py-3 mt-4 text-black border border-blue-500 rounded-md md:mt-0 md:w-auto md:mx-2 focus:outline-none">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>

									<span className="mx-2">worker</span>
								</button>
							</div>
						</div> */}
						<form>
							<div className="grid grid-cols-1 gap-x-8 gap-y-4 mt-8 md:grid-cols-2">
								<div>
									<InputField
										inputFieldId="businessName"
										inputFieldType="text"
										inputFieldPlaceholder="John & Sons"
										inputFieldHtmlFor="businessName"
										inputFieldLabelName="Registered Business Name"
										isRequired={true}
										fieldType="input"
									/>
								</div>

								<div>
									<InputField
										inputFieldId="businessContactNumber"
										inputFieldType="text"
										inputFieldPlaceholder="XXXX-XXXXXXX"
										inputFieldHtmlFor="businessContactNumber"
										inputFieldLabelName="Contact Number"
										isRequired={true}
										fieldType="input"
									/>
								</div>

								<div>
									<InputField
										inputFieldId="businessEmail"
										inputFieldType="email"
										inputFieldPlaceholder="johnsnow@example.com"
										inputFieldHtmlFor="businessEmail"
										inputFieldLabelName="Work Email"
										isRequired={true}
										fieldType="input"
									/>
								</div>

								<div>
									<InputField
										inputFieldId="businessCity"
										inputFieldType="email"
										inputFieldPlaceholder="Islamabad"
										inputFieldHtmlFor="businessCity"
										inputFieldLabelName="City"
										isRequired={true}
										fieldType="input"
									/>
								</div>

								<div className="grid grid-cols-2 gap-x-6">
									<div className="flex-grow">
										<DropdownButton
											dropdownbuttonname="public, private"
											dropdownlabelname="Business Type"
											dropdownlistLength={2}
											dropdownlabelhtmlfor="businesstype"
											dropdownliname1="Public Business"
											dropdownliname2="Private Business"
										/>
									</div>
									<div className="flex-shrink">
										<DropdownButton
											dropdownbuttonname="select range"
											dropdownlabelname="No. of Employees"
											dropdownlistLength={4}
											dropdownlabelhtmlfor="employeesno"
											dropdownliname1="1 - 5"
											dropdownliname2="5 - 10"
											dropdownliname3="10 - 15"
											dropdownliname4="15 - 20"
										/>
									</div>
								</div>
								<div>
									<InputField
										inputFieldId="businessCategory"
										inputFieldType="text"
										inputFieldPlaceholder="e.g. IT, Marketing, etc."
										inputFieldHtmlFor="businessCategory"
										inputFieldLabelName="Field of Work"
										isRequired={true}
										fieldType="input"
									/>
								</div>

								<div>
									<InputField
										inputFieldId="businessAddress"
										inputFieldType="text"
										inputFieldPlaceholder="Appt. 123, Street 123, Sector 123, Islamabad"
										inputFieldHtmlFor="businessAddress"
										inputFieldLabelName="Address"
										isRequired={true}
										fieldType="input"
									/>
								</div>

								<div>
									<InputField
										inputFieldId="businessAddressLink"
										inputFieldType="url"
										inputFieldPlaceholder="https://www.google.com/maps/..."
										inputFieldHtmlFor="businessAddressLink"
										inputFieldLabelName="Link to Google Maps"
										isRequired={true}
										fieldType="input"
									/>
								</div>
							</div>

							<div className="py-4 xl:px-36 md:px-32 xs:px-16">
								<Button
									buttonName="SUBMIT"
									buttonLink="/schedulizer/businessinfo"
									buttonType="submit"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BusinessRegistrationForm;
