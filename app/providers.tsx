'use client'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useState } from 'react'
import { ThemeProviderProps } from 'next-themes/dist/types'
import RepairContext from '@/lib/util/context/repair-context'
import SearchContext from '@/lib/util/context/search-context'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const [searchText, setSearchText] = useState('')
  const [repairFlag, setRepairFlag] = useState(false)

  const toggleRepairFlag = () => {
    setRepairFlag((prevFlag) => !prevFlag)
  }

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      <RepairContext.Provider value={{ repairFlag, toggleRepairFlag }}>
        <NextUIProvider>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </NextUIProvider>
      </RepairContext.Provider>
    </SearchContext.Provider>
  )
}
