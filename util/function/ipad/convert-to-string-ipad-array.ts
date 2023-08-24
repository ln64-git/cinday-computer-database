const convertToStringIPadArray = (iPadArray: any) => {
  const convertedArray = iPadArray.map(iPad => {
    if (iPad.date_created instanceof Date) {
      iPad.date_created = iPad.date_created.toISOString(); // Convert Date to string
    }
    if (iPad.date_modified instanceof Date) {
      iPad.date_modified = iPad.date_modified.toISOString(); // Convert Date to string
    }
    return iPad;
  });
  return convertedArray;
};
export default convertToStringIPadArray