"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface GlobalStateContextProps {
  isLeftPanelOpen: boolean;
  setIsLeftPanelOpen: (open: boolean) => void;
  isRightPanelOpen: boolean;
  setIsRightPanelOpen: (open: boolean) => void;
  currentProject: string;
  setCurrentProject: (content: string) => void;
  parameters: {[category:string]: {[paramId: number]: string}};
  setParameters: (content: {[category:string]: {[paramId: number]: string}}) => void;
}

const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(undefined);
var mockparams = {
    "category1": {
        1: "p1",
        2: "p2",
        3: "p3"
    },
    "category2": {
        4: "p4",
        5: "p5",
        6: "p6"
    },
    "category3": {
        7: "p7",
        8: "p8",
        9: "p9"
    },
    "category4": {
        10: "p10",
        11: "p11",
        12: "p12"
    },
    "category5": {
        13: "p13",
        14: "p14",
        15: "p15"
    },
    "category6": {
        16: "p16",
        17: "p17",
        18: "p18"
    }
}

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState("Default Content");
  const [parameters, setParameters] = useState<{[group: string]: {[paramId: number]: string}}>(mockparams);

  const fetchParameters = async () => {
    try {
      // Replace with real endpoint. It's hardcoded for now.
    //   const response = await fetch("https://api.example.com/data");
    //   const data = await response.json();

      //setParameters(data.parameters);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchParameters();
  }, []);

  const divStyle = {
    width: '100% !important'
  };

  return (
    <>
        <GlobalStateContext.Provider
        value={{
        isLeftPanelOpen,
        setIsLeftPanelOpen,
        isRightPanelOpen,
        setIsRightPanelOpen,
        currentProject,
        setCurrentProject,
        parameters, 
        setParameters
      }}
    >
      {children}
    </GlobalStateContext.Provider>
    </>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
