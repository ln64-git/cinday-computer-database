const convertToDateLaptopData = (input: any) => {
  if (!Array.isArray(input)) {
    const laptop = input;
    if (typeof laptop.date_created === 'string') {
      return { ...laptop, date_created: new Date(laptop.date_created) };
    }
    if (typeof laptop.date_modified === 'string') {
      return { ...laptop, date_modified: new Date(laptop.date_modified) };
    }
    return laptop;
  }
  const restoredArray = input.map(laptop => {
    if (typeof laptop.date_created === 'string') {
      return { ...laptop, date_created: new Date(laptop.date_created) };
    }
    if (typeof laptop.date_modified === 'string') {
      return { ...laptop, date_modified: new Date(laptop.date_modified) };
    }
    return laptop;
  });

  return restoredArray;
};

export default convertToDateLaptopData;
