export const shortnererFunction = (str) => {
  if (str) {
    return [
      str.substring(0, 4),
      str.substring(str.length - 5, str.length),
    ].join("...");
  }
  return str;
};
