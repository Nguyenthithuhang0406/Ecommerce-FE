import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderAdmin = ({ title }) => {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("role");
		// window.location.reload();
		navigate("/auth");
	};
	return (
		<header className="bg-[#FFFDD0] bg-opacity-50 backdrop-blur-md shadow-lg ">
			<div className="max-w-7xl flex justify-between items-center mx-auto py-4 px-4 sm:px-6 lg:px-8">
				<h1 className="text-2xl font-semibold text-black">{title}</h1>
				<div>
					<button
						onClick={logout}
						className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
					>
						Đăng xuất
					</button>
				</div>
			</div>
		</header>
	);
};

export default HeaderAdmin;
