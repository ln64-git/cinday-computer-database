'use client'
import { useContext } from 'react'
import { Tab, Tabs } from '@nextui-org/react'
import { ipad, ipad_note, laptop, laptop_note } from '@prisma/client'
import HomeCard from './home-card'
import IPadListContext from '@/lib/util/context/ipad/ipad-array-context'
import IPadNoteListContext from '@/lib/util/context/ipad/ipad-note-array-context'
import LaptopListContext from '@/lib/util/context/laptop/laptop-array-context'
import LaptopNoteListContext from '@/lib/util/context/laptop/laptop-note-array-context'
import SearchContext from '@/lib/util/context/interface/search-context'
import RepairContext from '@/lib/util/context/interface/repair-context'
import { motion, AnimatePresence } from 'framer-motion'

interface HomeProps {
  iPadArray: ipad[]
  iPadNotesArray: ipad_note[]
  laptopArray: laptop[]
  laptopNotesArray: laptop_note[]
}

export default function Home(data: HomeProps) {
  const { setIPadArray } = useContext(IPadListContext)
  const { setIPadNoteArray } = useContext(IPadNoteListContext)
  const { setLaptopArray } = useContext(LaptopListContext)
  const { setLaptopNoteArray } = useContext(LaptopNoteListContext)

  setIPadArray(data.iPadArray)
  setIPadNoteArray(data.iPadNotesArray)
  setLaptopArray(data.laptopArray)
  setLaptopNoteArray(data.laptopNotesArray)

  const { searchText } = useContext(SearchContext)
  const { repairFlag } = useContext(RepairContext)

  const filteredIPadArray = data.iPadArray.filter(
    (device) =>
      device.flag_repair === repairFlag &&
      device.name.toLowerCase().includes(searchText.toLowerCase()),
  )
  const filteredLaptopArray = data.laptopArray.filter(
    (device) =>
      device.flag_repair === repairFlag &&
      device.model.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and y offset
        animate={{ opacity: 1, y: 0 }} // Fade-in and move up to original position
        exit={{ opacity: 0, y: -50 }} // Fade-out and move up during exit
        transition={{ duration: 0.5, type: 'tween' }} // Animation duration and type
      >
        <div className="w-full flex flex-grow flex-wrap">
          <div className="flex w-full flex-col items-center pt-4">
            <Tabs aria-label="Options">
              <Tab
                key="ipads"
                title="iPads"
                className="w-full flex flex-wrap justify-center"
              >
                {filteredIPadArray.map((device: ipad) => (
                  <HomeCard
                    isIPad={true}
                    deviceId={device.ipad_id}
                    key={device.ipad_id}
                  />
                ))}
              </Tab>
              <Tab
                key="laptops"
                title="Laptops"
                className="w-full flex flex-wrap  "
              >
                {filteredLaptopArray.map((device: laptop) => (
                  <HomeCard
                    isIPad={false}
                    deviceId={device.laptop_id}
                    key={device.laptop_id}
                  />
                ))}
              </Tab>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
