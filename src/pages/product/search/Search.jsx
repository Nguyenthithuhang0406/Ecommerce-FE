/* eslint-disable */
import Layout from '@/components/commons/layout/Layout';
import TitleRouter from '@/components/product/titleRouter/TitleRouter';
import SearchContainer from '@/components/search/searchContainer/SearchContainer';
import React from 'react';
import { useSelector } from "react-redux";

const Search = () => {
  const image = useSelector((state) => state.search.inputImage);

  return (
    <div>
      <Layout>
        <TitleRouter title={`${image ? "Sản phẩm tương tự" : "Tìm kiếm"}`} />
        <SearchContainer image={image} />
      </Layout>
    </div>
  );
}

export default Search;
