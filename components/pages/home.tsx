'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Tab, Tabs } from '@nextui-org/react'
import { ipad } from '@prisma/client'
import { useDispatch, useSelector } from 'react-redux'

import HomeCard from '../interface/home-card'
import { RootState } from '@/util/lib/redux-toolkit/store'
import { setIPadArray } from '@/util/lib/redux-toolkit/reducers/ipad-array-slice'
import { setIPadNoteArray } from '@/util/lib/redux-toolkit/reducers/ipad-note-array-slice'
import { setLaptopArray } from '@/util/lib/redux-toolkit/reducers/laptop-array-slice'
import { setLaptopNoteArray } from '@/util/lib/redux-toolkit/reducers/laptop-note-array-slice'
import convertToStringIPadArray from '@/util/function/ipad/convert-to-string-ipad-array'
import convertToStringLaptopArray from '@/util/function/laptop/convert-to-string-laptop-note-array'
import convertToStringIPadNoteArray from '@/util/function/ipad-note/convert-to-string-ipad-note-array'
import convertToStringLaptopNoteArray from '@/util/function/laptop-note/convert-to-string-laptop-note-array'

interface HomeProps {
  iPadArray: any[]
  iPadNotesArray: any[]
  laptopArray: any[]
  laptopNotesArray: any[]
}

export default function Home(data: HomeProps) {
  const dispatch = useDispatch()

  dispatch(setIPadArray(convertToStringIPadArray(data.iPadArray)));
  dispatch(setLaptopArray(convertToStringLaptopArray(data.laptopArray)));
  dispatch(setIPadNoteArray(convertToStringIPadNoteArray(data.iPadNotesArray)));
  dispatch(setLaptopNoteArray(convertToStringLaptopNoteArray(data.laptopNotesArray)));

  const searchText = useSelector((state: RootState) => state.search.text)
  const repairFlag = useSelector((state: RootState) => state.repair.status)

  const filteredIPadArray = data.iPadArray.filter(
    (device) =>
      device.flag_repair === repairFlag &&
      device.name.toLowerCase().includes(searchText.toLowerCase()),
  )
  const filteredLaptopArray = data.laptopArray.filter(
    (device) =>
      device.flag_repair === repairFlag &&
      device.name.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <AnimatePresence>
      <div className="h-full w-full flex flex-grow flex-wrap">
        <div className="h-full w-full flex flex-col items-center pt-4">
          <Tabs aria-label="Options">
            <Tab key="ipads" title="iPads">
              <motion.div
                initial={{ opacity: 0 }} // Start with opacity 0 and y offset
                animate={{ opacity: 1 }} // Fade-in and move up to original position
                exit={{ opacity: 0 }} // Fade-out and move up during exit
                transition={{ duration: 0.5 }} // Animation duration and type
                className="w-full h-full flex flex-wrap justify-center "
              >
                {filteredIPadArray.map((device: ipad) => (
                  <HomeCard
                    isIPad={true}
                    deviceId={device.ipad_id}
                    key={device.ipad_id}
                  />
                ))}
              </motion.div>
            </Tab>
            <Tab
              key="laptops"
              title="laptops"
              className="h-full w-full flex flex-wrap justify-center "
            >
              <motion.div
                initial={{ opacity: 0 }} // Start with opacity 0 and y offset
                animate={{ opacity: 1 }} // Fade-in and move up to original position
                exit={{ opacity: 0 }} // Fade-out and move up during exit
                transition={{ duration: 0.5 }} // Animation duration and type
                className="h-full w-full flex flex-wrap justify-center "
              >
                {filteredLaptopArray.map((device: any) => (
                  <HomeCard
                    isIPad={false}
                    deviceId={device.laptop_id}
                    key={device.laptop_id}
                  />
                ))}
              </motion.div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </AnimatePresence>
  )
}

