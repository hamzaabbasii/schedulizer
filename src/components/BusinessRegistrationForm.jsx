import Button from "./Button";
import DropdownButton from "./DropdownButton";
import InputField from "./InputField";
import Navbar from "./Navbar";

function BusinessRegistrationForm() {
	return (
		<div>
			<Navbar />
			<div className="flex justify-center items-center py-36">
				<div className="flex justify-center py-12">
					<div className="w-[590px]">
						<h3 className="pb-6 text-center text-4xl font-extrabold text-dark-grey-900">
							Let us know more <br />
							about your business.
						</h3>
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
										inputfieldid="businessname"
										inputfieldtype="text"
										inputfieldplaceholder="John & Sons"
										inputfieldhtmlfor=""
										inputfieldlabelname="Registered Name"
									/>
								</div>

								<div>
									<InputField
										inputfieldid="businesscity"
										inputfieldtype="text"
										inputfieldplaceholder="Islamabad"
										inputfieldhtmlfor=""
										inputfieldlabelname="City"
									/>
								</div>

								<div>
									<InputField
										inputfieldid="businesscontactnumber"
										inputfieldtype="text"
										inputfieldplaceholder="XXXX-XXXXXXX"
										inputfieldhtmlfor=""
										inputfieldlabelname="Contact Number"
									/>
								</div>

								<div>
									<InputField
										inputfieldid="businessemail"
										inputfieldtype="email"
										inputfieldplaceholder="johnsnow@example.com"
										inputfieldhtmlfor=""
										inputfieldlabelname="Work Email"
									/>
								</div>

								<div>
									<DropdownButton
										dropdownbuttonname="select range"
										dropdownlabelname="No. of Employees"
										dropdownlistLength={3}
										dropdownlabelhtmlfor="employeesno"
										dropdownliname0="1 - 5"
										dropdownliname1="5 - 10"
										dropdownliname2="10 - 15"
										dropdownliname3="15 - 20"
									/>
								</div>

								<div>
									<InputField
										inputfieldid="businesscategory"
										inputfieldtype="text"
										inputfieldplaceholder="e.g. IT, Marketing, etc."
										inputfieldhtmlfor=""
										inputfieldlabelname="Field of Work"
									/>
								</div>

								<div>
									<DropdownButton
										dropdownbuttonname="public, private"
										dropdownlabelname="Business Type"
										dropdownlistLength={5}
										dropdownlabelhtmlfor="businesstype"
										dropdownliname1="Public Business"
										dropdownliname0="Public Business 0"
										dropdownliname2="Private Business"
										dropdownliname3="Private Business 3"
										dropdownliname4="Public Business 4"
										dropdownliname5="Private Business 5"
									/>
								</div>
							</div>
							<div className="pb-2 px-24">
								<Button buttonname="add business" />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BusinessRegistrationForm;
