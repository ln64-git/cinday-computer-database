"use client"
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Card, Tab, Tabs } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '../interface/icons';
import { setIPadArray } from '@/util/lib/redux-toolkit/reducers/ipad-array-slice';
import { setLaptopArray } from '@/util/lib/redux-toolkit/reducers/laptop-array-slice';
import { setIPadNoteArray } from '@/util/lib/redux-toolkit/reducers/ipad-note-array-slice';
import { setLaptopNoteArray } from '@/util/lib/redux-toolkit/reducers/laptop-note-array-slice';
import { resetUserDevice } from '@/util/lib/redux-toolkit/reducers/user-device-slice';
import { ipad, ipad_note, laptop, laptop_note } from '@prisma/client';
import HomeCard from '../interface/home-card';
import convertToStringIPadArray from '@/util/function/convert/to-string/convert-to-string-ipad-array';
import convertToStringLaptopArray from '@/util/function/convert/to-string/convert-to-string-laptop-array';
import convertToStringIPadNoteArray from '@/util/function/convert/to-string/convert-to-string-ipad-note-array';
import convertToStringLaptopNoteArray from '@/util/function/convert/to-string/convert-to-string-laptop-note-array';
import DeviceInfo from '../features/device/device-info';
import DeviceImage from '@/util/config/device-logo';
import convertDeviceToIPad from '@/util/function/convert/to-device/convet-device-to-ipad';
import convertDeviceToLaptop from '@/util/function/convert/to-device/convert-device-to-laptop';
import AddIPad from '@/util/server/iPad/AddIPad';
import AddLaptop from '@/util/server/laptop/AddLaptop';

interface HomeProps {
  iPadArray?: ipad[];
  iPadNotesArray?: ipad_note[];
  laptopArray?: laptop[];
  laptopNotesArray?: laptop_note[];
  verifiedUser: boolean
}

export default function Home(data: HomeProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isIPad, setIsIPad] = useState(true);
  const [overlay, setOverlay] = useState(false);

  if (data.iPadArray.length || data.laptopArray.length) {
    dispatch(setIPadArray(convertToStringIPadArray(data.iPadArray)));
    dispatch(setLaptopArray(convertToStringLaptopArray(data.laptopArray)));
    dispatch(setIPadNoteArray(convertToStringIPadNoteArray(data.iPadNotesArray)));
    dispatch(setLaptopNoteArray(convertToStringLaptopNoteArray(data.laptopNotesArray)));
  }

  const searchText = useSelector((state: any) => state.search.text);
  const repairFlag = useSelector((state: any) => state.repair.status);

  const filteredIPadArray = data.iPadArray.filter((device) =>
    device.flag_repair === repairFlag && device.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredLaptopArray = data.laptopArray.filter((device) =>
    device.flag_repair === repairFlag && device.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const userDevice = useSelector((state: any) => state.userDevice.state);

  const handleReset = () => {
    dispatch(resetUserDevice());
    setOverlay(!overlay);
  };

  const handleSumbit = async () => {
    try {
      if (isIPad) {
        const userIPad = convertDeviceToIPad(userDevice);
        await AddIPad(userIPad);
      } else {
        const userLaptop = convertDeviceToLaptop(userDevice);
        await AddLaptop(userLaptop);
      }
    } finally {
      console.log("made it");
      setOverlay(false);
      router.refresh();
    }
  };

  if (!data.verifiedUser) {
    router.push('/api/auth/signin');
    return null;
  }

  return (
    <AnimatePresence>
      <div className={`relative h-full w-full flex flex-grow flex-wrap ${overlay ? 'filter blur-sm pointer-events-none overflow-hidden' : ''}`}>
        <div className="absolute inset-0 h-full w-full flex flex-col items-center pt-4">
          <Tabs aria-label="Options" className="mt-4">
            <Tab key="ipads" title="iPads" onFocus={() => setIsIPad(true)}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full flex flex-wrap justify-center"
              >
                {filteredIPadArray?.map((device) => (
                  <HomeCard isIPad={isIPad} deviceId={device.ipad_id} key={device.ipad_id} />
                ))}
              </motion.div>
              {!repairFlag && (
                <div className="flex justify-center">
                  <Card className="justify-center w-1/4 my-2">
                    <div className="w-full flex justify-center items-center">
                      <div className="min-h-[55px] flex flex-row items-center w-2/3">
                        <Button onClick={() => setOverlay(!overlay)} fullWidth variant="light" color="default">
                          <PlusIcon />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </Tab>
            <Tab onFocus={() => setIsIPad(false)} key="laptops" title="Laptops" className="w-full flex flex-wrap justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full flex flex-wrap justify-center"
              >
                {filteredLaptopArray?.map((device) => (
                  <HomeCard isIPad={isIPad} deviceId={device.laptop_id} key={device.laptop_id} />
                ))}
              </motion.div>
              {!repairFlag && (
                <Card className="justify-center w-1/4 my-2">
                  <div className="w-full flex justify-center items-center">
                    <div className="min-h-[55px] flex flex-row items-center w-2/3">
                      <Button onClick={() => setOverlay(!overlay)} fullWidth variant="light" color="default">
                        <PlusIcon />
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </Tab>
          </Tabs>
        </div>

        {overlay && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="z-10 absolute inset-0 flex justify-center items-center mt-0 bg-background backdrop-blur bg-background/90"
          >
            <div className="w-4/5 md:px-0 md:w-2/3 my-8 h-full pt-12">
              <div className="h-full max-h-full w-full flex flex-col justify-start items-center">
                <div className="flex justify-center">
                  <DeviceImage size={150} isIPad={isIPad} />
                </div>
                <div className="w-full">
                  <DeviceInfo isIPad={isIPad} editFlag={true} />
                </div>
                <div className="flex w-full text-center my-16">
                  <Button className="mx-4" size="lg" variant="flat" fullWidth onClick={handleReset}>
                    Return
                  </Button>
                  <Button className="mx-4" size="lg" variant="flat" fullWidth onClick={handleSumbit}>
                    Submit
                  </Button>
                </div>
                <div className="py-4">&nbsp;</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
