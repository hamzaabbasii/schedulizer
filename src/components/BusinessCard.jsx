import Button from "./Button";
import PropTypes from "prop-types";
import { animate } from "motion";
import { useEffect } from "react";

function BusinessCard({ business }) {
	const imagePath = business.profilePicture.replace(
		"public/",
		"/backend/public/"
	);
	console.log(imagePath);

	useEffect(() => {
		animate(
			".businessDescription",
			{ opacity: [-1, 1], scale: [0.9, 1] },
			{ duration: 1.5 }
		);
		animate(
			".businessDetails",
			{ x: [-30, 1], opacity: [0, 1] },
			{ duration: 1.5 }
		);
	});

	return (
		<div className="inline-flex flex-col justify-center items-center gap-5 border-2 border-indigo-500 bg-[#FAF8ED] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-6 rounded-2xl md:max-w-sm break-words group hover:scale-[1.02] duration-500 ease-in-out">
			<div className="flex flex-col justify-center items-center gap-7">
				<div className="inline-flex justify-between items-center gap-8">
					<img
						className="border-2 border-indigo-500 rounded-full w-12 h-12"
						src={imagePath}
						alt="Profile"
					/>
					<div className="flex flex-col justify-start">
						<div className="font-poppins font-semibold text-base text-black">
							{business.name}
						</div>
						<div className="inline-flex justify-center items-center gap-2.5 font-muktaVaani text-black text-xs businessDetails">
							<div>{business.category}</div>
							<div>{business.city}</div>
							<div>Rating: 4.5 / 5</div>
						</div>
					</div>
				</div>
				<div className="py-2 font-muktaVaani font-normal text-black text-center text-sm businessDescription">
					{business.bio.length > 100
						? `${business.bio.slice(0, 100)}...`
						: business.bio}
				</div>
				<div className="">
					<Button
						buttonName="VISIT PROFILE"
						buttonLink={`/schedulizer/businessinfo/${business._id}`}
					/>
				</div>
			</div>
		</div>
	);
}

BusinessCard.propTypes = {
	business: PropTypes.shape({
		name: PropTypes.string,
		businessType: PropTypes.string,
		category: PropTypes.string,
		city: PropTypes.string,
		_id: PropTypes.string,
		bio: PropTypes.string,
		profilePicture: PropTypes.string,
	}).isRequired,
};

export default BusinessCard;
