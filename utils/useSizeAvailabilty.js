import { useState, useMemo } from "react";

import { PRODUCT_AVAILABILITY_MATRIX } from "app/src/assets/payload/ProductAvailabilityChecker";

export const useSizeAvailability = (productId) => {
  const product = PRODUCT_AVAILABILITY_MATRIX.find((p) => p.id === productId);
  const sizeAvailability = useMemo(() => {
    if (!product) return [];
    return product.availability.filter((item) => Number(item.available) > 0);
  }, [product]);

  const [selectedSize, setSelectedSize] = useState(
    sizeAvailability?.[0]?.size || null
  );

  const getMaxStock = useMemo(() => {
    return (size) => {
      const item = sizeAvailability.find((a) => a.size === size);
      return item ? Number(item.available) : 0;
    };
  }, [sizeAvailability]);

  return {
    sizeAvailability,
    selectedSize,
    setSelectedSize,
    getMaxStock,
  };
};
