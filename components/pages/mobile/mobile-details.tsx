import DeviceInfo from '@/components/features/device/device-info'
import DeviceImage from '@/util/config/device-logo'
import { Button } from '@nextui-org/button'
import { Card, CardHeader } from '@nextui-org/react'
import { ipad, laptop } from '@prisma/client'
import React from 'react'

interface MoblieDetailsProps {
  device: ipad | laptop
  isIPad: boolean
}

export default function MobileDetails(props: MoblieDetailsProps) {
  return (
      <div className='w-4/5 md:px-0 md:w-2/3  my-8'>
        <div className="h-full max-h-full w-full flex flex-col justify-start items-center  ">
          <div className='flex justify-center'>
            <DeviceImage size={150} isIPad={props.isIPad} />
          </div>
          <div className='w-full '>
            <DeviceInfo device={props.device} isIPad={props.isIPad} />
          </div>
          <div className='w-1/2 text-center my-16'>
            <Button size='lg' variant='flat' fullWidth>edit</Button>
          </div>
          <div className='w-full h-full text-l   '>
            <Card
              className="   justify-center  "
            >
              <CardHeader className="flex justify-center items-center gap-3   ">
                <DeviceImage size={60} isIPad={props.isIPad} />
                <div className="min-h-[55px] flex flex-row justify-between items-center w-full ">
                  <div className="flex flex-col items-start ">
                    <p className="">
                      {props.device.name}
                    </p>
                    <p className="font-bold">
                      this is an ipad note title
                    </p>
                  </div>
                  <Button color="default">Details</Button>
                </div>
              </CardHeader>
              <div className='pb-4 bt-6 px-8'>
                this is an ipad note summary
              </div>
            </Card>
          </div>
          <div className='py-4   	'>&nbsp;</div>
        </div>
      </div>
  )
}
