import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./testimonial.module.css";
import HeaderText from "../../../reusableComponent/headerText/HeaderText";

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
  return (
    <div className={styles.parent}>
      {/* <div
        style={{
          display: "block",
          // border: "1px solid black",
          width: "20%",
          flexDirection: "column",
        }}
      >
        <div
          style={{ border: "1px solid black", height: "1px", width: "25px" }}
        ></div>
        <span className={styles.boldTextHeader}>Testimonials</span>
        <div
          style={{
            position: "relative",
            border: "1px solid black",
            height: "1px",
            width: "25px",
            left: "50%",
          }}
        ></div>
      </div> */}
      <HeaderText textMsg={"Testimonial"} />
      <div style={{ height: "70%", width: "100%", paddingRight: "50px" }}>
        <Swiper
          spaceBetween={150}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {/* <SwiperSlide>
            <div
              style={{
                width: "30vw",
                height: "30vh",
                background: "blue",
                margin: "50px",
              }}
            >
              abc
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{
                width: "30vw",
                height: "30vh",
                background: "blue",
                margin: "50px",
              }}
            >
              abc
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{
                width: "30vw",
                height: "30vh",
                background: "blue",
                margin: "50px",
              }}
            >
              abc
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{
                width: "30vw",
                height: "30vh",
                background: "blue",
                margin: "50px",
              }}
            >
              abc
            </div>
          </SwiperSlide> */}
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
