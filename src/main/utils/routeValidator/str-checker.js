const startsWithAny = (str, strArray) => {
   const index = strArray.findIndex((elem) => str.startsWith(elem));
   return index !== -1;
};

export { startsWithAny };
