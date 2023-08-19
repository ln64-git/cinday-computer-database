/* eslint-disable no-unused-vars */

import { createContext, Dispatch, SetStateAction } from 'react'

type FilterContextType = {
  filterProps: string[]
  setFilterProps: Dispatch<SetStateAction<string[]>>
}

const FilterContext = createContext<FilterContextType>({
  filterProps: [],
  setFilterProps: () => {},
})

export default FilterContext
