import React, { useContext } from 'react'

import { Card, CardHeader, Link, Button } from '@nextui-org/react'
import IPadArrayContext from '@/lib/util/context/ipad/ipad-array-context'
import IPadNoteArrayContext from '@/lib/util/context/ipad/ipad-note-array-context'
import { ipad_note } from '@prisma/client'
import DeviceImage from '@/lib/util/device-logo'

interface HomeCardProps {
  deviceId: number
  isIPad: boolean
}

export default function HomeCard(data: HomeCardProps) {
  const { iPadArray } = useContext(IPadArrayContext)
  const { iPadNoteArray } = useContext(IPadNoteArrayContext)

  const device = iPadArray.find((device) => device.ipad_id === data.deviceId)
  const deviceNotes = iPadNoteArray.filter(
    (note: ipad_note) => note.ipad_id === data.deviceId,
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

  if (device) {
    return (
      <Card
        key={device.ipad_id}
        className="w-full lg:w-2/5 2xl:w-1/4 mx-10 lg:mx-4 mt-2 mb-4  "
      >
        <CardHeader className="flex gap-3 justify-start">
          <DeviceImage isIPad={data.isIPad} />
          <div className="flex flex-row justify-between w-full ">
            <div className="flex flex-col">
              <p className="text-md">{device.name}</p>
              {latestModifiedNote ? (
                <p className="font-bold">{latestModifiedNote.name}</p>
              ) : (
                <></>
              )}
            </div>
            <Link href={`/ipads/${device.ipad_id}`}>
              <Button color="default" className="">
                Details
              </Button>
            </Link>
          </div>
        </CardHeader>
        {latestModifiedNote?.summary ? (
          <p className="mx-8 my-4">{latestModifiedNote.summary}</p>
        ) : (
          <></>
        )}
      </Card>
    )
  } else {
    return
  }
}
