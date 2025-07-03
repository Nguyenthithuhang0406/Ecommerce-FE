import HeaderAdmin from "@/components/admin/HeaderAdmin";
import React, { useEffect, useState } from "react";
import LayoutAdmin from "./LayoutAdmin";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "@/components/admin/StatCard";
import SaleOverviewChart from "@/components/admin/chart/SaleOverviewChart";
import CategoryDistributionChart from "@/components/admin/chart/CategoryDistributionChart";
import axios from "axios";

const Overview = () => {
	const [categoryData, setCategoryData] = useState([]);

	const getRandomValue = (min, max) =>
		Math.floor(Math.random() * (max - min + 1)) + min;
	const getPastelColor = () => {
		const r = Math.floor(Math.random() * 100 + 100)
			.toString(16)
			.padStart(2, "0");
		const g = Math.floor(Math.random() * 100 + 100)
			.toString(16)
			.padStart(2, "0");
		const b = Math.floor(Math.random() * 100 + 100)
			.toString(16)
			.padStart(2, "0");
		return `#${r}${g}${b}`;
	};

	const getAllCategory = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/categories`
			);
			const categories = res.data.data.content;
			const newCategoryData = categories.map((category) => ({
				name: category.name,
				value: getRandomValue(2000, 6000),
				color: getPastelColor(),
			}));
			setCategoryData(newCategoryData);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getAllCategory();
	}, []);

	return (
		<LayoutAdmin>
			<div className="flex-1 overflow-auto relative z-10">
				<HeaderAdmin title={"Thống kê"} />
				<main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
					<motion.div
						className="grid grid-cols-1 gap-5 mb-8 lg:grid-cols-4"
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 10, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<StatCard
							name="Tổng tiền hàng"
							icon={Zap}
							value="$12,345"
							color="#6366F1"
						/>
						<StatCard
							name="Số lượng người bán"
							icon={Users}
							value="1,234"
							color="#8B5CF6"
						/>
						<StatCard
							name="Tổng sản phẩm"
							icon={ShoppingBag}
							value="567"
							color="#EC4899"
						/>
						<StatCard
							name="Tỷ lệ bán hàng"
							icon={BarChart2}
							value="12,5%"
							color="#10B981"
						/>
					</motion.div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<SaleOverviewChart />
						<CategoryDistributionChart data={categoryData} />
					</div>
				</main>
			</div>
		</LayoutAdmin>
	);
};

export default Overview;
