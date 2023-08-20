import { createContext, Dispatch, SetStateAction } from 'react'

interface SearchVisibleContextType {
  searchVisible: boolean
  setSearchVisible: Dispatch<SetStateAction<boolean>>
}

const SearchVisibleContext = createContext<SearchVisibleContextType>({
  searchVisible: true,
  setSearchVisible: () => {},
})

export default SearchVisibleContext
