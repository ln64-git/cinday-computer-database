import React from 'react'

import { Card, CardHeader, Link, Button } from '@nextui-org/react'
import { Image } from '@nextui-org/react'
import { ipad, ipad_note } from '@prisma/client'

interface HomeCardProps {
  deviceArray: ipad[]
  deviceNotesArray: ipad_note[]
  deviceId: number
}

export default function HomeCard(data: HomeCardProps) {
  const device = data.deviceArray.find(
    (device) => device.ipad_id === data.deviceId,
  )
  const deviceNotes = data.deviceNotesArray.filter(
    (note) => note.ipad_id === data.deviceId,
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
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="/ipad.png"
            width={40}
          />
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
    return <div>Sorry try again</div>
  }
}
