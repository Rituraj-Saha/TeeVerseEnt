import React from "react";
import styles from "./storeWrapper.module.css";
import StoreContent from "./storeContent/StoreContent";
import FilterContainer from "./filterStore/FilterContainer";
function StoreWrapper() {
  return (
    <div className={styles.parent}>
      <FilterContainer />
      <div
        style={{
          display: "flex",
          flex: 1,
        }}
      >
        <StoreContent />
      </div>
    </div>
  );
}

export default StoreWrapper;
