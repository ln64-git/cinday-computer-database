/* eslint-disable no-unused-vars */
import { laptop } from '@prisma/client'
import { createContext } from 'react'

const LaptopArrayContext = createContext({
  laptopArray: [],
  setLaptopArray: (laptop: laptop[]) => {},
})

export default LaptopArrayContext
