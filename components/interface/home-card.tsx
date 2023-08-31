import { Button, Card, CardHeader } from '@nextui-org/react'
import { ipad, ipad_note, laptop, laptop_note } from '@prisma/client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import DeviceImage from '@/util/config/device-logo'
import GetDevice from '@/util/function/device/get-device'
import GetLatestDeviceNote from '@/util/function/device/get-device-note-latest'

interface HomeCardProps {
  deviceId: number
  isIPad: boolean
}

export default function HomeCard(data: HomeCardProps) {
  let iPadDevice: ipad | undefined = undefined
  let iPadNote: ipad_note | null = null
  let laptopDevice: laptop | undefined = undefined
  let laptopNote: laptop_note | null = null

  if (data.isIPad) {
    iPadDevice = GetDevice(data.deviceId, true)
    iPadNote = GetLatestDeviceNote(data.deviceId, true)
  } else {
    laptopDevice = GetDevice(data.deviceId, false)
    laptopNote = GetLatestDeviceNote(data.deviceId, true)
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
        className=" h-full justify-center "
      >
        <CardHeader className="flex justify-center items-center gap-3   ">
          <DeviceImage size={60} isIPad={data.isIPad} />
          <div className="min-h-[55px] flex flex-row justify-between items-center w-full ">
            <div className="flex flex-col items-start ">
              <p className="text-md">
                {data.isIPad ? iPadDevice?.name : laptopDevice?.name}
              </p>
              <p className="font-bold">
                {data.isIPad ? (iPadNote ? iPadNote.name : '\u00A0') : '\u00A0'}
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
            <p className="mx-8 mb-4 text-left">{iPadNote.summary}</p>
          ) : (
            <div className="h-full"></div>
          )
        ) : laptopNote?.summary ? (
          <p className="mx-8 my-4 text-left">{laptopNote.summary}</p>
        ) : (
          <div className="h-full"></div>
        )}
      </Card>
    </motion.div>
  )
}








