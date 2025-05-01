import React from "react";
import Layout from "../../components/commons/layout/Layout";
import { FaChevronRight } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { BsTelephoneFill } from "react-icons/bs";
import { RiMapPin2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
const ContactPage = () => {
	const navigate = useNavigate();
	return (
		<Layout>
			<motion.div
				initial={{ opacity: 0, x:-20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{duration:0.5}}
				className=" pt-[20px] flex justify-center items-center ">
				<div className="container w-[84%]">
					<div>
						<div className="flex items-center gap-3 mb-10">
							<span
								onClick={() => navigate("/")}
								className="cursor-pointer hover:text-[#ff6347] duration-200"
							>
								Trang chủ
							</span>
							<FaChevronRight
								size={12}
								className="inline-block"
							/>
							<p className="font-bold text-[#ff6347]">Liên hệ</p>
						</div>
						<div className="block-title text-center mb-10">
							<h2 className="text-3xl font-semibold leading-loose">
								Thông tin liên hệ
							</h2>
							<p className="text-gray-400">
								Chúng tôi hân hạnh vì có cơ hội đồng hành với
								hơn 10.000 khách hàng trên khắp thế giới
							</p>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
							<div className=" h-[200px] flex justify-center items-center rounded-2xl bg-gray-100">
								<div className="block-time text-center flex justify-center items-center flex-col gap-2">
									<div>
										<RiMapPin2Fill
											color="#FF6347"
											size={60}
											className="inline-block"
										/>
									</div>
									<h3 className="font-bold ">Địa chỉ</h3>
									<span className="text-gray-500">
										266 Đội Cấn, Ba Đình, Hà Nội
									</span>
								</div>
							</div>
							<div className=" h-[200px] flex justify-center items-center rounded-2xl bg-gray-100">
								<div className="block-time text-center flex justify-center items-center flex-col gap-2">
									<div>
										<IoMdMail
											color="#FF6347"
											size={60}
											className="inline-block"
										/>
									</div>
									<h3 className="font-bold ">Email</h3>
									<span className="text-gray-500">
										support@ndstyle.com
									</span>
								</div>
							</div>
							<div className=" h-[200px] flex justify-center items-center rounded-2xl bg-gray-100">
								<div className="block-time text-center flex justify-center items-center flex-col gap-2">
									<div>
										<BsTelephoneFill
											color="#ff6347"
											size={60}
											className="inline-block"
										/>
									</div>
									<h3 className="font-bold ">Hotline</h3>
									<span className="text-gray-500">
										+84 123 456 789
									</span>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
							{/* Google Map */}
							<div>
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9168302083826!2d105.81122397484918!3d21.036013580615144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab128b832837%3A0x277dc2c7fae28e1!2zMjY2IFAuIMSQ4buZaSBD4bqlbiwgTGnhu4V1IEdpYWksIEJhIMSQw6xuaCwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1744481168247!5m2!1svi!2s"
									width="100%"
									height="100%"
									className="rounded-md border border-gray-300 min-h-[300px]"
									allowFullScreen=""
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								></iframe>
							</div>

							<form className="space-y-4">
								<input
									type="text"
									required
									placeholder="Họ và tên"
									className="w-full bg-gray-50 border border-gray-300 px-4 py-3 rounded-md focus:ring-0 focus:outline-none placeholder-gray-400"
								/>
								<input
									type="email"
									required
									pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
									placeholder="Email"
									className="w-full bg-gray-50 border border-gray-300 px-4 py-3 rounded-md focus:ring-0 focus:outline-none placeholder-gray-400"
								/>
								<input
									type="tel"
									required
									placeholder="Điện thoại"
									className="w-full bg-gray-50 border border-gray-300 px-4 py-3 rounded-md focus:ring-0 focus:outline-none placeholder-gray-400"
								/>
								<textarea
									rows={6}
									placeholder="Nội dung"
									className="w-full bg-gray-50 border border-gray-300 px-4 py-3 rounded-md focus:ring-0 focus:outline-none placeholder-gray-400"
								></textarea>
								<div>
									<button type="submit" className="px-6 py-3 cursor-pointer text-white bg-[#FF6347] rounded-md hover:bg-white hover:text-[#FF6347] hover:border-[#ff6347] border border-transparent hover:border duration-200">
										Gửi thông tin
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</motion.div>
		</Layout>
	);
};

export default ContactPage;
