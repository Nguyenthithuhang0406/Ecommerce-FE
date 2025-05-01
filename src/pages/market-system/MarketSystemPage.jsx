import React, { useEffect, useState } from "react";
import Layout from "../../components/commons/layout/Layout";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoStorefront } from "react-icons/io5";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaClock } from "react-icons/fa6";
import { locationData } from "../../components/martket-system/dataLocation";
import FilterLocation from "../../components/martket-system/FilterLocation";
import MapContainer from "../../components/martket-system/MapContainer";
const MarketSystemPage = () => {
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [districts, setDistricts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [currentMapUrl, setCurrentMapUrl] = useState(
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.904274586086!2d105.81330277495535!3d21.03651588061473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab2bddedd8ff%3A0xde7c4fb8e272fabc!2zVG_DoCBuaMOgIExBREVDTw!5e0!3m2!1sde!2sde!4v1745230802774!5m2!1sde!2sde"
    );
    console.log('currentMapUrl', currentMapUrl);


    const updateDistricts = () => {
        if (selectedProvince) {
            const provinceData = locationData[selectedProvince];
            if (provinceData) {
                const districtOptions = Object.entries(
                    provinceData.districts
                ).map(([key, district]) => ({
                    value: key,
                    name: district.name,
                }));
                setDistricts(districtOptions);
                // Reset selected district
                setSelectedDistrict("");

                // Update locations to show all in the province
                let allLocations = [];
                Object.values(provinceData.districts).forEach((district) => {
                    allLocations = [...allLocations, ...district.locations];
                });
                setLocations(allLocations);
                // Update map to first location
                if (allLocations.length > 0) {
                    setCurrentMapUrl(allLocations[0].mapUrl);
                }
            }
        } else {
            // Reset districts and show all locations
            setDistricts([]);
            getAllLocations();
        }
    };

    useEffect(() => {
        updateDistricts();
    }, [selectedProvince]);

    const updateLocations = () => {
        if (selectedProvince && selectedDistrict) {
          const provinceData = locationData[selectedProvince];
          const districtData = provinceData?.districts[selectedDistrict];
          
          if (districtData) {
            setLocations(districtData.locations);
            
            // Update map to first location in district
            if (districtData.locations.length > 0) {
              setCurrentMapUrl(districtData.locations[0].mapUrl);
            }
          }
        }
        
      }
      // Update locations when district changes
      useEffect(() => {
        updateLocations();
      }, [selectedDistrict]);

    const getAllLocations = () => {
        let allLocations = [];
        Object.values(locationData).forEach(province => {
          Object.values(province.districts).forEach(district => {
            allLocations = [...allLocations, ...district.locations];
          });
        });
        setLocations(allLocations);
        
        // Set default map
        if (allLocations.length > 0) {
          setCurrentMapUrl(allLocations[0].mapUrl);
        }
    };
    useEffect(() => {
        getAllLocations();
      }, []);

    const navigate = useNavigate();
    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className=" pt-[20px] flex justify-center items-center mb-10 "
            >
                <div className="container w-[84%]">
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <span
                                onClick={() => navigate("/")}
                                className="cursor-pointer hover:text-amber-600 duration-200"
                            >
                                Trang chủ
                            </span>
                            <FaChevronRight
                                size={12}
                                className="inline-block"
                            />
                            <p className="font-bold text-amber-600">
                                Hệ thống cửa hàng
                            </p>
                        </div>
                        {/*  */}
                        <div className=" border-2 border-[#ff6347] p-5 rounded-2xl mb-5">
                            <div className="flex flex-col justify-around items-start gap-5 lg:item-start lg:flex-row ">
                                <div className="flex gap-3 items-center">
                                    <div className=" rounded-full p-4 bg-[#ff6347]">
                                        <IoStorefront
                                            size={30}
                                            color="#ffffff"
                                        />
                                    </div>
                                    <div className="flex flex-col font-normal">
                                        <span>Hệ thống 8 cửa hàng</span>
                                        <span>Trên toàn quốc</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className=" rounded-full p-4 bg-[#ff6347]">
                                        <HiMiniUserGroup
                                            size={30}
                                            color="#ffffff"
                                        />
                                    </div>
                                    <div className="flex flex-col font-normal">
                                        <span>Hơn 100 nhân viên</span>
                                        <span>Để phục vụ quý khách</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className=" rounded-full p-4 bg-[#ff6347]">
                                        <FaClock size={30} color="#ffffff" />
                                    </div>
                                    <div className="flex flex-col font-normal">
                                        <span>Mở cửa 8-22h</span>
                                        <span>cả CN & Lễ tết</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div className=" flex justify-center flex-col lg:flex-row gap-6 h-150">
                            <div className="flex-1/3">
                                <FilterLocation selectedDistrict={selectedDistrict}
                                    selectedProvince={selectedProvince}
                                    setSelectedProvince={(e) => setSelectedProvince(e.target.value)}
                                    setSelectedDistrict={(e)=> setSelectedDistrict(e.target.value)}
                                    districts={districts}
                                    locations={locations} 
                                    setCurrentMapUrl={setCurrentMapUrl}
                                />
                            </div>
                            <div className="flex-2/3 lg:h-auto">
                                <MapContainer currentMapUrl={currentMapUrl}/>	
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Layout>
    );
};

export default MarketSystemPage;
