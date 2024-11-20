// src/pages/HomePage.tsx
import React from "react";
import Sidebar from "../../components/Sidebar";
import { PostsFeed } from "../PostsFeed/PostsFeed";
import "@/pages/HomePage/HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="grid home-page-container grid-cols-10 gap-5">
      <div className="col-span-3"></div>
      <PostsFeed />
      <div className="col-span-3 flex justify-end pb-8 me-8">
        <Sidebar />
      </div>
    </div>
  );
};

export default HomePage;
