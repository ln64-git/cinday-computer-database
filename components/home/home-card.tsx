import { Button, Card, CardHeader } from '@nextui-org/react'
import { ipad, ipad_note, laptop, laptop_note } from '@prisma/client'

import Link from 'next/link'
import { RootState } from '@/lib/redux-toolkit/store'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import DeviceImage from '@/util/device-logo'
import { redux_ipad } from '@/util/types/redux-ipad'
import { redux_laptop } from '@/util/types/redux.laptop'
import { redux_ipad_note } from '@/util/types/redux-ipad-note'
import { redux_laptop_note } from '@/util/types/redux-laptop-note'

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
    laptopNote = GetLatestLaptopNote(laptopNoteArray)received
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

function GetDeviceData() {
  const localIPadArray = useSelector(
    (state: RootState) => state.iPadArray.array,
  )
  const localLaptopArray = useSelector(
    (state: RootState) => state.laptopArray.array,
  )
  const localIPadNoteArray = useSelector(
    (state: RootState) => state.iPadNoteArray.array,
  )
  const localLaptopNoteArray = useSelector(
    (state: RootState) => state.laptopNoteArray.array,
  )

  let iPadArray: redux_ipad[] = []
  let laptopArray: redux_laptop[] = []
  let iPadNoteArray: redux_ipad_note[] = []
  let laptopNoteArray: redux_laptop_note[] = []
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

  iPadArray = restoreIPadArray(iPadArray)
  laptopArray = restoreLaptopArray(laptopArray)
  iPadNoteArray = restoreIPadNoteArray(iPadNoteArray)
  laptopNoteArray = restoreLaptopNoteArray(laptopNoteArray)

  return { iPadArray, laptopArray, iPadNoteArray, laptopNoteArray }
}

function GetIPadDevice(devices: any[], deviceId: number): ipad | undefined {
  return devices.find((device) => device.ipad_id === deviceId)
}

function GetLatestIPadNote(
  notes: any[],
  deviceId: number,
): ipad_note | null {
  const deviceNotes = notes.filter(
    (note: ipad_note) => note.ipad_id === deviceId,
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
  devices: any[],
  deviceId: number,
): laptop | undefined {
  return devices.find((device) => device.laptop_id === deviceId)
}

function GetLatestLaptopNote(notes: any[]): laptop_note | null {
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

const restoreIPadArray = (convertedArray) => {
  const restoredArray = convertedArray.map(iPad => {
    if (typeof iPad.date_created === 'string') {
      return { ...iPad, date_created: new Date(iPad.date_created) }; // Create new object with converted date
    }
    if (typeof iPad.date_modified === 'string') {
      return { ...iPad, date_modified: new Date(iPad.date_modified) }; // Create new object with converted date
    }
    return iPad;
  });
  return restoredArray;
};

const restoreIPadNoteArray = (convertedArray) => {
  const restoredArray = convertedArray.map(note => {
    if (typeof note.date_created === 'string') {
      return { ...note, date_created: new Date(note.date_created) }; // Create new object with converted date
    }
    if (typeof note.date_modified === 'string') {
      return { ...note, date_modified: new Date(note.date_modified) }; // Create new object with converted date
    }
    return note;
  });
  return restoredArray;
};

const restoreLaptopNoteArray = (convertedArray) => {
  const restoredArray = convertedArray.map(note => {
    if (typeof note.date_created === 'string') {
      return { ...note, date_created: new Date(note.date_created) }; // Create new object with converted date
    }
    if (typeof note.date_modified === 'string') {
      return { ...note, date_modified: new Date(note.date_modified) }; // Create new object with converted date
    }
    return note;
  });
  return restoredArray;
};

const restoreLaptopArray = (convertedArray) => {
  const restoredArray = convertedArray.map(laptop => {
    if (typeof laptop.date_created === 'string') {
      return { ...laptop, date_created: new Date(laptop.date_created) }; // Create new object with converted date
    }
    if (typeof laptop.date_modified === 'string') {
      return { ...laptop, date_modified: new Date(laptop.date_modified) }; // Create new object with converted date
    }
    return laptop;
  });
  return restoredArray;
};
