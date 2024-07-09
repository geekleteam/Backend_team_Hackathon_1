import React, { useState, FC, useEffect } from "react";
import styles from "./Accordion.module.css";
import { useParameterFilter } from "@/app/hooks/useParameterFilter";
import { getParameterNameById } from "@/app/utils/getParameterNameById";

interface AccordionProps {
  panel: string;
  data: {
    [category: string]: {
      [paramId: number]: string;
    },
  }
  onSubcategoryClick?: (subcategory: number) => void;
  selectedParameters: number[];
}

export const Accordion: FC<AccordionProps> = ({ panel, data, onSubcategoryClick, selectedParameters }) => {
  const [openCategories, setOpenCategories] = useState<number[]>([]);

  useEffect(() => {
    // Open categories that have any selected parameters
    const openCategoryIndices = Object.keys(data).reduce((indices, categoryName, index) => {
      const categoryParams = Object.keys(data[categoryName]).map(Number);
      if (categoryParams.some((paramId) => selectedParameters.includes(paramId))) {
        indices.push(index + 1);
      }
      return indices;
    }, [] as number[]);
    setOpenCategories(openCategoryIndices);
  }, [selectedParameters, data]);

  const handleOpen = (value: number) => {
    setOpenCategories((prev) => {
      if (prev.includes(value)) {
        return prev.filter((index) => index !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSubcategoryClick = (subcategoryId: number) => {
    if (onSubcategoryClick) {
      onSubcategoryClick(subcategoryId);
    }
  };

  return (
    <>
      {Object.keys(data).map((categoryName, index) => (
        <div key={index} className={`accordion ${openCategories.includes(index + 1) ? styles.accordionOpen : ''}`}>
          <div onClick={() => handleOpen(index + 1)} className={styles.Maccordion__accordion_header}>
            {categoryName}
          </div>
          <div className={`${styles.Maccordion__accordion_body} ${openCategories.includes(index + 1) ? 'block' : 'hidden'}`}>
            {Object.keys(data[categoryName]).map(p => +p).map((paramId) => (
              <div
                key={paramId}
                onClick={() => handleSubcategoryClick(paramId)}
                className={`${styles.Maccordion__subcategory} ${selectedParameters.includes(paramId) ? styles.Maccordion__subcategory_selected : ''}`}
              >
                {getParameterNameById(data, paramId)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
