import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";

const Banner = () => {
  return (
    <div className="pt-10">
      <Carousel className="h-10">
        <div>
          <img src={img1} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img2} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
