const convertToStringIPadNoteArray = (ipadNotesArray: any) => {
  const convertedArray = ipadNotesArray.map(note => {
    if (note.date_created instanceof Date) {
      note.date_created = note.date_created.toISOString(); // Convert Date to string
    }
    if (note.date_modified instanceof Date) {
      note.date_modified = note.date_modified.toISOString(); // Convert Date to string
    }
    return note;
  });
  return convertedArray;
};
export default convertToStringIPadNoteArray