/* eslint-disable no-unused-vars */
import { createContext, Dispatch, SetStateAction } from 'react'

interface RepairContextType {
  repairFlag: boolean
  setRepairFlag: Dispatch<SetStateAction<boolean>>
}

const RepairContext = createContext<RepairContextType>({
  repairFlag: false,
  setRepairFlag: () => {},
})

export default RepairContext
