import { Button, Card, CardHeader } from '@nextui-org/react'
import { ipad, ipad_note, laptop, laptop_note } from '@prisma/client'

import Link from 'next/link'
import { RootState } from '@/lib/redux-toolkit/store'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import DeviceImage from '@/util/device-logo'

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
        className="min-h-[95px] justify-center w-full h-full"
      >
        <CardHeader className="flex gap-3 justify-start">
          <DeviceImage size={60} isIPad={data.isIPad} />
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col">
              <p className="text-md">
                {data.isIPad ? iPadDevice?.name : laptopDevice?.name}
              </p>
              <p className="font-bold">
                {data.isIPad ? (iPadNote ? iPadNote.name : '\u00A0') : ''}
              </p>
            </div>
            <Link
              href={`/${
                data.isIPad
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

function GetDeviceData() {
  const localIPadArray = useSelector(
    (state: RootState) => state.iPadArray.array,
  )
  const localLaptopArray = useSelector(
    (state: RootState) => state.laptopArray.array,
  )
  const localIPadNoteArray = useSelector(
    (state: RootState) => state.search.text,
  )
  const localLaptopNoteArray = useSelector(
    (state: RootState) => state.search.text,
  )
  let iPadArray: ipad[] = []
  let laptopArray: laptop[] = []
  let iPadNoteArray: ipad_note[] = []
  let laptopNoteArray: laptop_note[] = []
  if (Array.isArray(localIPadArray) && localIPadArray.length > 0) {
    iPadArray = localIPadArray
  }
  if (Array.isArray(localLaptopArray) && localLaptopArray.length > 0) {
    laptopArray = localLaptopArray
  }
  if (Array.isArray(localIPadNoteArray) && localIPadNoteArray.length > 0) {
    iPadNoteArray = localIPadNoteArray
  }
  if (Array.isArray(localLaptopNoteArray) && localLaptopNoteArray.length > 0) {
    laptopNoteArray = localLaptopNoteArray
  }
  return { iPadArray, laptopArray, iPadNoteArray, laptopNoteArray }
}

function GetIPadDevice(devices: ipad[], deviceId: number): ipad | undefined {
  return devices.find((device) => device.ipad_id === deviceId)
}

function GetLatestIPadNote(
  notes: ipad_note[],
  deviceId: number,
): ipad_note | null {
  const deviceNotes = notes.filter(
    (note: ipad_note) => 'ipad_id' in note && note.ipad_id === deviceId,
  )
  const latestModifiedNote = deviceNotes.reduce(
    (latestNote: ipad_note | null, currentNote: ipad_note) => {
      if (!latestNote || currentNote.date_modified > latestNote.date_modified) {
        return currentNote
      } else {
        return latestNote
      }
    },
    null,
  )
  return latestModifiedNote
}

function GetLaptopDevice(
  devices: laptop[],
  deviceId: number,
): laptop | undefined {
  return devices.find((device) => device.laptop_id === deviceId)
}

function GetLatestLaptopNote(notes: laptop_note[]): laptop_note | null {
  const latestModifiedNote = notes.reduce(
    (latestNote: laptop_note | null, currentNote: laptop_note) => {
      if (!latestNote || currentNote.date_modified > latestNote.date_modified) {
        return currentNote
      } else {
        return latestNote
      }
    },
    null,
  )
  return latestModifiedNote
}
