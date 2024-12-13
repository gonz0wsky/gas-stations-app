const parseStringToNumber = <T = number | null>(value: string): T => {
  const parsedValue = parseFloat(value.replace(',', '.'));

  return (isNaN(parsedValue) ? null : parsedValue) as T;
};

export default parseStringToNumber;
