import React from "react";
import Banner from "./Banner";
import WhyLifeMatters from "./WhyLifeMatters";
import FeaturedLesson from "./FeaturedLesson";
import TopContributors from "./TopContributors";
import MostSavedLessons from "./MostSavedLessons";
import Container from "../../components/Container";

const Home = () => {
  return (
   <Container>
     <div>
      <Banner />
      <FeaturedLesson />
      <WhyLifeMatters />
      <TopContributors/>
      <MostSavedLessons />
    </div>
   </Container>
  );
};

export default Home;
