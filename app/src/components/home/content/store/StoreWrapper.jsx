import React from "react";
import styles from "./storeWrapper.module.css";
import StoreContent from "./storeContent/StoreContent";
import FilterContainer from "./filterStore/FilterContainer";
import useIsMobile from "app/src/customhook/useIsMobile";
import SmartPagination from "./SmartPagination";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
function StoreWrapper() {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 10;
  const [showFilter, setShowFilter] = React.useState(isMobile ? false : true);
  const handlePageChange = (page) => {
    console.log("Page clicked:", page);
    setCurrentPage(page);
    // call your API with offset = (page - 1) * pageSize
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const containerRef = React.useRef(null);
  return (
    <div className={styles.parent} ref={containerRef}>
      {showFilter && <FilterContainer />}
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StoreContent numColumns={isMobile ? 1 : 3} currentPage={currentPage} />
        <SmartPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {isMobile && (
        <div
          style={{
            position: "absolute",
            left: "5px",
            border: "1px solid black",
            zIndex: 9,
          }}
          onClick={() => {
            setShowFilter(!showFilter);
          }}
        >
          <FilterAltIcon />
        </div>
      )}
    </div>
  );
}

export default StoreWrapper;
