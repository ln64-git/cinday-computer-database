import { PrismaClient } from "@prisma/client"
import convertToStringIPadArray from "../function/convert/to-string/convert-to-string-ipad-array"
import convertToStringIPadNoteArray from "../function/convert/to-string/convert-to-string-ipad-note-array"
import convertToStringLaptopArray from "../function/convert/to-string/convert-to-string-laptop-array"
import convertToStringLaptopNoteArray from "../function/convert/to-string/convert-to-string-laptop-note-array"
import mockIPadData from '../../data/ipads.json';
import mockIPadNotesData from '../../data/ipad_note.json';
import mockLaptopData from '../../data/laptops.json';
import mockLaptopNotesData from '../../data/laptop_note.json';

export async function getData(isUserAuth: boolean) {
  if (isUserAuth) {
    const prisma = new PrismaClient()
    const iPadArray = await prisma.ipad.findMany()
    const iPadNotesArray = await prisma.ipad_note.findMany()
    const laptopArray = await prisma.laptop.findMany()
    const laptopNotesArray = await prisma.laptop_note.findMany()
    return { iPadArray, iPadNotesArray, laptopArray, laptopNotesArray }
  } else {
    const iPadArray = convertToStringIPadArray(mockIPadData)
    const iPadNotesArray = convertToStringIPadNoteArray(mockIPadNotesData)
    const laptopArray = convertToStringLaptopArray(mockLaptopData)
    const laptopNotesArray = convertToStringLaptopNoteArray(mockLaptopNotesData)
    return { iPadArray, iPadNotesArray, laptopArray, laptopNotesArray }
  }
}