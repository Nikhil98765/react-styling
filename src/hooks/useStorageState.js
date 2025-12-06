import { useEffect, useState, useRef } from "react";

// custom hook
export const useStorageState = (key, initialState) => {
  const isMounted = useRef(false);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem(key) ?? initialState);

  // Performs side effects
  useEffect(() => {
    // Don't run on first render
    if(!isMounted.current) {
      isMounted.current = true;
    } else {
      console.log("useStorageState ~ searchTerm:", searchTerm);
      localStorage.setItem(key, searchTerm);
    }

  }, [key, searchTerm]);

  return [searchTerm, setSearchTerm];

}
