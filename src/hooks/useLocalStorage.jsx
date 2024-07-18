import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  // State untuk menyimpan nilai kita
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Mendapatkan dari local storage berdasarkan key
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        // Mengurai JSON yang tersimpan atau jika tidak ada mengembalikan initialValue
        return item ? JSON.parse(item) : initialValue;
      } else {
        return initialValue;
      }
    } catch (error) {
      // Jika ada error juga mengembalikan initialValue
      console.log(error);
      return initialValue;
    }
  });

  // useEffect untuk memperbarui local storage saat state berubah
  useEffect(() => {
    try {
      const valueToStore = storedValue instanceof Function ? storedValue(storedValue) : storedValue;
      // Menyimpan state
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
