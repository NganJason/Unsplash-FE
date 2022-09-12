import React, { useState, useEffect } from "react";

import { useWindowDimensions } from "../useWindowDimensions";

export const useGridColumns = () => {
  const { width } = useWindowDimensions();
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    if (width <= 600) {
      setColumns(1);
    } else if (width <= 900) {
      setColumns(2);
    } else {
      setColumns(3);
    }
  }, [width]);

  return { columns };
};
