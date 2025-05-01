import React from "react";

const MapContainer = ({ currentMapUrl }) => {
	return (
		<div className="bg-white border border-gray-300 rounded-lg overflow-hidden h-full">
			<iframe
				src={currentMapUrl}
				className="w-full h-full"
				allowFullScreen=""
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				title="Google Maps"
			></iframe>
		</div>
	);
};

export default MapContainer;
