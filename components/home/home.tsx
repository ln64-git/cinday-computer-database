'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Tab, Tabs } from '@nextui-org/react'
import { ipad, ipad_note, laptop, laptop_note } from '@prisma/client'
import { useDispatch, useSelector } from 'react-redux'

import HomeCard from './home-card'
import { RootState } from '@/lib/redux-toolkit/store'
import { setIPadArray } from '@/lib/redux-toolkit/reducers/ipad-array-slice'
import { setIPadNoteArray } from '@/lib/redux-toolkit/reducers/ipad-note-array-slice'
import laptopArraySlice, { setLaptopArray } from '@/lib/redux-toolkit/reducers/laptop-array-slice'
import { setLaptopNoteArray } from '@/lib/redux-toolkit/reducers/laptop-note-array-slice'

interface HomeProps {
  iPadArray: any[]
  iPadNotesArray: any[]
  laptopArray: any[]
  laptopNotesArray: any[]
}

export default function Home(data: HomeProps) {
  const dispatch = useDispatch()

  dispatch(setIPadArray(prepIPadArray(data.iPadArray)));
  dispatch(setLaptopArray(prepLaptopArray(data.laptopArray)));
  dispatch(setIPadNoteArray(prepIPadNoteArray(data.iPadNotesArray)));
  dispatch(setLaptopNoteArray(prepLaptopNoteArray(data.laptopNotesArray)));


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

const prepIPadArray = (iPadArray: any) => {
  const convertedArray = iPadArray.map(iPad => {
    if (iPad.date_created instanceof Date) {
      iPad.date_created = iPad.date_created.toISOString(); // Convert Date to string
    }
    if (iPad.date_modified instanceof Date) {
      iPad.date_modified = iPad.date_modified.toISOString(); // Convert Date to string
    }
    return iPad;
  });
  return convertedArray;
};

const prepIPadNoteArray = (ipadNotesArray: any) => {
  const convertedArray = ipadNotesArray.map(note => {
    if (note.date_created instanceof Date) {
      note.date_created = note.date_created.toISOString(); // Convert Date to string
    }
    if (note.date_modified instanceof Date) {
      note.date_modified = note.date_modified.toISOString(); // Convert Date to string
    }
    return note;
  });
  return convertedArray;
};

const prepLaptopNoteArray = (laptopNotesArray: any) => {
  const convertedArray = laptopNotesArray.map(note => {
    if (note.date_created instanceof Date) {
      note.date_created = note.date_created.toISOString(); // Convert Date to string
    }
    if (note.date_modified instanceof Date) {
      note.date_modified = note.date_modified.toISOString(); // Convert Date to string
    }
    return note;
  });
  return convertedArray;
};

const prepLaptopArray = (laptopArray: any) => {
  const convertedArray = laptopArray.map(laptop => {
    if (laptop.date_created instanceof Date) {
      laptop.date_created = laptop.date_created.toISOString(); // Convert Date to string
    }
    if (laptop.date_modified instanceof Date) {
      laptop.date_modified = laptop.date_modified.toISOString(); // Convert Date to string
    }
    return laptop;
  });
  return convertedArray;
};


