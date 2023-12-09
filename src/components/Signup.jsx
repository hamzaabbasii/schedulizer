import { Link } from "react-router-dom";
import Button from "./Button";
import InputField from "./Form/InputField";
import Navbar from "./Navbar/Navbar";
import axios from "axios";
import { useState } from "react";

function Signup() {
	const [userFirstName, setUserFirstName] = useState("");
	const [userLastName, setUserLastName] = useState("");
	const [userPhoneNumber, setUserPhoneNumber] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [userConfirmPassword, setUserConfirmPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		const userData = {
			userFirstName,
			userLastName,
			userPhoneNumber,
			userEmail,
			userPassword,
			userConfirmPassword,
		};

		try {
			const response = await axios.post("/user/signup", userData);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="">
			<Navbar />
			<div className="flex h-screen items-center justify-center bg-[#FAF8ED] pt-36 pattern-texture-indigo-500/30 pattern-texture-scale-[1.5]">
				<div className="flex justify-center py-12">
					<div className="md:w-full lg:w-[600px] xl:w-[700px]">
						<h3 className="text-dark-grey-900 pb-6 text-center font-bebas text-9xl font-extrabold">
							Sign Up
						</h3>
						<form onSubmit={handleSubmit}>
							<div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
								<div>
									<InputField
										inputFieldId="userFirstName"
										inputFieldType="text"
										inputFieldPlaceholder="John"
										inputFieldHtmlFor="userFirstName"
										inputFieldLabelName="First Name"
										isRequired={true}
										fieldType="input"
										value={userFirstName}
										onChange={(e) => setUserFirstName(e.target.value)}
									/>
								</div>

								<div>
									<InputField
										inputFieldId="userLastName"
										inputFieldType="text"
										inputFieldPlaceholder="Snow"
										inputFieldHtmlFor="userLastName"
										inputFieldLabelName="Last Name"
										isRequired={true}
										fieldType="input"
										value={userLastName}
										onChange={(e) => setUserLastName(e.target.value)}
									/>
								</div>

								<div>
									<InputField
										inputFieldId="userPhoneNumber"
										inputFieldType="text"
										inputFieldPlaceholder="XXXX-XXXXXXX"
										inputFieldHtmlFor="userPhoneNumber"
										inputFieldLabelName="Phone Number"
										isRequired={true}
										fieldType="input"
										value={userPhoneNumber}
										onChange={(e) => setUserPhoneNumber(e.target.value)}
									/>
								</div>

								<div>
									<InputField
										inputFieldId="userEmail"
										inputFieldType="email"
										inputFieldPlaceholder="johnsnow@example.com"
										inputFieldHtmlFor="userEmail"
										inputFieldLabelName="Email address"
										isRequired={true}
										fieldType="input"
										value={userEmail}
										onChange={(e) => setUserEmail(e.target.value)}
									/>
								</div>

								<div>
									<InputField
										inputFieldId="userPassword"
										inputFieldType="password"
										inputFieldPlaceholder="Enter your password"
										inputFieldHtmlFor="userPassword"
										inputFieldLabelName="Password"
										isRequired={true}
										fieldType="input"
										value={userPassword}
										onChange={(e) => setUserPassword(e.target.value)}
									/>
								</div>

								<div>
									<InputField
										inputFieldId="userConfirmPassword"
										inputFieldType="password"
										inputFieldPlaceholder="Confirm your password"
										inputFieldHtmlFor="userConfirmPassword"
										inputFieldLabelName="Confirm Password"
										isRequired={true}
										fieldType="input"
										value={userConfirmPassword}
										onChange={(e) => setUserConfirmPassword(e.target.value)}
									/>
								</div>
							</div>
							<div className="py-4 xs:px-16 md:px-32 xl:px-36">
								<Button
									buttonName="SIGN UP"
									buttonLink="/schedulizer/login"
									buttonType="submit"
								/>
							</div>
						</form>
						<p className="text-md text-grey-900 text-center font-muktaVaani leading-relaxed">
							Already have an account?{" "}
							<Link
								to="/schedulizer/login"
								className="font-poppins text-sm font-semibold text-indigo-500 hover:text-indigo-600">
								Sign In
							</Link>
						</p>
						<div className="mb-3 flex items-center pt-6">
							<hr className="border-grey-500 h-0 grow border-b border-solid" />
							<p className="text-grey-600 mx-4">or</p>
							<hr className="border-grey-500 h-0 grow border-b border-solid" />
						</div>
						<div className="xs:px-16 md:px-32 xl:px-36">
							<a className="text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-grey-300 mb-6 flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-black py-2 font-ptSansCaption text-sm font-medium transition duration-300 focus:ring-4 xs:px-4">
								<img
									className="mr-6 h-5"
									src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
									alt=""
								/>
								Continue with Google
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;
