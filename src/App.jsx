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
import ContactPage from "./pages/contact/ContactPage";
import MarketSystemPage from "./pages/market-system/MarketSystemPage";
import Order from "./pages/order/Order";
import BlogList from "./components/blog/BlogList";
import BlogDetail from "./components/blog/BlogDetail";
import SearchResultPage from "./pages/blog/SearchResultPage";
import Overview from "./pages/admin/Overview";
import ProductAdminPage from "./pages/admin/ProductAdminPage";
import OrderAdminPage from "./pages/admin/OrderAdminPage";
import CategoryAdminPage from "./pages/admin/CategoryAdminPage";
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
      element: <ProductsByCategory/>
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
      path: "/order",
      element: <Order/>
    },
    {
      path: "/blog",
      element: <BlogList/>
    },
    {
      path: '/blog/:slug',
      element:<BlogDetail/>
    },
    {
      path: "/search-blog",
      element: <SearchResultPage/>
    },
    {
      path: "/admin/*",
      element: <Overview/>
    },
    {
      path: "/admin/products",
      element: <ProductAdminPage/>
    },
    {
      path: "/admin/orders",
      element: <OrderAdminPage/>
    },
    {
      path: "/admin/categories",
      element: <CategoryAdminPage/>
    }

  ]);
  return <>{routes}</>;
};

export default App;
