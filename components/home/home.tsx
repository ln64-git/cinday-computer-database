'use client'
import { Tab, Tabs } from '@nextui-org/react'
import { ipad, ipad_note } from '@prisma/client'
import React, { useContext } from 'react'
import HomeCard from './home-card'
import SearchContext from '@/lib/util/context/search-context'
import RepairContext from '@/lib/util/context/repair-context'

interface HomeProps {
  deviceArray: ipad[]
  deviceNotesArray: ipad_note[]
}

export default function Home(data: HomeProps) {
  const { searchText } = useContext(SearchContext)
  const { repairFlag } = useContext(RepairContext)

  const searchProperties = ['name', 'internal_model_id', 'external_model_id']
  const filteredDeviceArray = data.deviceArray.filter(
    (device) =>
      device.flag_repair === repairFlag &&
      searchProperties.some((prop) =>
        device[prop].toLowerCase().includes(searchText.toLowerCase()),
      ),
  )

  return (
    <div className="w-full flex flex-grow flex-wrap">
      <div className="flex w-full flex-col items-center pt-4">
        <Tabs aria-label="Options">
          <Tab
            key="ipads"
            title="iPads"
            className="w-full flex flex-wrap justify-center"
          >
            {filteredDeviceArray.map((device: ipad) => (
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
