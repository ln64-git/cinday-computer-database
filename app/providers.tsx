'use client'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { PersistGate } from 'redux-persist/integration/react';
import { motion, AnimatePresence } from 'framer-motion'
import { SessionProvider } from "next-auth/react"

import { Provider } from 'react-redux'
import { persistor, store } from '@/util/lib/redux-toolkit/store'
import { useRouter } from 'next/navigation';

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
  session?: any
}

export function Providers({ children, themeProps, session }: ProvidersProps) {
  useRouter()
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <NextUIProvider >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <NextThemesProvider {...themeProps}>
                <SessionProvider session={session}>
                  {children}
                </SessionProvider >
              </NextThemesProvider>
            </PersistGate>
          </Provider>
        </NextUIProvider>
      </motion.div>
    </AnimatePresence>
  )
}
