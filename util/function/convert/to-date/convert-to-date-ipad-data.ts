const convertToDateIPadData = (input: any) => {
  if (!Array.isArray(input)) {
    const iPad = input;
    if (typeof iPad.date_created === 'string') {
      return { ...iPad, date_created: new Date(iPad.date_created) };
    }
    if (typeof iPad.date_modified === 'string') {
      return { ...iPad, date_modified: new Date(iPad.date_modified) };
    }
    return iPad;
  }
  const restoredArray = input.map(iPad => {
    if (typeof iPad.date_created === 'string') {
      return { ...iPad, date_created: new Date(iPad.date_created) };
    }
    if (typeof iPad.date_modified === 'string') {
      return { ...iPad, date_modified: new Date(iPad.date_modified) };
    }
    return iPad;
  });
  return restoredArray;
};

export default convertToDateIPadData;
