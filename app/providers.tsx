'use client'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

import { motion, AnimatePresence } from 'framer-motion'

import { Provider } from 'react-redux'
import { store } from '@/util/lib/redux-toolkit/store'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <NextUIProvider>
          <Provider store={store}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </Provider>
        </NextUIProvider>
      </motion.div>
    </AnimatePresence>
  )
}
