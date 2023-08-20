/* eslint-disable no-unused-vars */
import { createContext, Dispatch, SetStateAction } from 'react'

interface PageVisibleContextType {
  pageVisible: boolean
  setPageVisible: Dispatch<SetStateAction<boolean>>
}

const PageVisibleContext = createContext<PageVisibleContextType>({
  pageVisible: false,
  setPageVisible: () => {},
})

export default PageVisibleContext
