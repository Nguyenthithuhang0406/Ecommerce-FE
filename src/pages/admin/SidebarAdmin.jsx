import React, { useState } from 'react'
import {
	BarChart2,
    DollarSign,
    Menu,
	ShoppingBag,
	TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const SIDEBAR_ITEMS = [
	{
		name: "Overview",
		icon: BarChart2,
		color: "#6366f1",
		href: "/admin",
	},
	{
		name: "Categories",
		icon: TrendingUp,
		color: "#8B5CF6",
		href: "/admin/categories",
	},
	{
		name: "Products",
		icon: ShoppingBag,
		color: "#EC4899",
		href: "/admin/products",
	},
	{
		name: "Orders",
		icon: DollarSign,
		color: "#10b981",
		href: "/admin/orders",
	},
];
const SidebarAdmin = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
    return (
      <motion.div
        className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
        animate={{
          width: isSidebarOpen ? 256 : 80,
        }}
      >
        <div className="text-gray-100 h-full bg-[#FF8901] bg-opacity-50 backdrop-blur-md p-4 flex flex-col">
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.3 }}
              className="flex items-center justify-center"
            >
              <p>
                <Link to={"/"} className="text-2xl font-bold justify-center ">
                  NDStyle
                </Link>
              </p>
            </motion.div>
          )}
  
          <nav className="mt-8 flex-grow">
            {SIDEBAR_ITEMS.map((item, index) => (
              <Link key={item.href} to={item.href}>
                <motion.div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg bg-[#FFB056] transition-colors mb-2 ${
                    location.pathname === item.href ? 'bg-[#FFC107] ' : ''
                  }`}
                >
                  <item.icon
                    size={20}
                    style={{
                      color: item.color,
                      minWidth: "20px",
                    }}
                  />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="ml-4 whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{
                          opacity: 1,
                          width: "auto",
                        }}
                        transition={{
                          duration: 0.2,
                          delay: 0.3,
                        }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            ))}
                </nav>
                <div className='flex items-center justify-center'>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-full hover:bg-[#FF8901] transition-colors max-w-fit"
                    >
                        <Menu size={24} />
                    </motion.button>    
                </div>
        </div>
      </motion.div>
    );
}

export default SidebarAdmin