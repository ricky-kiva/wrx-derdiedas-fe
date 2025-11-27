interface TempInputHandlerOptions {
  min?: number;
  max?: number;
  key?: string;
}

export const createTempInputHandler = <T extends string | number>(
  setRealValue: (v: T) => void,
  setTempValue: (v: T) => void,
  options: TempInputHandlerOptions={}
) => {
  const { min=(-Infinity), max=(Infinity), key } = options;

  return (e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    if (key && 'key' in e && e.key !== key) return;

    const raw = (e.target as HTMLInputElement).value;

    if (raw === "") {
      setTempValue("" as T);
      return;
    }
    
    const num = Number(raw);
    
    if (!isNaN(num)) {
      const clamped = Math.min(Math.max(num, min), max);
      setRealValue(clamped as T);
      setTempValue(clamped as T);
      return;
    }

    setRealValue(raw as T);
    setTempValue(raw as T);
  };
};
