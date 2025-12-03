import { useEffect, useState } from "react";

// custom hook
export const useStorageState = (key, initialState) => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem(key) ?? initialState);

  // Performs side effects
  useEffect(() => {
    localStorage.setItem(key, searchTerm);
  }, [key, searchTerm]);

  return [searchTerm, setSearchTerm];

}