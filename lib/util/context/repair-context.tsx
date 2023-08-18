/* eslint-disable no-unused-vars */
import { createContext } from 'react'

const RepairContext = createContext({
  repairFlag: false,
  toggleRepairFlag: () => {},
})

export default RepairContext
