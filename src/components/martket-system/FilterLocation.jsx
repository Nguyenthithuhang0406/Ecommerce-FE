import React from "react";
import { locationData } from "./dataLocation";
import { motion } from 'framer-motion'
const scrollbarStyle = {
    WebkitScrollbarWidth: "8px",
    scrollbarWidth: "thin",
    
};
import './CustomScrollBar.scss'
const FilterLocation = ({
	selectedDistrict,
    selectedProvince,
    setSelectedDistrict,
	setSelectedProvince,
    districts,
    locations,
    setCurrentMapUrl
}) => {
    console.log('locations', locations);
    console.log('district',districts);
    
    return (
        
        <div className="bg-orange-200 p-3 h-150 rounded-xl">
            <div className="">
                <div className=" flex gap-2 wrap-normal">
                    <select
                        value={selectedProvince}
                        onChange={setSelectedProvince}
                        className=" w-full px-4 py-3 rounded-lg border-none  bg-[#ff6347] text-white cursor-pointer outline-none"
                    >
                        <option className="bg-[#ffffff] text-black" value="">Chọn tỉnh thành</option>
                        {Object.entries(locationData).map(([key, province]) => (
                            <option className="bg-[#ffffff] text-black" key={key} value={key}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                    <div className="w-full">
                        <select
                            value={selectedDistrict}
                            onChange={setSelectedDistrict}
                            disabled={!selectedProvince}
                            className="w-fit px-4 py-3 rounded-lg bg-white cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">Chọn quận/huyện</option>
                            {districts.map((district) => (
                                <option key={district.value} value={district.value}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-1">
                    <div className="space-y-4 max-h-130 overflow-y-auto p-1 custom-scrollbar" >
                        {locations.map((location, index) => (
                            <motion.div
                                whileHover={
                                    {
                                        backgroundColor: '#ff6347',
                                        color: '#ffffff'
                                        
                                    }
                                }
                                key={index}
                                className="group bg-white rounded-lg border border-orange-400 p-4 cursor-pointer hover:shadow-md transition-shadow"
                                onClick={()=>setCurrentMapUrl(location.mapUrl)
                                }
                            >
                                <h3 className="text-lg font-medium mb-2">
                                    {location.title}
                                </h3>
                                <div className="mb-1">
                                    <span className="font-medium mr-1">
                                        Địa chỉ:
                                    </span>
                                    <span
                                        className="text-gray-700 group-hover:text-white duration-100">
                                        {location.address}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-medium mr-1">
                                        Hotline:
                                    </span>
                                    <span className="text-gray-700 group-hover:text-white duration-100">
                                        {location.hotline}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
		</div>
	);
};

export default FilterLocation;
