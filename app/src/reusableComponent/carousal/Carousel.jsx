import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./carousel.css";

const Carousel = ({
  items,
  autoScrollInterval = 4000,
  gidearrowVisibility = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(1); // Start from Slide 2
  const [autoScroll, setAutoScroll] = useState(true);
  const numItems = items.length;

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const swipeThreshold = 50;

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % numItems);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + numItems) % numItems);
  };

  useEffect(() => {
    if (!autoScroll) return;
    const interval = setInterval(next, autoScrollInterval);
    return () => clearInterval(interval);
  }, [autoScroll, autoScrollInterval]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > swipeThreshold) next();
    else if (distance < -swipeThreshold) prev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getIndices = () => {
    const prevIndex = (activeIndex - 1 + numItems) % numItems;
    const nextIndex = (activeIndex + 1) % numItems;
    return { prevIndex, activeIndex, nextIndex };
  };

  // return (
  //   <div className="relative w-full overflow-hidden px-5 box-border">
  //     <div
  //       className="flex justify-center items-center w-full h-80 relative"
  //       onTouchStart={handleTouchStart}
  //       onTouchMove={handleTouchMove}
  //       onTouchEnd={handleTouchEnd}
  //     >
  //       {items.map((item, index) => {
  //         const {
  //           prevIndex,
  //           activeIndex: centerIndex,
  //           nextIndex,
  //         } = getIndices();

  //         let scale = 0.85;
  //         let opacity = 0;
  //         let y = 20;
  //         let xOffset = 0;
  //         let zIndex = 0;
  //         let widthClass = "w-[0%]";

  //         if (index === centerIndex) {
  //           scale = 1;
  //           opacity = 1;
  //           y = 0;
  //           xOffset = 0;
  //           zIndex = 30;
  //           widthClass = "w-[70%]";
  //         } else if (index === prevIndex) {
  //           scale = 0.9;
  //           opacity = 0.7;
  //           y = 10;
  //           xOffset = "-20%";
  //           zIndex = 20;
  //           widthClass = "w-[15%]";
  //         } else if (index === nextIndex) {
  //           scale = 0.9;
  //           opacity = 0.7;
  //           y = 10;
  //           xOffset = "20%";
  //           zIndex = 20;
  //           widthClass = "w-[15%]";
  //         }

  //         return (
  //           <motion.div
  //             key={index}
  //             className={`absolute ${widthClass} h-full flex justify-center items-center`}
  //             animate={{ scale, opacity, y, x: xOffset }}
  //             transition={{ type: "spring", stiffness: 300, damping: 30 }}
  //             style={{ zIndex }}
  //           >
  //             <div className="w-full h-full flex justify-center items-center">
  //               {item}
  //             </div>
  //           </motion.div>
  //         );
  //       })}
  //     </div>

  //     {/* Navigation Buttons */}
  //     <button
  //       onClick={prev}
  //       className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow z-40"
  //     >
  //       ◀
  //     </button>
  //     <button
  //       onClick={next}
  //       className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow z-40"
  //     >
  //       ▶
  //     </button>

  //     {/* Auto-scroll toggle */}
  //     <div className="text-center mt-4">
  //       <button
  //         onClick={() => setAutoScroll(!autoScroll)}
  //         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  //       >
  //         {autoScroll ? "Pause Auto-scroll" : "Resume Auto-scroll"}
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="carousel-container">
      <div
        className="carousel-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => {
          const {
            prevIndex,
            activeIndex: centerIndex,
            nextIndex,
          } = getIndices();

          let scale = 0.85;
          let opacity = 0;
          let y = 20;
          let xOffset = 0;
          let zIndex = 0;
          let width = "0%";
          let filter = "blur(0px)";

          if (index === centerIndex) {
            scale = 1;
            opacity = 1;
            y = 0;
            xOffset = 0;
            zIndex = 30;
            width = "70%";
            filter = "blur(0px)";
          } else if (index === prevIndex) {
            scale = 0.9;
            opacity = 0.7;
            y = 10;
            xOffset = "-20%";
            zIndex = 20;
            width = "100%";
            filter = "blur(5px)";
          } else if (index === nextIndex) {
            scale = 0.9;
            opacity = 0.7;
            y = 10;
            xOffset = "20%";
            zIndex = 20;
            width = "100%";
            filter = "blur(5px)";
          }

          return (
            <motion.div
              key={index}
              className="carousel-slide"
              animate={{ scale, opacity, y, x: xOffset }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ zIndex, width, filter }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(event, info) => {
                if (info.offset.x < -50) next(); // swipe left
                else if (info.offset.x > 50) prev(); // swipe right
              }}
            >
              <div className="carousel-slide-inner">{item}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      {gidearrowVisibility && (
        <>
          <button onClick={prev} className="carousel-button left">
            ◀
          </button>
          <button onClick={next} className="carousel-button right">
            ▶
          </button>
        </>
      )}
      <div className="carousel-dots">
        {items.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* Auto-scroll toggle */}
      {/* <div className="carousel-autoscroll-container">
        <button
          onClick={() => setAutoScroll(!autoScroll)}
          className="carousel-autoscroll-button"
        >
          {autoScroll ? "Pause Auto-scroll" : "Resume Auto-scroll"}
        </button>
      </div> */}
    </div>
  );
};
const CaroualImpl = (props) => {
  const { items } = props;
  return <Carousel items={items} autoScrollInterval={800000} />;
};
export default CaroualImpl;
