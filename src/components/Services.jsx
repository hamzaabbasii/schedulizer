import { useState, useEffect } from "react";
import Layout from "./Layout";
import Filters from "./Filters";
import ServiceCard from "./ServiceCard";

function Services() {
	const [services, setServices] = useState([]);
	const [businesses, setBusinesses] = useState([]);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await fetch("/services/all");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const { data } = await response.json();
				console.log("services data:", data);
				setServices(data);
			} catch (error) {
				console.error("Fetch error for services: ", error);
			}
		};

		const fetchBusinesses = async () => {
			try {
				const response = await fetch("/business/all");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setBusinesses(data);
				// console.log(data);
			} catch (error) {
				console.error("Fetch error: ", error);
			}
		};

		fetchServices();
		fetchBusinesses();
	}, []);

	return (
		<Layout>
			<Filters />
			<div className="pt-36 pb-12">
				<h1 className="flex justify-center font-bebas font-semibold text-8xl text-indigo-500 tracking-wide">
					SERVICES.
				</h1>
				<div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-16 py-12">
					{services.map((service, index) => {
						if (
							Array.isArray(service.businessId) &&
							service.businessId.length > 0
						) {
							const business =
								businesses &&
								businesses.find(
									(business) => business._id === String(service.businessId[0])
								);
							if (business) {
								return (
									<ServiceCard
										key={index}
										service={service}
										businessName={business.name}
										businessId={business._id}
									/>
								);
							}
						}
						return null; // Add this line
					})}
				</div>
			</div>
		</Layout>
	);
}

export default Services;
