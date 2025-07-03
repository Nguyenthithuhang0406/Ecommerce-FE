/* eslint-disable */
import { getAddressesById, getDistricts, getProvinces, getWards, updateAddress } from "@/api/authAPI/user";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const UpdateAddress = ({ editAddress, setEditAddress }) => {
  const [addressDetail, setAddressDetail] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "Việt Nam",
    zipCode: "1000",
    description: addressDetail.description || "",
    phoneNumber: addressDetail.phoneNumber || "",
    id: editAddress.id,
  });

  useEffect(() => {
    const fetchAddressDetail = async () => {
      try {
        const response = await getAddressesById(editAddress.id);
        setAddressDetail(response.data);
        setNewAddress({
          ...newAddress,
          description: response.data.description || "",
          phoneNumber: response.data.phoneNumber || "",
        });
      } catch (error) {
        console.error("Error fetching address details:", error);
      }
    };
    fetchAddressDetail();
  }, [editAddress.id]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getProvinces();
        setProvinces(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tỉnh thành:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince) {
        try {
          const response = await getDistricts(selectedProvince);
          setDistricts(response);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách quận huyện:", error);
        }
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict) {
        try {
          const response = await getWards(selectedDistrict);
          setWards(response);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách phường xã:", error);
        }
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  const handleCancel = () => {
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedWard("");
    setIsEditing(false);
    setEditAddress({ id: null, isShowUpdateAddress: false });
  };

  const handleSaveAddress = async () => {
    if (
      !selectedProvince ||
      !selectedDistrict ||
      !selectedWard ||
      !newAddress.description ||
      !newAddress.phoneNumber
    ) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const updatedAddress = {
      ...newAddress,
      city:
        provinces.find(
          (province) => province.code.toString() === selectedProvince
        )?.name || "",
      state:
        districts.find(
          (district) => district.code.toString() === selectedDistrict
        )?.name || "",
      street:
        wards.find((ward) => ward.code.toString() === selectedWard)?.name || "",
    };

    try {
      const response = await updateAddress(updatedAddress);
      toast.success("Cập nhật địa chỉ thành công");
      setEditAddress({ id: null, isShowUpdateAddress: false });
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };
  return (
    <div className="w-[700px] h-[500px] bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <h1 className="text-[20px] font-bold mb-4 text-[#ff6347]">
          Cập nhật địa chỉ nhận hàng
        </h1>
        <IoClose className="text-[20px]" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <p className="w-[170px] text-[16px] text-amber-900">
            Số điện thoại <span className="text-red-500">*</span>
          </p>
          <input
            disabled={!isEditing}
            value={newAddress.phoneNumber}
            className="w-full px-2 h-[35px] border border-amber-900 outline-0 focus:outline-amber-100 rounded"
            type="number"
            onChange={(e) =>
              setNewAddress({
                ...newAddress,
                phoneNumber: e.target.value,
              })
            }
          />
        </div>
        <div className="flex gap-2">
          <p className="w-[170px] text-[16px] text-amber-900">
            Tỉnh/ Thành phố <span className="text-red-500">*</span>
          </p>
          {isEditing ? (
            <select
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full px-2 h-[35px] border border-amber-900 outline-0 focus:outline-amber-100 rounded"
            >
              <option value="">Chọn tỉnh/ thành phố</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              disabled
              value={addressDetail.city}
              className="w-full px-2 h-[35px] border border-amber-900 outline-0 focus:outline-amber-100 rounded"
              type="text"
            />
          )}
        </div>
        <div className="flex gap-2">
          <p className="w-[170px] text-[16px] text-amber-900">
            Quận/ Huyện <span className="text-red-500">*</span>
          </p>
          {isEditing ? (
            <select
              className="w-full px-2 h-[35px] border border-amber-900 outline-0 focus:outline-amber-100 rounded"
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Chọn quận/ huyện</option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              disabled
              value={addressDetail.state}
              className="w-full px-2 h-[35px] border border-amber-900 outline-0 focus:outline-amber-100 rounded"
              type="text"
            />
          )}
        </div>
        <div className="flex gap-2">
          <p className="w-[170px] text-[16px] text-amber-900">
            Phường/ Xã <span className="text-red-500">*</span>
          </p>
          {isEditing ? (
            <select
              className="w-full px-2 h-[35px] border border-amber-900 outline-0 focus:outline-amber-100 rounded"
              onChange={(e) => setSelectedWard(e.target.value)}
            >
              <option value="">Chọn phường/ xã</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              disabled
              value={addressDetail.country}
              className="w-full px-2 h-[35px] border border-amber-900 outline-0 focus:outline-amber-100 rounded"
              type="text"
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="w-[170px] text-[16px] text-amber-900">
            Địa chỉ chi tiết <span className="text-red-500">*</span>
          </p>
          <textarea
            className="w-full h-[100px] px-2 border border-amber-900 outline-0 focus:outline-amber-100 rounded"
            placeholder="Nhập địa chỉ chi tiết"
            rows="4"
            value={newAddress.description}
            disabled={!isEditing}
            onChange={(e) =>
              setNewAddress({
                ...newAddress,
                description: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            className="py-2 px-6 border-[#ff6347] text-[#ff6347] hover:bg-[#ff6347] hover:text-white border rounded cursor-pointer"
            onClick={handleCancel}
          >
            Hủy
          </button>
          {isEditing ? (
            <button
              className="py-2 px-6 bg-[#ff6347] text-white hover:bg-[#ff4500] rounded cursor-pointer"
              onClick={handleSaveAddress}
            >
              Lưu
            </button>
          ) : (
            <button
              className="py-2 px-6 bg-[#ff6347] text-white hover:bg-[#ff4500] rounded cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateAddress;
