/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import InformationDetail from "@/components/product/detailProduct/informationDetail/InformationDetail";
import Layout from "@/components/commons/layout/Layout";
import TitleRouter from "@/components/product/titleRouter/TitleRouter";
import LeftSession from "@/components/product/detailProduct/leftSession/LeftSession";
import RightSession from "@/components/product/detailProduct/rightSession/RightSession";
import { getProductById } from "@/api/productAPI/product";

import "./DetailProduct.scss";
import AddComment from "@/components/product/comment/addComments/AddComment";

const DetailProduct = () => {
  const productId = useParams().id;
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isShowAddComment, setIsShowAddComment] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          setIsLoading(true);
          const response = await getProductById(productId);

          setProduct(response.data);

          setIsLoading(false);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            switch (error.response.status) {
              case 500:
                toast.error("Lỗi hệ thống");
                break;
              case 404:
                toast.error("Sản phẩm không tồn tại");
                break;
              default:
                toast.error("Đã xảy ra lỗi, vui lòng kiểm tra lại kết nối!");
            }
          }
        }
      }
    };

    fetchProduct();
  }, [productId]);

  // const product = {
  //   name: "Quần Jeans Nam Slim Denim Like Cơ Bản",
  //   images: [
  //     "https://bizweb.dktcdn.net/100/534/571/products/sp1-6690bfd4-f853-4f8d-b948-0fee533dc6fe.jpg?v=1731845054833",
  //     "https://bizweb.dktcdn.net/100/534/571/products/sp1-2-5f2ddfbe-e360-4936-b80c-02e4b1094eae.jpg?v=1731845054833",
  //     "https://bizweb.dktcdn.net/100/534/571/products/sp1-3-f404fd7e-cf70-4050-8647-b8940e8b9a67.jpg?v=1731845054833",
  //     "https://bizweb.dktcdn.net/100/534/571/products/sp1-5-4dde5db0-1655-4951-9050-c464e3ebc5dc.jpg?v=1731845054833",
  //     "https://bizweb.dktcdn.net/100/534/571/products/sp1-4-be474fe3-607e-4a9a-bba3-2e92c60aa4d9.jpg?v=1731845054833",
  //   ],
  //   price: 680000,
  //   discount: 10,
  //   count: 10,
  //   status: "Còn hàng",
  //   types: ["28", "29", "30", "31", "32", "33", "34", "35", "36"],
  //   description:
  //     "Quần co giãn nhẹ, chất liệu denim like mềm mại, dễ chịu giúp bạn thoải mái vận động cả ngày dài. Được nhuộm màu tươi sáng từ vải mộc trắng, sản phẩm có nhiều màu sắc đa dạng, dễ dàng kết hợp với nhiều phong cách thời trang. Thiết kế ôm nhẹ, tạo sự vừa vặn và thoáng mát, phù hợp cho cả những ngày năng động lẫn những dịp dạo phố, gặp gỡ bạn bè.",
  //   exchangePolicy: "Hàng chính hãng 100%. Đổi trả trong vòng 7 ngày.",
  //   comments: [
  //     {
  //       name: "Hồng Mến",
  //       job: "Kinh doanh",
  //       comment:
  //         "Tôi mới mua một bộ trang phục từ cửa hàng của họ và cảm thấy hoàn toàn hài lòng. Chất liệu vải rất mềm mại và thoáng khí.",
  //       rating: 3,
  //       avatar:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm4Cp0JO-s03hFKGZ2WgyO4luH1JSSzcB0ZA&s",
  //     },
  //     {
  //       name: "Trần Minh",
  //       job: "Nhân viên văn phòng",
  //       comment: "Sản phẩm đẹp, giống hình, chất lượng tốt.",
  //       rating: 4,
  //       avatar:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm4Cp0JO-s03hFKGZ2WgyO4luH1JSSzcB0ZA&s",
  //     },
  //     {
  //       name: "Hồng Mến",
  //       job: "Kinh doanh",
  //       comment:
  //         "Tôi mới mua một bộ trang phục từ cửa hàng của họ và cảm thấy hoàn toàn hài lòng. Chất liệu vải rất mềm mại và thoáng khí.",
  //       rating: 3,
  //       avatar:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm4Cp0JO-s03hFKGZ2WgyO4luH1JSSzcB0ZA&s",
  //     },
  //     {
  //       name: "Trần Minh",
  //       job: "Nhân viên văn phòng",
  //       comment: "Sản phẩm đẹp, giống hình, chất lượng tốt.",
  //       rating: 4,
  //       avatar:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm4Cp0JO-s03hFKGZ2WgyO4luH1JSSzcB0ZA&s",
  //     },
  //     {
  //       name: "Hồng Mến",
  //       job: "Kinh doanh",
  //       comment:
  //         "Tôi mới mua một bộ trang phục từ cửa hàng của họ và cảm thấy hoàn toàn hài lòng. Chất liệu vải rất mềm mại và thoáng khí.",
  //       rating: 3,
  //       avatar:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm4Cp0JO-s03hFKGZ2WgyO4luH1JSSzcB0ZA&s",
  //     },
  //     {
  //       name: "Trần Minh",
  //       job: "Nhân viên văn phòng",
  //       comment: "Sản phẩm đẹp, giống hình, chất lượng tốt.",
  //       rating: 4,
  //       avatar:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm4Cp0JO-s03hFKGZ2WgyO4luH1JSSzcB0ZA&s",
  //     },
  //   ],
  // };
  return (
    <>
      {!isLoading ? (
        <>
          <Layout>
            <TitleRouter title={product.name} />
            <div data-aos="fade-up" className="detail-product_info">
              <LeftSession product={product} />
              <RightSession product={product} />
            </div>
            <InformationDetail
              product={product}
              setIsShowAddComment={setIsShowAddComment}
              isShowAddComment={isShowAddComment}
            />
          </Layout>
          {isShowAddComment && (
            <div className="fixed inset-0 z-10 flex justify-center items-center">
              <div
                className="absolute inset-0 bg-black opacity-30"
                onClick={() => setIsShowAddComment(false)}
              ></div>
              <div className="relative z-20">
                <AddComment
                  setIsShowAddComment={setIsShowAddComment}
                  productId={productId}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="loadingOverlay">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
};

export default DetailProduct;
