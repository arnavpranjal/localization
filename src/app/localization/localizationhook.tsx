"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const fetchRoleDisplayNames = async (
  setRoleDisplayNames: (value: Record<string, string>) => void
) => {
  try {
    const storedDisplayNames = localStorage.getItem("roleDisplayNames");

    if (storedDisplayNames) {
      setRoleDisplayNames(JSON.parse(storedDisplayNames));
      return;
    }
    const response = await axios.get(`http://localhost:3001/roles`);

    const displayNames: Record<string, string> = {};
    response.data.forEach(
      (role: { systemName: string; displayName: string }) => {
        displayNames[role.systemName] = role.displayName;
      }
    );
    setRoleDisplayNames(displayNames);
    localStorage.setItem("roleDisplayNames", JSON.stringify(displayNames));
    return;
  } catch (error) {
    console.log("error fetching data :");
  }
};

const fetchStageDisplayNames = async (
  setStageDisplayNames: (value: Record<string, string>) => void
) => {
  try {
    const storedDisplayNames = localStorage.getItem("stageDisplayNames");

    if (storedDisplayNames) {
      setStageDisplayNames(JSON.parse(storedDisplayNames));
      return;
    }
    const response = await axios.get(`http://localhost:3001/stages`);

    const displayNames: Record<string, string> = {};
    response.data.forEach(
      (stage: { systemName: string; displayName: string }) => {
        displayNames[stage.systemName] = stage.displayName;
      }
    );
    setStageDisplayNames(displayNames);
    localStorage.setItem("stageDisplayNames", JSON.stringify(displayNames));
    return;
  } catch (error) {
    console.log("error fetching data :");
  }
};

const useLocalization = () => {
  const [roleDisplayNames, setRoleDisplayNames] = useState<
    Record<string, string>
  >({});

  const [stageDisplayNames, setStageDisplayNames] = useState<
    Record<string, string>
  >({});
  useEffect(() => {
    fetchRoleDisplayNames(setRoleDisplayNames);
    fetchStageDisplayNames(setStageDisplayNames);
  }, []);
  const lr = useCallback(
    (inputString: string) => {
      const storedDisplayNames = localStorage.getItem("roleDisplayNames");

      if (storedDisplayNames) {
        const parsedDisplayNames = JSON.parse(storedDisplayNames);
        const displayName = parsedDisplayNames[inputString];

        if (displayName) {
          return displayName;
        } else {
          return "";
        }
      }
      const displayName = roleDisplayNames[inputString] || "";

      return displayName;
    },
    [roleDisplayNames]
  );

  const ls = useCallback(
    (inputString: string) => {
      const storedDisplayNames = localStorage.getItem("stageDisplayNames");

      if (storedDisplayNames) {
        const parsedDisplayNames = JSON.parse(storedDisplayNames);
        const displayName = parsedDisplayNames[inputString];

        if (displayName) {
          return displayName;
        } else {
          return "";
        }
      }
      const displayName = stageDisplayNames[inputString] || "";

      return displayName;
    },
    [stageDisplayNames]
  );

  return { lr, ls };
};

export default useLocalization;
