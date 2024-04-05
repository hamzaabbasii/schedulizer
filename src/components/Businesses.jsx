import { useEffect, useState } from "react";
import BusinessCard from "./BusinessCard";
import Filters from "./Filters";
import Layout from "./Layout";

function Businesses() {
	const [businesses, setBusinesses] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
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

		fetchData();
	}, []);

	return (
		<Layout>
			<Filters />
			<div className="pt-36 pb-12">
				<h1 className="flex justify-center font-bebas font-semibold text-8xl text-indigo-500 tracking-wide">
					BUSINESSES.
				</h1>
				<div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-16 py-12">
					{businesses.map((business, index) => (
						<BusinessCard key={index} business={business} />
					))}
				</div>
			</div>
		</Layout>
	);
}

export default Businesses;
