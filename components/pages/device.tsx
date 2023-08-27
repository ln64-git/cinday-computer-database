"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import DeviceImage from '@/util/config/device-logo';
import DeviceInfo from '../features/device/device-info';
import GetDevice from '@/util/function/device/get-device';
import { motion } from 'framer-motion'
import { Button, Card, CardHeader } from '@nextui-org/react'
import MobileDetails from './mobile/mobile-details';
import { PlusIcon } from '../interface/icons';

export default function Device() {
  const pathname = usePathname();
  const isIPad = pathname.startsWith('/ipads');
  const deviceId = parseInt(pathname.split('/').pop() || '');
  const device = GetDevice(deviceId, isIPad);

  const [isMobile, setIsMobile] = useState(true); // Assuming the initial state is true

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 1080);
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <motion.div
      initial={{ opacity: 0 }} // Start with opacity 0 and y offset
      animate={{ opacity: 1 }} // Fade-in and move up to original position
      exit={{ opacity: 0 }} // Fade-out and move up during exit
      transition={{ duration: .5 }} // Animation duration and type
      className="w-full h-full flex flex-wrap justify-center "
    >
      <div className='w-full h-full flex justify-center   '>
        {!isMobile ? (
          <MobileDetails device={device} isIPad={isIPad} />
        ) : (
          <div className='flex flex-col h-full flex-grow  items-center max-w-6xl '>
              <div className=' h-full w-full flex justify-between items-center '>
              <div className='flex flex-col justify-center items-center py-12 pl-32 '>
                <div className=' flex items-center justify-center flex-col pb-6 pt-12 '>
                  <div className='  flex justify-center items-center h-1/2 py-12'>
                    <DeviceImage size={250} isIPad={isIPad} />
                  </div>
                </div>
              </div>
              <div className=' flex flex-col justify-center items-center  px-12 '>
                <div className=' w-full mx-12   flex flex-col justify-center items-center '>
                  <div className='w-full mb-10 mt-12 '>
                    <DeviceInfo device={device} isIPad={isIPad} />
                  </div>
                  <div className='w-1/2  text-center  '>
                    <Button size='lg' variant='flat' fullWidth>edit</Button>
                  </div>
                </div>
              </div>
              <div className=' h-2/4'></div>
            </div>
            <div className='w-full h-full text-l'>
              <div className='flex flex-wrap justify-center'>
                <Card
                  className="justify-center w-1/3 m-4"
                >
                  <CardHeader className="flex justify-center items-center gap-3   ">
                    <DeviceImage size={60} isIPad={isIPad} />
                    <div className="min-h-[55px] flex flex-row justify-between items-center w-full ">
                      <div className="flex flex-col items-start ">
                        <p className="">
                          {device.name}
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
                <Card
                  className="justify-center w-1/3 m-4"
                >
                  <CardHeader className="flex justify-start items-center gap-3   ">
                    <div className='w-full  flex justify-center items-center'>
                      <div className="min-h-[55px] flex flex-row  items-center w-2/3">
                        <Button fullWidth color="default"><PlusIcon /></Button>
                      </div>
                    </div>
                  </CardHeader>
                  <div className='pb-4 bt-6 px-8 flex justify-center'>
                    New Note
                  </div>
                </Card>
              </div>
              <div className='flex justify-center'>
              </div>
            </div>
            <div className='py-4'>&nbsp;</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
