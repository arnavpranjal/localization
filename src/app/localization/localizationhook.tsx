"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const fetchDisplayName = async (
  inputString: string,
  setDisplayName: (value: string) => void
) => {
  const response = await axios.get(
    `http://localhost:3001/roles/${inputString}`
  );

  setDisplayName(response.data.displayName);
  return;
};

const useLocalization = () => {
  const l = useCallback((inputString: string) => {
    const startTime = performance.now();
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
      fetchDisplayName(inputString, setDisplayName);
    }, []);

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(
      `Execution time for l function with inputString ${inputString}: ${executionTime} ms`
    );
    return displayName;
  }, []);

  return { l };
};

export default useLocalization;
