/* eslint-disable no-unused-vars */
import { createContext } from 'react'

const SearchContext = createContext({
  searchText: '',
  setSearchText: (text: string) => {},
})

export default SearchContext
