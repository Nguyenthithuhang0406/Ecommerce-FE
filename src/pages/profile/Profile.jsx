/* eslint-disable*/
import Layout from "@/components/commons/layout/Layout";
import Infomation from "@/components/profile/information/Infomation";
import Ordered from "@/components/profile/ordered/Ordered";
import React from "react";

import "./Profile.scss";
const Profile = () => {
  return (
    <Layout>
      <div className="profile">
        <Infomation />
        <Ordered />
      </div>
    </Layout>
  );
};

export default Profile;
