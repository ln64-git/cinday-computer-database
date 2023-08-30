import { useSelector } from "react-redux"
import { RootState } from "../lib/redux-toolkit/store"
import { redux_ipad } from "../types/redux-ipad"
import { redux_laptop } from "../types/redux-laptop"
import { redux_ipad_note } from "../types/redux-ipad-note"
import { redux_laptop_note } from "../types/redux-laptop-note"
import convertToDateIPadArray from "./convert/to-date/convert-to-date-ipad-array"
import convertToDateLaptopArray from "./convert/to-date/convert-to-date-laptop-array"
import convertToDateIPadNoteArray from "./convert/to-date/convert-to-date-ipad-note-array"
import convertToDateLaptopNoteArray from "./convert/to-date/convert-to-date-laptop-note-array"

export default function GetDeviceData() {
  const localIPadArray = useSelector(
    (state: RootState) => state.iPadArray.array,
  )
  const localLaptopArray = useSelector(
    (state: RootState) => state.laptopArray.array,
  )
  const localIPadNoteArray = useSelector(
    (state: RootState) => state.iPadNoteArray.array,
  )
  const localLaptopNoteArray = useSelector(
    (state: RootState) => state.laptopNoteArray.array,
  )

  let iPadArray: redux_ipad[] = []
  let laptopArray: redux_laptop[] = []
  let iPadNoteArray: redux_ipad_note[] = []
  let laptopNoteArray: redux_laptop_note[] = []
  if (Array.isArray(localIPadArray) && localIPadArray.length > 0) {
    iPadArray = localIPadArray
  }
  if (Array.isArray(localLaptopArray) && localLaptopArray.length > 0) {
    laptopArray = localLaptopArray
  }
  if (Array.isArray(localIPadNoteArray) && localIPadNoteArray.length > 0) {
    iPadNoteArray = localIPadNoteArray
  }
  if (Array.isArray(localLaptopNoteArray) && localLaptopNoteArray.length > 0) {
    laptopNoteArray = localLaptopNoteArray
  }

  iPadArray = convertToDateIPadArray(iPadArray)
  laptopArray = convertToDateLaptopArray(laptopArray)
  iPadNoteArray = convertToDateIPadNoteArray(iPadNoteArray)
  laptopNoteArray = convertToDateLaptopNoteArray(laptopNoteArray)

  return { iPadArray, laptopArray, iPadNoteArray, laptopNoteArray }
}