const convertToDateLaptopNoteArray = (convertedArray) => {
  const restoredArray = convertedArray.map(note => {
    if (typeof note.date_created === 'string') {
      return { ...note, date_created: new Date(note.date_created) }; // Create new object with converted date
    }
    if (typeof note.date_modified === 'string') {
      return { ...note, date_modified: new Date(note.date_modified) }; // Create new object with converted date
    }
    return note;
  });
  return restoredArray;
};
export default convertToDateLaptopNoteArray