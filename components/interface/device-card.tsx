import DeviceImage from '@/util/config/device-logo'
import { Button, Card, CardHeader } from '@nextui-org/react'
import { ipad, laptop } from '@prisma/client'
import React from 'react'

interface DeviceCardProps {
  device: ipad | laptop
  isIPad: boolean
}

export default function DeviceCard(props: DeviceCardProps) {
  return (
    <div>
      <Card className="justify-center">
        <CardHeader className="flex justify-center items-center gap-3   ">
          <DeviceImage size={60} isIPad={props.isIPad} />
          <div className="min-h-[55px] flex flex-row justify-between items-center w-full ">
            <div className="flex flex-col items-start ">
              <p className="">{props.device.name}</p>
              <p className="font-bold">this is an ipad note title</p>
            </div>
            <Button color="default">Details</Button>
          </div>
        </CardHeader>
        <div className="pb-4 bt-6 px-8">this is an ipad note summary</div>
      </Card>
    </div>
  )
}
