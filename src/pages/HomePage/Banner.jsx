import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";

const Banner = () => {
  return (
    <div className="pt-10">
      <Carousel
       dynamicHeight={true}
       autoPlay={true}
       infiniteLoop={true}
       >
        <div className="h-10">
          <img src={img1} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img3} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
