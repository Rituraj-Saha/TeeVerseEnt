import React, { useState } from "react";
import styles from "./filterContainer.module.css";
import { Checkbox, Slider } from "@mui/material";
const FilterContainer = () => {
  const FilterList = {
    Gender: ["Male", "Female"],
    Agegroup: ["Adult", "Childern"],
    Price: {
      max: 8000,
      min: 250,
    },
    Size: ["small", "medium", "large"],
  };
  const [checkedItems, setCheckedItems] = useState({});
  const [priceRange, setPriceRange] = useState([
    FilterList.Price.min,
    FilterList.Price.max,
  ]);

  const handleCheckboxChange = (category, value) => {
    setCheckedItems((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [value]: !prev[category]?.[value],
      },
    }));
  };
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  const valuetext = (value) => `₹${value}`;
  React.useEffect(() => {
    console.log(checkedItems);
  }, [checkedItems]);
  return (
    <div className={styles.parent}>
      <span className={styles.filterTxtStyle}>Filter</span>
      {Object.keys(FilterList).map((xitem, idx) => {
        return (
          <div key={idx} className={styles.filterContent}>
            <span>{xitem}</span>

            {Array.isArray(FilterList[xitem]) ? (
              <div>
                {FilterList[xitem].map((mItem, mIdx) => {
                  return (
                    <div key={mIdx}>
                      <Checkbox
                        checked={!!checkedItems[xitem]?.[mItem]}
                        onChange={() => handleCheckboxChange(xitem, mItem)}
                        sx={{
                          "&.Mui-checked": {
                            color: "green",
                          },
                        }}
                      />
                      <span>{mItem}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ width: "85%" }}>
                <strong>
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </strong>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  min={FilterList.Price.min}
                  max={FilterList.Price.max}
                  step={50}
                  marks={[
                    {
                      value: FilterList.Price.min,
                      label: `₹${FilterList.Price.min}`,
                    },
                    {
                      value: FilterList.Price.max,
                      label: `₹${FilterList.Price.max}`,
                    },
                  ]}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilterContainer;
