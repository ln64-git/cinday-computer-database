/* eslint-disable no-unused-vars */
import { laptop_note } from '@prisma/client'
import { createContext } from 'react'

const LaptopNoteArrayContext = createContext({
  laptopNoteArray: [],
  setLaptopNoteArray: (laptop: laptop_note[]) => {},
})

export default LaptopNoteArrayContext
