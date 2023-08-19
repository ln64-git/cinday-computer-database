import React, { useContext } from 'react'
import { Card, CardHeader, Link, Button } from '@nextui-org/react'
import { ipad_note, laptop_note } from '@prisma/client'
import DeviceImage from '@/lib/util/device-logo'
import IPadArrayContext from '@/lib/util/context/ipad/ipad-array-context'
import IPadNoteArrayContext from '@/lib/util/context/ipad/ipad-note-array-context'
import LaptopArrayContext from '@/lib/util/context/laptop/laptop-array-context'
import LaptopNoteArrayContext from '@/lib/util/context/laptop/laptop-note-array-context'

interface HomeCardProps {
  deviceId: number
  isIPad: boolean
}

export default function HomeCard(data: HomeCardProps) {
  const { iPadArray } = useContext(IPadArrayContext)
  const { iPadNoteArray } = useContext(IPadNoteArrayContext)
  const { laptopArray } = useContext(LaptopArrayContext)
  const { laptopNoteArray } = useContext(LaptopNoteArrayContext)

  const devices = data.isIPad ? iPadArray : laptopArray
  const deviceNotes = data.isIPad ? iPadNoteArray : laptopNoteArray

  const device =
    devices.find((device) =>
      data.isIPad
        ? device.ipad_id === data.deviceId
        : device.laptop_id === data.deviceId,
    ) || {}

  const deviceRelatedNotes = deviceNotes.filter(
    (note: ipad_note | laptop_note) => {
      if (data.isIPad) {
        return 'ipad_id' in note && note.ipad_id === data.deviceId
      } else {
        return 'laptop_id' in note && note.laptop_id === data.deviceId
      }
    },
  )

  const latestModifiedNote = deviceRelatedNotes.reduce(
    (
      latestNote: ipad_note | laptop_note | null,
      currentNote: ipad_note | laptop_note,
    ) => {
      if (!latestNote || currentNote.date_modified > latestNote.date_modified) {
        return currentNote
      } else {
        return latestNote
      }
    },
    null,
  )
  return (
    <Card
      key={data.isIPad ? device.ipad_id : device.laptop_id}
      className="w-full lg:w-2/5 2xl:w-1/4 mx-10 lg:mx-4 mt-2 mb-4"
    >
      <CardHeader className="flex gap-3 justify-start">
        <DeviceImage size={60} isIPad={data.isIPad} />
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col">
            <p className="text-md">
              {data.isIPad ? device.name : device.model}
            </p>
            <p className="font-bold ">
              {latestModifiedNote ? latestModifiedNote.name : '\u00A0'}
            </p>
          </div>
          <Link
            href={`/${
              data.isIPad
                ? 'ipads/' + device.ipad_id
                : 'laptops/' + device.laptop_id
            }`}
          >
            <Button color="default">Details</Button>
          </Link>
        </div>
      </CardHeader>
      {latestModifiedNote?.summary ? (
        <p className="mx-8 my-4">{latestModifiedNote.summary}</p>
      ) : (
        <div></div>
      )}
    </Card>
  )
}
