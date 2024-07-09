"use client";

var solutionsData = {
    "sol1": {
        1: true,
        2: "param 2",
        3: "param 3",
        4: 500,
        5: true,
        6: "param 2",
        7: "param 3",
        8: 100,
        9: "param 4",
        10: true,
        11: "param 2",
        12: "param 3",
        13: "param 4",
        14: "param 3",
        15: "param 4",
    },
    "sol14": {
        1: true,
        2: "param 2",
        3: "param 3",
        4: 500,
        5: true,
        6: "param 2",
        7: "param 3",
        8: 100,
        9: "param 4",
        10: true,
        11: "param 2",
        12: "param 3",
        13: "param 4",
        14: "param 3",
        15: "param 4",
    },
    "sol13": {
        1: true,
        2: "param 2",
        3: "param 3",
        4: 500,
        5: true,
        6: "param 2",
        7: "param 3",
        8: 100,
        9: "param 4",
        10: true,
        11: "param 2",
        12: "param 3",
        13: "param 4",
        14: "param 3",
        15: "param 4",
    },
    "sol12": {
        1: true,
        2: "param 2",
        3: "param 3",
        4: 500,
        5: true,
        6: "param 2",
        7: "param 3",
        8: 100,
        9: "param 4",
        10: true,
        11: "param 2",
        12: "param 3",
        13: "param 4",
        14: "param 3",
        15: "param 4",
    },
    "sol11": {
        1: true,
        2: "param 2",
        3: "param 3",
        4: 500,
        5: true,
        6: "param 2",
        7: "param 3",
        8: 100,
        9: "param 4",
        10: true,
        11: "param 2",
        12: "param 3",
        13: "param 4",
        14: "param 3",
        15: "param 4",
    },
    "sol10": {
        1: true,
        2: "param 2",
        3: "param 3",
        4: 500,
        5: true,
        6: "param 2",
        7: "param 3",
        8: 100,
        9: "param 4",
        10: true,
        11: "param 2",
        12: "param 3",
        13: "param 4",
        14: "param 3",
        15: "param 4",
    },
    "sol9": {
        1: true,
        2: "param 2",
        3: "param 3",
        4: 500,
        5: true,
        6: "param 2",
        7: "param 3",
        8: 100,
        9: "param 4",
        10: true,
        11: "param 2",
        12: "param 3",
        13: "param 4",
        14: "param 3",
        15: "param 4",
    },
    "sol8": {
        1: true,
        2: "param 2",
        3: "param 3",
        4: 500,
        5: true,
        6: "param 2",
        7: "param 3",
        8: 100,
        9: "param 4",
        10: true,
        11: "param 2",
        12: "param 3",
        13: "param 4",
        14: "param 3",
        15: "param 4",
    }                
}

import { useEffect, useState } from "react";
import { FunnelIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import styles from "./SolutionFinder.module.css";
import { Layout } from "../templates/Layout";
import { ProjectList } from "../organisms/ProjectList";
import { Accordion } from "../organisms/Accordion";
import { useGlobalState } from "@/context/GlobalStateProvider";
import { useParameterFilter } from "@/app/hooks/useParameterFilter";
import ComparisonTable from "../organisms/ComparisonTable";
import TechStackSelection from "../organisms/TechStackSelection";
import { Stack, StackSubbcategories } from "@/app/types/constants";

const Home = () => {
    const {
      isLeftPanelOpen,
      setIsLeftPanelOpen,
      isRightPanelOpen,
      setIsRightPanelOpen,
      parameters,
    } = useGlobalState();
  
    const { selectedParameters, addParameter, removeParameter } = useParameterFilter();
    const [stage, setStage] = useState<"stack" | "stackCategory" | "projectDescription" | "comparison">("stack");
    const [stack, setStack] = useState<string>("");
    const [stackCategory, setStackCategory] = useState<string>("");
  
    const handleSubcategoryClick = (subcategoryId: number) => {
      if (selectedParameters.includes(subcategoryId)) {
        removeParameter(subcategoryId);
      } else {
        addParameter(subcategoryId);
      }
    };

    const handleStackSelection = (stack: string) => {
        setStage("stackCategory");
        setStack(stack);
    }

    const handleStackCategorySelection = (stack: string) => {
        setStage("comparison");
        setStackCategory(stack);
    }
  
    return (
      <Layout>
        <div className="relative flex h-screen w-full overflow-hidden">
          <div className={`flex flex-col bg-gray-900 text-gray-300 overflow-y-auto ${isLeftPanelOpen ? "w-1/5" : "w-0"}`}>
            {stage == "comparison" && (
                <button
                onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
                className="absolute top-4 left-4 bg-gray-900 p-2 rounded"
              >
                <BriefcaseIcon className="h-6 w-6 text-purple-500" />
              </button>
            )}
            <div className={`w-full p-4 mt-16 ${isLeftPanelOpen ? 'block' : 'hidden'}`}>
              <ProjectList />
            </div>
          </div>
          <div className={`flex-1 bg-gray-800 overflow-hidden ${isLeftPanelOpen ? 'transition-width duration-300' : ''}`}>
          {stage == "stack" && (
            <div className="flex flex-col items-center justify-center h-full">
                <TechStackSelection onSelect={handleStackSelection} items={Stack} label="Hello! What stack would you like to research today?"/>
            </div>           
          )}
           {stage == "stackCategory" && (
            <div className="flex flex-col items-center justify-center h-full">
                <TechStackSelection onSelect={handleStackCategorySelection} items={StackSubbcategories[stack as keyof typeof StackSubbcategories]} label={"Let's narrow down what aspect of " + stack.toLocaleLowerCase() + " are you interested in?"}/>
            </div>           
          )}
            <div className={`flex h-full items-center justify-center ${styles.tableContainer} ${stage === "comparison" ? styles.showTable : styles.hiddenTable}`}>
              <ComparisonTable solutionsData={solutionsData} activeParameters={selectedParameters} />
            </div>
          </div>
          <div className={`flex flex-col bg-gray-900 text-gray-300 overflow-y-auto ${isRightPanelOpen ? "w-1/5" : "w-0"} ${isRightPanelOpen ? 'transition-width duration-300' : ''}`}>
            {stage == "comparison" && (
                <button
                onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                className="absolute top-4 right-4 bg-gray-900 p-2 rounded"
              >
                <FunnelIcon className="h-6 w-6 text-purple-500" />
              </button>
            )}
            <div className={`w-full p-4 mt-16 ${isRightPanelOpen ? 'block' : 'hidden'}`}>
              <Accordion 
                panel="right" 
                data={parameters}
                selectedParameters={selectedParameters}
                onSubcategoryClick={handleSubcategoryClick} />
            </div>
          </div>
        </div>
      </Layout>
    );
  };
  
  export default Home;

