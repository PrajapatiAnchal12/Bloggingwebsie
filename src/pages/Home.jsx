import React from "react";
import MainLayout from "../layouts/MainLayout";
import Banner from "../components/Banner/Banner";
import LatestNews from "../components/LatestNews/LatestNews";
import TechnologyNews from "../components/TechnologyNews/TechnologyNews";
import LifestyleNews from "../components/LifestyleNews/LifestyleNews";
import Sidebar from "../components/Sidebar/Sidebar";
import BottomHighlights from "../components/BottomHighlights/BottomHighlights";
import MoreNews from "../components/MoreNews/MoreNews";
import "./home.css";

const Home = () => {
  return (
    <MainLayout>
      <Banner />
      <LatestNews />
      
      {/* NAYA MAIN CONTENT AREA JISME LEFT/RIGHT BAATA GAYA HAI */}
      <div className="container home-content-area">
        {/* LEFT COLUMN: Main News Area */}
        <div className="home-main-col">
           <TechnologyNews />
           <LifestyleNews />
        </div>

        {/* RIGHT COLUMN: Sidebar Area */}
        <div className="home-sidebar-col">
           <Sidebar />
        </div>
      </div>

      {/* 3 COLUMN HIGHLIGHTS */}
      <BottomHighlights />

      {/* VIEW MORE NEWS & REVIEWS SECTION - SABSE LAST MAIN FOOTER SE PEHLE */}
      <MoreNews />
      
    </MainLayout>
  );
};

export default Home;