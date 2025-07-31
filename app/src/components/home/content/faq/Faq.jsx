import React from "react";
import styles from "./faq.module.css";
import HeaderText from "../../../../reusableComponent/headerText/HeaderText";
import SvgStringRenderer from "../../../../reusableComponent/SvgReusableRenderer";
import { chevronDown, chevronUP } from "../../../../assets/svgAssets";
import useIsMobile from "app/src/customhook/useIsMobile";
const faqData = [
  {
    question: "What is the return policy",
    answer:
      "Our return policy offers a 30 day return window from the date of purchase. To be eligible for a return, the item must be in its original condition, including original packaging and attached tags. We provide options for a full refund, exchange for a different product, or store credit. Please note that certain items, such as final sale or discounted goods, are not eligible for return or exchange. To initiate a return, simply reply to your order confirmation email with your request. Restocking fees may apply to specific returns, and any such fees will be communicated to you during the return process. Return shipping costs are covered by us, and we will provide you with a prepaid shipping label. Once we receive your returned item, refunds will be processed within 30 business days.",
  },
  {
    question: "How do I know what size to order?",
    answer:
      "We understand that finding the right fit online can be tricky! We provide a detailed size chart on each product page, which includes measurements for different sizes. We highly recommend checking this chart before placing your order. You can also find helpful fit notes within the product description, such as 'runs true to size' or 'may fit slightly small.' If you're still unsure, our customer support team is happy to assist you with sizing recommendations. Feel free to reach out with your measurements, and we'll do our best to guide you.",
  },
  {
    question:
      "What are the shipping options and how long will it take to receive my order?",
    answer:
      "We offer several shipping options to meet your needs, including standard and expedited shipping. The available options and their associated costs will be displayed at checkout. Delivery times vary depending on your location and the shipping method selected. Typically, standard shipping within [mention region, e.g., India] takes [X] to [Y] business days. You will receive a shipping confirmation email with a tracking number once your order has been dispatched, allowing you to monitor its progress. For more detailed information, please refer to our Shipping Policy page within the app",
  },
  {
    question: " How do I care for my new fashion items?",
    answer:
      "To ensure the longevity and maintain the quality of your garments, we recommend following the care instructions provided on the garment's label. These instructions typically include information on washing, drying, and ironing. In general, we advise washing delicate items on a gentle cycle with similar colors and avoiding high heat when drying. Some items may require hand washing or dry cleaning. If you have specific questions about caring for a particular item, please don't hesitate to contact our customer support team, and we'll do our best to provide guidance.",
  },
];
const FaqItemContainer = (props) => {
  const { question, answer } = props;
  const [show, setShow] = React.useState(false);
  return (
    <div className={styles.faqItemContainer}>
      <div className={styles.faqItemContainerQuestion}>
        <span className={styles.faqQuestionText}>{question}</span>
        <div
          onClick={() => {
            setShow(!show);
          }}
          className={styles.faqItemContainerSvgWrapper}
        >
          <SvgStringRenderer svgString={show ? chevronUP : chevronDown} />
        </div>
      </div>
      {show && (
        <div className={styles.faqItemContainerAnswer}>
          <span>{answer}</span>
        </div>
      )}
    </div>
  );
};
const Faq = () => {
  const ismobile = useIsMobile();
  return (
    <div className={styles.parent}>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flex: 0.9,
        }}
      >
        <HeaderText textMsg={"Frequently Asked Question"} />
      </div>

      <div
        style={{
          display: "flex",
          flex: 0.9,
          width: "100%",
          flexDirection: ismobile ? "column" : "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 0.5,
            flexDirection: "column",
            minHeight: "50vh",
            paddingInline: "5%",
          }}
        >
          {faqData.map((item, idx) => {
            return (
              <FaqItemContainer
                question={item.question}
                answer={item.answer}
                key={idx}
              />
            );
          })}
        </div>
        <div
        // style={{
        //   display: "flex",
        //   flex: 0.9,
        //   width: "100%",
        //   border: "1px solid black",
        // }}
        ></div>
      </div>
    </div>
  );
};

export default Faq;
