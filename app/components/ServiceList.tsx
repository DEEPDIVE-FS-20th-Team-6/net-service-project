"use client";
import { useEffect, useState } from "react";

interface Service {
	id: number;
	name: string;
	description: string;
}

export default function ServiceList() {
	const [services, setServices] = useState<Service[]>([]);

	useEffect(() => {
		fetch("/api/services")
			.then((res) => res.json())
			.then((data) => setServices(data));
	}, []);

	return (
		<div className="grid grid-cols-3 gap-4">
			{services.map((service) => (
				<div
					key={service.id}
					className="border p-4 rounded-lg shadow hover:shadow-lg transition"
				>
					<h2 className="text-xl font-semibold">{service.name}</h2>
					<p className="text-gray-600">{service.description}</p>
				</div>
			))}
		</div>
	);
}
