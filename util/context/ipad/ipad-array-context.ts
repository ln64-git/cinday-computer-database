/* eslint-disable no-unused-vars */
import { ipad } from '@prisma/client'
import { createContext } from 'react'

const IPadArrayContext = createContext({
  iPadArray: [],
  setIPadArray: (iPad: ipad[]) => {},
})

export default IPadArrayContext
