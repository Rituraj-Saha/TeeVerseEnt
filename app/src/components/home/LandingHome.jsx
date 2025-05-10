import React from "react";
import styles from "./landingHome.module.css";
import Hero from "./heroSection/Hero";
import ContentWrapper from "./content/ContentWrapper";
import Vision from "./vision/Vision";
import Testimonial from "./testimonial/Testimonial";
import Faq from "./content/faq/Faq";
import GrainyGradiant from "../../reusableComponent/backgroundGrainyGrad/GrainyGradiant";
const LandingHome = () => {
  return (
    <div className={styles.parent}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <GrainyGradiant>
          <Hero />
        </GrainyGradiant>
        <ContentWrapper />
      </div>

      <Vision />
      <Testimonial />
      <Faq />
    </div>
  );
};

export default LandingHome;
