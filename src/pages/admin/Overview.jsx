import HeaderAdmin from "@/components/admin/HeaderAdmin";
import React from "react";
import LayoutAdmin from "./LayoutAdmin";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "@/components/admin/StatCard";
import SaleOverviewChart from "@/components/admin/chart/SaleOverviewChart";
import CategoryDistributionChart from "@/components/admin/chart/CategoryDistributionChart";
const Overview = () => {
	return (
		<LayoutAdmin>
			<div className="flex-1 overflow-auto relative z-10">
				<HeaderAdmin title={"Overview"} />
				<main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
					<motion.div
						className="grid grid-cols-1 gap-5 mb-8 lg:grid-cols-4"
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 10, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<StatCard
							name="Total Sales"
							icon={Zap}
							value="$12,345"
							color="#6366F1"
						/>
						<StatCard
							name="New Users"
							icon={Users}
							value="1,234"
							color="#8B5CF6"
						/>
						<StatCard
							name="Total Products"
							icon={ShoppingBag}
							value="567"
							color="#EC4899"
						/>
						<StatCard
							name="Conversion Rate"
							icon={BarChart2}
							value="12,5%"
							color="#10B981"
						/>
					</motion.div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<SaleOverviewChart />
						<CategoryDistributionChart />
					</div>
				</main>
			</div>
		</LayoutAdmin>
	);
};

export default Overview;
