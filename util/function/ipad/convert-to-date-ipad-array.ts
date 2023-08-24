const convertToDateIPadArray = (convertedArray) => {
  const restoredArray = convertedArray.map(iPad => {
    if (typeof iPad.date_created === 'string') {
      return { ...iPad, date_created: new Date(iPad.date_created) }; // Create new object with converted date
    }
    if (typeof iPad.date_modified === 'string') {
      return { ...iPad, date_modified: new Date(iPad.date_modified) }; // Create new object with converted date
    }
    return iPad;
  });
  return restoredArray;
};

export default convertToDateIPadArray