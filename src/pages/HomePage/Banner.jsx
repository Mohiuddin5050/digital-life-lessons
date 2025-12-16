import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Container from "../../components/Container";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSlider = () => {
  return (
    <Container>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000 }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full h-[80vh]"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="hero h-full"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-4xl font-bold">
                  Capture Your Life Lessons
                </h1>
                <p className="mb-5">
                  Preserve meaningful experiences, reflections, and wisdom you
                  gain throughout life.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="hero h-full"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1494173853739-c21f58b16055)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-4xl font-bold">
                  Learn From Others’ Experiences
                </h1>
                <p className="mb-5">
                  Explore public life lessons shared by people from around the
                  world.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="hero h-full"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1529333166437-7750a6dd5a70)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-4xl font-bold">
                  Grow Personally, Mindfully
                </h1>
                <p className="mb-5">
                  Reflect, organize, and track your personal growth journey in
                  one place.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default HeroSlider;
