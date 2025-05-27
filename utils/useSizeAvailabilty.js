import { useState, useMemo } from "react";

// Simulate or import your matrix (if it's global or context-based, use accordingly)
import { PRODUCT_AVAILABILITY_MATRIX } from "app/src/assets/payload/ProductAvailabilityChecker"; // adjust the path

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
