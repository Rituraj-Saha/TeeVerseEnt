import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./testimonial.module.css";
import HeaderText from "../../../reusableComponent/headerText/HeaderText";
import useIsMobile from "app/src/customhook/useIsMobile";

const TestimonialItems = (props) => {
  const { review, name, image } = props;
  return (
    <div className={styles.testimonialDiv}>
      <span>{review}</span>
      <div className={styles.testimonialSeperator}></div>
      <div style={{ display: "flex" }}>
        <img></img>
        <span>{name}</span>
      </div>
    </div>
  );
};
const Testimonial = () => {
  const testimonials = [
    {
      review: "Great produt, Worth buying it again.",
      name: "annonymus",
      image: "",
    },
    {
      review: "Great produt, Worth buying it again.",
      name: "annonymus",
      image: "",
    },
    {
      review: "Great produt, Worth buying it again.",
      name: "annonymus",
      image: "",
    },
    {
      review: "Great produt, Worth buying it again.",
      name: "annonymus",
      image: "",
    },
  ];
  const isMobile = useIsMobile();
  return (
    <div className={styles.parent}>
      <HeaderText textMsg={"Testimonial"} />
      <div
        style={{
          height: "70%",
          width: "100%",
          paddingRight: isMobile ? "10px" : "50px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Swiper
          spaceBetween={150}
          slidesPerView={isMobile ? 1 : 3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {testimonials.map((item, idx) => {
            return (
              <SwiperSlide>
                <TestimonialItems
                  name={item.name}
                  review={item.review}
                  image={item.image}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
