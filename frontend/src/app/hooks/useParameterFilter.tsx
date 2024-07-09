import { useState } from "react";

export const useParameterFilter = () => {
  const [selectedParameters, setSelectedParameters] = useState<number[]>([]);

  const addParameter = (parameter: number) => {
    setSelectedParameters((prev) => [...prev, parameter]);
  };

  const removeParameter = (parameter: number) => {
    setSelectedParameters((prev) => prev.filter((p) => p !== parameter));
  };

  return {
    selectedParameters,
    addParameter,
    removeParameter
  };
};
