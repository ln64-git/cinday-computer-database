/* eslint-disable no-unused-vars */
import { ipad_note } from '@prisma/client'
import { createContext } from 'react'

const IPadNoteArrayContext = createContext({
  iPadNoteArray: [],
  setIPadNoteArray: (note: ipad_note[]) => {},
})

export default IPadNoteArrayContext
