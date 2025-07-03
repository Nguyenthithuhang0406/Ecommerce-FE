/* eslint-disable*/
import { deleteAddress } from "@/api/authAPI/user";
import React from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const ConfirmDeleteAddress = ({ deleteAddress, setDeleteAddress }) => {
  const handleClose = () => {
    setDeleteAddress({ id: null, isShowDeleteAddress: false });
  };

  const handleAgree = async () => {
    try {
      const response = await deleteAddress(deleteAddress.id);
      toast.success("Xóa địa chỉ thành công");
      setDeleteAddress({ id: null, isShowDeleteAddress: false });
    } catch (error) {
      console.log("Error deleting address:", error);
    }
  };

  return (
    <div className="w-[500px] h-[150px] bg-white rounded-lg shadow-lg flex flex-col justify-between p-6">
      <div className="w-full flex justify-between items-center mb-4">
        <div></div>
        <div className="text-[20px] text-amber-900 font-bold">
          Bạn chắc chắn muốn xóa địa chỉ này?
        </div>
        <IoClose onClick={handleClose} className="text-[20px] cursor-pointer" />
      </div>
      <div className="w-full flex justify-center items-center gap-4">
        <button
          onClick={handleClose}
          className="px-[20px] py-[5px] border border-amber-700 text-amber-600 bg-white rounded hover:bg-amber-700 hover:text-white cursor-pointer"
        >
          Hủy
        </button>
        <button
          onClick={handleAgree}
          className="px-[20px] py-[5px] border border-b-blue-600 text-blue-600 bg-white rounded hover:bg-blue-600 hover:text-white cursor-pointer"
        >
          Đồng ý
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteAddress;
