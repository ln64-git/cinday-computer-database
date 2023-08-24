const convertToDateLaptopArray = (convertedArray) => {
  const restoredArray = convertedArray.map(laptop => {
    if (typeof laptop.date_created === 'string') {
      return { ...laptop, date_created: new Date(laptop.date_created) }; // Create new object with converted date
    }
    if (typeof laptop.date_modified === 'string') {
      return { ...laptop, date_modified: new Date(laptop.date_modified) }; // Create new object with converted date
    }
    return laptop;
  });
  return restoredArray;
};
export default convertToDateLaptopArray