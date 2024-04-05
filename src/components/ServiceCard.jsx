import PropTypes from "prop-types";
import Button from "./Button";
import { animate } from "motion";
import { useEffect } from "react";

function ServiceCard({ service, businessName, businessId }) {
	useEffect(() => {
		animate(
			".description",
			{ scale: [0.9, 1], opacity: [0, 1] },
			{ duration: 1.5 }
		);
		animate(".serviceDetails", { opacity: [-1, 1] }, { duration: 1.5 });
	});

	const timing = `${service?.startTime} to ${service?.endTime}`;

	return (
		<div className="inline-flex flex-col justify-center items-center gap-5 border-2 border-indigo-200 bg-[#FAF8ED] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-6 rounded-2xl md:max-w-sm break-words group hover:scale-[1.02] duration-500 ease-in-out">
			<div className="flex flex-col justify-center items-center gap-7">
				<div className="flex flex-col space-y-4">
					<div className="flex flex-col justify-center text-center">
						<div className="font-poppins font-semibold text-base text-black">
							{service.title}
						</div>
						<div className="font-extralight font-muktaVaani text-black text-sm">
							by <span className="font-light">{businessName}</span>
						</div>
					</div>

					<div className="flex flex-wrap justify-center items-center space-x-4 font-muktaVaani text-black text-xs serviceDetails">
						<div>
							Duration:{" "}
							<span className="font-semibold">{service.duration[0]}</span>
						</div>
						<div>
							Price: <span className="font-semibold">Rs.{service.price}</span>
						</div>
						<div>
							Timings: <span className="font-semibold">{timing}</span>
						</div>
						<div>
							Days: <span className="font-semibold">{service.days}</span>
						</div>
					</div>
				</div>

				<div className="font-muktaVaani font-normal text-black text-center text-sm break-words description">
					{service.description.substring(0, 250)}
				</div>
				<div className="pt-2 appointmentButton">
					<Button
						buttonName="BOOK APPOINTMENT"
						buttonLink={`/schedulizer/appointmentform/${businessId}/${service._id}`}
					/>
				</div>
			</div>
		</div>
	);
}

ServiceCard.propTypes = {
	service: PropTypes.shape({
		title: PropTypes.string.isRequired,
		duration: PropTypes.array.isRequired,
		price: PropTypes.number.isRequired,
		serviceTiming: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		days: PropTypes.string.isRequired,
		_id: PropTypes.string.isRequired,
		startTime: PropTypes.string.isRequired,
		endTime: PropTypes.string.isRequired,
	}).isRequired,
	businessName: PropTypes.string.isRequired,
	businessId: PropTypes.string.isRequired,
};

export default ServiceCard;
