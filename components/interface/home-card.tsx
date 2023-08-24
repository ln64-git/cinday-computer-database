import { Button, Card, CardHeader } from '@nextui-org/react'
import { ipad, ipad_note, laptop, laptop_note } from '@prisma/client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import DeviceImage from '@/util/config/device-logo'
import GetDeviceData from '@/util/function/get-device-data'
import GetIPadDevice from '@/util/function/ipad/get-ipad-device'
import GetLatestIPadNote from '@/util/function/ipad-note/get-latest-ipad-note'
import GetLaptopDevice from '@/util/function/laptop/get-laptop-device'
import GetLatestLaptopNote from '@/util/function/laptop-note/get-latest-laptop-note'

interface HomeCardProps {
  deviceId: number
  isIPad: boolean
}

export default function HomeCard(data: HomeCardProps) {
  const deviceData = GetDeviceData()
  const { iPadArray, laptopArray, iPadNoteArray, laptopNoteArray } = deviceData



  let iPadDevice: ipad | undefined = undefined
  let iPadNote: ipad_note | null = null
  let laptopDevice: laptop | undefined = undefined
  let laptopNote: laptop_note | null = null

  if (data.isIPad) {
    iPadDevice =
      iPadArray.length > 0
        ? (GetIPadDevice(iPadArray, data.deviceId) as ipad)
        : undefined

    iPadNote =
      iPadNoteArray.length > 0
        ? GetLatestIPadNote(iPadNoteArray, data.deviceId)
        : null
  } else {
    laptopDevice = GetLaptopDevice(laptopArray, data.deviceId) as laptop
    laptopNote = GetLatestLaptopNote(laptopNoteArray)
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, type: 'tween' }}
      className="w-full lg:w-2/5 2xl:w-1/4 mx-10 lg:mx-4 mt-2 mb-4"
    >
      <Card
        key={data.isIPad ? iPadDevice?.ipad_id : laptopDevice?.laptop_id}
        className="min-h-[95px] flex justify-between items-center w-full h-full"
      >
        <CardHeader className="flex gap-3 justify-start">
          <DeviceImage size={60} isIPad={data.isIPad} />
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col ">
              <p className="text-md">
                {data.isIPad ? iPadDevice?.name : laptopDevice?.name}
              </p>
              <p className="font-bold">
                {data.isIPad ? (iPadNote ? iPadNote.name : '\u00A0') : ''}
              </p>
            </div>
            <Link
              href={`/${data.isIPad
                ? 'ipads/' + (iPadDevice?.ipad_id || '')
                : 'laptops/' + (laptopDevice?.laptop_id || '')
                }`}
            >
              <Button color="default">Details</Button>
            </Link>
          </div>
        </CardHeader>
        {data.isIPad ? (
          iPadNote?.summary ? (
            <p className="mx-8 my-4">{iPadNote.summary}</p>
          ) : (
            <div className="h-full"></div>
          )
        ) : laptopNote?.summary ? (
          <p className="mx-8 my-4">{laptopNote.summary}</p>
        ) : (
          <div className="h-full"></div>
        )}
      </Card>
    </motion.div>
  )
}








