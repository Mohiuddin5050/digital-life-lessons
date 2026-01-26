import React from "react";
import Banner from "./Banner";
import WhyLifeMatters from "./WhyLifeMatters";
import FeaturedLesson from "./FeaturedLesson";
import TopContributors from "./TopContributors";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedLesson />
      <WhyLifeMatters />
      <TopContributors/>
    </div>
  );
};

export default Home;
