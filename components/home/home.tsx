'use client'
import { Tab, Tabs } from '@nextui-org/react'
import { ipad, ipad_note } from '@prisma/client'
import React from 'react'
import HomeCard from './home-card'

interface HomeProps {
  deviceArray: ipad[]
  deviceNotesArray: ipad_note[]
}

export default function Home(data: HomeProps) {
  return (
    <div className="w-full flex flex-grow flex-wrap">
      <div className="flex w-full flex-col items-center pt-4">
        <Tabs aria-label="Options">
          <Tab
            key="ipads"
            title="iPads"
            className="w-full flex flex-wrap justify-center"
          >
            {data.deviceArray.map((device: ipad) => (
              <HomeCard
                {...data}
                deviceId={device.ipad_id}
                key={device.ipad_id}
              />
            ))}
          </Tab>
          <Tab key="laptops" title="Laptops"></Tab>
        </Tabs>
      </div>
    </div>
  )
}
