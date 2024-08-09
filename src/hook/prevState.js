import { useRef, useEffect } from "react";

const usePrevState = (currentState) => {
  const ref = useRef();
  const prevTerm = ref.current;

  useEffect(() => {
    ref.current = currentState;
  }, [currentState]);

  return prevTerm;
};

export default usePrevState;
