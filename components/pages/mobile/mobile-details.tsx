"use client"
import DeviceInfo from '@/components/features/device/device-info'
import NewCard from '@/components/interface/new-card'
import DeviceImage from '@/util/config/device-logo'
import { setEditFlag } from '@/util/lib/redux-toolkit/reducers/interface/edit-flag-slice'
import { RootState } from '@/util/lib/redux-toolkit/store'
import { Button } from '@nextui-org/button'
import { Card, CardHeader } from '@nextui-org/react'
import { ipad, laptop } from '@prisma/client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface MoblieDetailsProps {
  device: ipad | laptop
  isIPad: boolean
  editFlag: boolean
}

export default function MobileDetails(props: MoblieDetailsProps) {
  const dispatch = useDispatch();

  const editFlag = useSelector(
    (state: RootState) => state.edit.status,
  )
  return (
    <div className='w-4/5 md:px-0 md:w-2/3  my-8'>
      <div className="h-full max-h-full w-full flex flex-col justify-start items-center  ">
        <div className='flex justify-center'>
          <DeviceImage size={150} isIPad={props.isIPad} />
        </div>
        <div className='w-full '>
          <DeviceInfo device={props.device} isIPad={props.isIPad} editFlag={editFlag} />
        </div>
        <div className='w-1/2 text-center my-16'>
          <Button size='lg' variant='flat' fullWidth onClick={() => dispatch(setEditFlag(!editFlag))}>edit</Button>
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
          <div className='w-full my-4'>
            <NewCard />
          </div>
        </div>
        <div className='py-4'>&nbsp;</div>
      </div>
    </div>
  )
}
