/* eslint-disable */
import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import DetailProduct from "./pages/product/DetailProduct/DetailProduct";
import Search from "./pages/product/search/Search";
import Cart from "./pages/cart/Cart";
import Auth from "./pages/auth/Auth";
import ProductsByCategory from "./pages/productsByCategory/ProductsByCategory";
import FollowingProducts from "./pages/followingProducts/FollowingProducts";
import Order from "./pages/order/Order";

import BlogLayout from "./components/commons/blogs/BlogLayout";
import "./App.css";
import ContactPage from "./pages/contact/ContactPage";
import MarketSystemPage from "./pages/market-system/MarketSystemPage";
const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Thời gian hiệu ứng (ms)
      once: true, // Chỉ chạy một lần khi cuộn
    });
  }, []);

  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/product/:id",
      element: <DetailProduct />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/productsByCategory/:categoryName",
      element: <ProductsByCategory />,
    },
    {
      path: "/followingProducts/:id",
      element: <FollowingProducts />,
    },
    {
      path: "/order",
      element: <Order/>,
    },
    {
      path: "/contact",
      element: <ContactPage/>
    },
    {
      path: "/market-system",
      element: <MarketSystemPage/>
    },
    {
      path: "/blog",
      element:<BlogLayout/>
    }
  ]);
  return <>{routes}</>;
};

export default App;
