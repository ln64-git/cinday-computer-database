'use client'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useState } from 'react'
import { ThemeProviderProps } from 'next-themes/dist/types'
import SearchContext from '@/lib/util/context/interface/search-context'
import RepairContext from '@/lib/util/context/interface/repair-context'
import IPadListContext from '@/lib/util/context/ipad/ipad-array-context'
import LaptopListContext from '@/lib/util/context/laptop/laptop-array-context'
import LaptopNoteListContext from '@/lib/util/context/laptop/laptop-note-array-context'
import IPadNoteListContext from '@/lib/util/context/ipad/ipad-note-array-context'
import DeviceContext from '@/lib/util/context/interface/device-context'


import { motion, AnimatePresence } from 'framer-motion'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const [searchText, setSearchText] = useState('')
  const [repairFlag, setRepairFlag] = useState(false)
  const [iPadArray, setIPadArray] = useState([])
  const [iPadNoteArray, setIPadNoteArray] = useState([])
  const [laptopArray, setLaptopArray] = useState([])
  const [laptopNoteArray, setLaptopNoteArray] = useState([])
  const [isIPad, setIsIPad] = useState(true)

  return (
    <DeviceContext.Provider value={{ isIPad, setIsIPad }}>
      <RepairContext.Provider value={{ repairFlag, setRepairFlag }}>
        <SearchContext.Provider value={{ searchText, setSearchText }}>
          <IPadListContext.Provider value={{ iPadArray, setIPadArray }}>
            <LaptopListContext.Provider value={{ laptopArray, setLaptopArray }}>
              <IPadNoteListContext.Provider
                value={{
                  iPadNoteArray: iPadNoteArray,
                  setIPadNoteArray,
                }}
              >
                <LaptopNoteListContext.Provider
                  value={{
                    laptopNoteArray,
                    setLaptopNoteArray,
                  }}
                >
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <NextUIProvider>
                        <NextThemesProvider {...themeProps}>
                          {children}
                        </NextThemesProvider>
                      </NextUIProvider>
                    </motion.div>
                  </AnimatePresence>
                </LaptopNoteListContext.Provider>
              </IPadNoteListContext.Provider>
            </LaptopListContext.Provider>
          </IPadListContext.Provider>
        </SearchContext.Provider>
      </RepairContext.Provider>
    </DeviceContext.Provider>
  )
}
