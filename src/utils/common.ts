export const isNumeric = (str: string) => {
  if (typeof str != "string") return false;
  return !isNaN(+str) && !isNaN(parseFloat(str));
};
