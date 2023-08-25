'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import DeviceImage from '@/util/config/device-logo'
import { useSelector } from 'react-redux'

export default function Device() {
  const pathname = usePathname()
  const isIPad = pathname.startsWith('/ipads')
  const iPadArray = useSelector((state: any) => state.iPadArray.array);

  console.log(iPadArray);

  return (
    <div className="h-full flex flex-col justify-center">
      <DeviceImage size={200} isIPad={isIPad} />
      <div className=" flex flex-grow h-full">Content</div>
      <div className=" flex flex-grow h-full">Content</div>
    </div>
  )
}
