import PropTypes from "prop-types";
import Button from "./Button";

function ServicesCRUDCard({ service, onDelete }) {
	const handleDelete = () => {
		onDelete(service._id);
	};

	console.log("ServiceCRUDCard props:", { service, onDelete }); // Log the props

	return (
		<div className="flex justify-center items-center">
			<div className="relative bg-[#FAF8ED] shadow-xl rounded-xl w-full md:max-w-sm break-words group">
				<div className="p-6">
					<div className="text-center overflow-hidden">
						<div className="flex flex-col justify-center">
							<div className="">
								<h4 className="font-bold font-poppins text-[#18191E] text-lg">
									{service.name}
								</h4>
							</div>
							<div className="flex flex-col justify-center items-center py-4 text-md">
								<p className="font-muktaVaani font-normal text-gray-600 text-sm">
									Service Duration: {service.duration[0]} <br />
									Timings: {service.serviceTiming} <br />
									Price: {service.price} <br />
									Days: {service.days}
								</p>
							</div>
							<div className="flex flex-wrap justify-center">
								<div className="px-2 w-full businessDescription">
									<p className="mb-4 font-muktaVaani text-[#18191E] text-md leading-relaxed">
										{service.description}
									</p>
								</div>
								<div className="flex justify-evenly px-2 w-full">
									<div className="pt-2 appointmentButton">
										<Button buttonName="DELETE" onClick={handleDelete} />
									</div>
									<div className="pt-2 appointmentButton">
										<Button buttonName="UPDATE" onClick={handleDelete} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

ServicesCRUDCard.propTypes = {
	service: PropTypes.shape({
		name: PropTypes.string.isRequired,
		duration: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		serviceTiming: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		days: PropTypes.string.isRequired,
		_id: PropTypes.string.isRequired,
	}).isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default ServicesCRUDCard;
