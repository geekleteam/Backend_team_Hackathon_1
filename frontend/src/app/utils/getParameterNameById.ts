interface CategoryData {
    [category: string]: {
      [paramId: number]: string;
    };
  }
  
  export const getParameterNameById = (data: CategoryData, paramId: number): string | null => {
    for (const category in data) {
      if (data[category].hasOwnProperty(paramId)) {
        return data[category][paramId];
      }
    }
    return null;
  };
  