const getLocalValue = <T,>(key: string, initValue: T): T => {
  const localValue = localStorage.getItem(key) ?? null;

  if (localValue) {
    return JSON.parse(localValue);
  }

  return initValue;
};

const useLocalStorage = <T,>(
  key: string,
  initValue: T
): [T, (newValue: T) => void] => {
  const setValue = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    value = newValue;
  };
  let value = getLocalValue(key, initValue);
  if (!value) {
    setValue(getLocalValue(key, initValue));
  }
  return [value, setValue];
};

export default useLocalStorage;
