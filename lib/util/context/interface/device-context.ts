/* eslint-disable no-unused-vars */

import { createContext } from 'react'

interface DeviceContextValue {
  isIPad: boolean
  setIsIPad: (isIPad: boolean) => void
}

const DeviceContext = createContext<DeviceContextValue>({
  isIPad: true,
  setIsIPad: () => {},
})

export default DeviceContext
