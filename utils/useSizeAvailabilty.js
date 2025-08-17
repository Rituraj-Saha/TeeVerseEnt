import { useState, useMemo, useEffect } from "react";

export const useSizeAvailability = (sizes = []) => {
  // Only keep sizes with stock > 0
  const sizeAvailability = useMemo(() => {
    return sizes.filter((s) => Number(s.stock) > 0);
  }, [sizes]);

  // Selected size state
  const [selectedSize, setSelectedSize] = useState(null);

  // Auto select first available size if none selected
  useEffect(() => {
    if (sizeAvailability.length > 0 && !selectedSize) {
      setSelectedSize(sizeAvailability[0].size);
    }
  }, [sizeAvailability, selectedSize]);

  // Get stock for a given size
  const getMaxStock = useMemo(() => {
    return (size) => {
      const item = sizeAvailability.find((s) => s.size === size);
      return item ? Number(item.stock) : 0;
    };
  }, [sizeAvailability]);

  // Get additional price for a given size
  const getAdditionalPrice = useMemo(() => {
    return (size) => {
      const item = sizeAvailability.find((s) => s.size === size);
      return item ? Number(item.additional_price) : 0;
    };
  }, [sizeAvailability]);

  return {
    sizeAvailability,
    selectedSize,
    setSelectedSize,
    getMaxStock,
    getAdditionalPrice,
  };
};
