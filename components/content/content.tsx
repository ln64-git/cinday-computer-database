'use client'
import React, { useContext, useEffect, useState } from 'react'
import RepairContext from '@/lib/util/context/interface/repair-context'
import IPadArrayContext from '@/lib/util/context/ipad/ipad-array-context'
import LaptopArrayContext from '@/lib/util/context/laptop/laptop-array-context'
import DeviceImage from '@/lib/util/device-logo'
import { useParams, usePathname } from 'next/navigation'

export default function Content() {
  const pathname = usePathname()
  const { iPadArray } = useContext(IPadArrayContext)
  const { laptopArray } = useContext(LaptopArrayContext)

  const isIPad = pathname.startsWith('/ipads')
  const { repairFlag } = useContext(RepairContext)
  const [device, setDevice] = useState(null)
  const deviceId = useParams().ipad_id

  useEffect(() => {
    if (isIPad) {
      const deviceFound = iPadArray.some((ipad) => ipad.id === deviceId)
      setDevice(deviceFound)
    } else {
      const deviceFound = laptopArray.some((laptop) => laptop.id === deviceId)
      setDevice(deviceFound)
    }
  }, [isIPad, iPadArray, laptopArray, deviceId])

  console.log(repairFlag)
  console.log(iPadArray)
  console.log(device)

  return (
    <div className="h-full">
      <DeviceImage size={200} isIPad={isIPad} />
      <div className=" flex flex-grow h-full">Content</div>
      <div className=" flex flex-grow h-full">Content</div>
    </div>
  )
}
