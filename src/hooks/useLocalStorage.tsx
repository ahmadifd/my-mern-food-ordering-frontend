import { useEffect, useState } from "react";

const getLocalValue = <T,>(key: string, initValue: T): T => {
  const localValue  = localStorage.getItem(key) ?? null;

  if (localValue) {
    return JSON.parse(localValue);
  }

  return initValue;
};

const useLocalStorage = <T,>(
  key: string,
  initValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => getLocalValue(key, initValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
