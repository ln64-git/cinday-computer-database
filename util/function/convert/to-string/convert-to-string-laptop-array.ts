const convertToStringLaptopArray = (laptopArray: any) => {
  const convertedArray = laptopArray.map(laptop => {
    if (laptop.date_created instanceof Date) {
      laptop.date_created = laptop.date_created.toISOString(); // Convert Date to string
    }
    if (laptop.date_modified instanceof Date) {
      laptop.date_modified = laptop.date_modified.toISOString(); // Convert Date to string
    }
    return laptop;
  });
  return convertedArray;
};
export default convertToStringLaptopArray