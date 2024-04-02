import { useSelector } from "react-redux";
import ServiceCRUDCard from "../ServiceCRUDCard";
import { useEffect, useState } from "react";
import axios from "axios";

function ServicesCRUD() {
	const [services, setServices] = useState([]);
	const selectedBusiness = useSelector((state) => state.business.businessData);

	const businessEmail = selectedBusiness?.workEmail;

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(`/services/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			setServices(services.filter((service) => service._id !== id));
		} catch (error) {
			console.error("Fetch error: ", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/services/all");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const { data } = await response.json(); // Extract 'data' property
				console.log("Services data:", data); // Log the data
				setServices(data);
			} catch (error) {
				console.error("Fetch error: ", error);
			}
		};

		console.log("Business email:", businessEmail); // Log the business email
		fetchData();
	}, [businessEmail]);

	// console.log(services);
	return (
		<div className="flex flex-col flex-wrap justify-center items-center gap-x-16 gap-y-16 px-20 pb-12">
			<h2 className="mb-4 md:px-24 xl:lg:px-12 font-bebas font-semibold text-8xl text-indigo-500">
				manage your services.
			</h2>
			{services
				.filter((service) => service.businessEmail === businessEmail)
				.map((service, index) => (
					<ServiceCRUDCard
						key={index}
						service={service}
						onDelete={handleDelete}
					/>
				))}
		</div>
	);
}

export default ServicesCRUD;
