import React, { useEffect } from "react";

export const useTimer = (ms: number): [number, React.Dispatch<React.SetStateAction<number>>] => {
  const [tick, setTick] = React.useState(ms);

  useEffect(() => {
    const redrawInterval = setInterval(() => {
      setTick((t) => t + 1000);
    }, 1000);

    return () => {
      clearInterval(redrawInterval);
    };
  }, [ms]);

  return [tick, setTick];
};
