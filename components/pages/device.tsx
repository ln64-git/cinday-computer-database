'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import DeviceImage from '@/util/config/device-logo'
import DeviceInfo from '../features/device/device-info'
import GetDevice from '@/util/function/device/get-device'

export default function Device() {
  const pathname = usePathname()
  const isIPad = pathname.startsWith('/ipads')
  const deviceId = parseInt(pathname.split('/').pop() || '');
  const device = GetDevice(deviceId, isIPad)

  return (
    <div className="h-full w-full flex flex-col justify-start items-center ">
      <div className='flex justify-center my-2'>
        <DeviceImage size={150} isIPad={isIPad} />
      </div>
      <div className='w-full '>
        <DeviceInfo device={device} isIPad={false} />
      </div>
    </div>
  )
}
