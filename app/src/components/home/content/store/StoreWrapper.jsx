import React from "react";
import styles from "./storeWrapper.module.css";
import StoreContent from "./storeContent/StoreContent";
import FilterContainer from "./filterStore/FilterContainer";
import useIsMobile from "app/src/customhook/useIsMobile";
function StoreWrapper() {
  const isMobile = useIsMobile();
  return (
    <div className={styles.parent}>
      {!isMobile && <FilterContainer />}
      <div
        style={{
          display: "flex",
          flex: 1,
        }}
      >
        <StoreContent numColumns={isMobile ? 1 : 3} />
      </div>
    </div>
  );
}

export default StoreWrapper;
