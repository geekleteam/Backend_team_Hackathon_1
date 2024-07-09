import React, { useState } from "react";
import styles from "./TechStackSelection.module.css";

interface TechStackSelectionProps {
  onSelect: (stack: string) => void;
  items: string[];
  label: string;
}

const TechStackSelection: React.FC<TechStackSelectionProps> = ({ onSelect, items, label }) => {
  const [selectedStack, setSelectedStack] = useState<string | null>(null);

  const handleStackClick = (stack: string) => {
    setSelectedStack(stack);
    setTimeout(() => onSelect(stack), 1000); // Delay to allow animation to complete
  };

  return (
    <div className={styles.greeting}>
    <div className={styles.question}>{label}</div>
    <div className={styles.buttonsContainer}>
      {items.map((stack: string) => (
        <button
          key={stack}
          className={`${styles.button} m-4 p-6 rounded-lg transition duration-300`}
          onClick={() => handleStackClick(stack)}
          style={{ backgroundColor: 'rgba(0, 204, 204, 0.2)' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(173, 216, 230, 0.2)')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 204, 204, 0.2)')}
        >
          {stack}
        </button>
      ))}
    </div>
  </div>
  );
};

export default TechStackSelection;
