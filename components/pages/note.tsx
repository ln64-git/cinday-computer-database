"use client"
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DeviceImage from '@/util/config/device-logo';
import GetDevice from '@/util/function/device/get-device';
import { motion } from 'framer-motion'
import { Button, Card, CardHeader, Input } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux';
import { setEditFlag } from '@/util/lib/redux-toolkit/reducers/interface/edit-flag-slice';
import { RootState } from '@/util/lib/redux-toolkit/store';
import convertToDateIPadData from '@/util/function/convert/to-date/convert-to-date-ipad-data';
import convertToDateLaptopData from '@/util/function/convert/to-date/convert-to-date-laptop-data';
import { setUserDevice } from '@/util/lib/redux-toolkit/reducers/user-device-slice';
import DeleteIPad from '@/util/server/iPad/DeleteIPad';
import DeleteLaptop from '@/util/server/laptop/DeleteLaptop';
import GetDeviceNote from '@/util/function/device/get-device-note';
import EditLaptopNote from '@/util/server/laptopNote/EditILaptopNote';
import EditIPadNote from '@/util/server/iPadNote/EditIPadNote';

export default function Note() {
  const router = useRouter()
  const pathname = usePathname();
  const pathArray = pathname.split('/');
  const isIPad = pathArray[1] == 'ipads';
  const deviceId = parseInt(pathArray[2]);
  const deviceNoteId = parseInt(pathArray[3]);

  const device = GetDevice(deviceId, isIPad);
  const deviceNote = GetDeviceNote(deviceNoteId, isIPad)

  const editFlag = useSelector((state: RootState) => state.edit.status,)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setEditFlag(false))
  }, [dispatch])

  const [submitOverlay, setSubmitOverlay] = useState(false)
  const [deleteOverlay, setDeleteOverlay] = useState(false)
  const overlay = submitOverlay || deleteOverlay

  const handleReturn = async () => {
    dispatch(setUserDevice(device))
    dispatch(setEditFlag(!editFlag))
  }

  const handleDelete = async () => {
    try {
      if (isIPad) {
        await DeleteIPad(deviceId)
      } else {
        await DeleteLaptop(deviceId)
      }
    } finally {
      router.push(`/`)
    }
  }

  const handleSubmit = async () => {
    try {
      if (isIPad) {
        await EditIPadNote({
          userDeviceNote: convertToDateIPadData(userDeviceNote),
          noteId: deviceNoteId
        })
      } else {
        await EditLaptopNote({
          userDeviceNote: convertToDateLaptopData(userDeviceNote),
          noteId: deviceNoteId
        })
      }
    } finally {
      router.push("/")
    }
  }

  useEffect(() => {
    if (overlay) {
      window.scrollTo(0, 0);
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [overlay]);

  const [userDeviceNote, setUserNoteState] = useState({
    note_id: deviceNote?.note.note_id || '',
    laptop_id: deviceNote?.note.laptop_id || '',
    ipad_id: deviceNote?.note.ipad_id || '',
    name: deviceNote?.note.name || '',
    summary: deviceNote?.note.summary || '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserNoteState((prevUserDevice) => ({
      ...prevUserDevice,
      [name]: value,
    }));
  };

  if (device) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .8 }}
        className="w-full h-full flex flex-wrap justify-center "
      >
        <div className='w-full h-full flex justify-center'>
          <div className='w-4/5 md:px-0 md:w-2/3  my-8'>
            <div className={`${overlay ? 'filter blur-md pointer-events-none overflow-hidden h-full max-h-full w-full flex flex-col justify-start items-center' : 'h-full max-h-full w-full flex flex-col justify-start items-center'}`}>
              <div className='flex justify-center my-8'>
                <DeviceImage size={150} isIPad={isIPad} />
              </div>
              <div className='w-full '>
                <Card
                  className="justify-center w-full my-4"
                >
                  <CardHeader className="flex justify-center items-center gap-3 ">
                    <DeviceImage size={60} isIPad={isIPad} />
                    <div className="min-h-[55px] flex flex-row justify-between items-center w-full">
                      <div className="flex flex-col items-start">
                        <p>{device.name}</p>
                        {editFlag ? (
                          <Input
                            type="text"
                            name="name"
                            value={userDeviceNote.name}
                            variant='bordered'
                            onChange={handleInputChange}
                            classNames={{ input: ["text-left"] }}
                          />
                        ) : (
                          <p className="font-bold">{deviceNote.note.name}</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <div className='pb-4 bt-6 px-8'>
                    {editFlag ? (
                      <Input
                        type="text"
                        name="summary"
                        value={userDeviceNote.summary}
                        variant='bordered'
                        onChange={handleInputChange}
                        classNames={{ input: ["text-left"] }}
                      />
                    ) : (
                      <p>{deviceNote.note.summary}</p>
                    )}
                  </div>
                </Card>
              </div>
              {editFlag ? (
                <div className='flex justify-between  w-full'>
                  <div className='w-1/3 text-center my-16 mx-2'>
                    <Button size='lg' color="danger" variant="light" fullWidth onClick={() => { setDeleteOverlay(true) }}>Delete</Button>
                  </div>
                  <div className='w-1/3 text-center my-16 mx-2'>
                    <Button size='lg' variant='flat' fullWidth onClick={handleReturn}>Return</Button>
                  </div>
                  <div className='w-1/3 text-center my-16 mx-2'>
                    <Button size='lg' color="secondary" variant="light" fullWidth onClick={() => { setSubmitOverlay(true) }}>Submit</Button>
                  </div>
                </div>
              ) : (
                <div className='w-1/2 text-center my-8'>
                  <Button size='lg' variant='flat' fullWidth onClick={() => dispatch(setEditFlag(!editFlag))}>edit</Button>
                </div>
              )}
            </div>
          </div>


          {submitOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="z-10 absolute inset-0 flex justify-center items-center mt-0  backdrop-blur bg-background/80 h-full">
              <div className="w-4/5 md:px-0 md:w-2/3 my-8 h-full pt-12">
                <div className="h-full max-h-full w-full flex flex-col justify-center py-32 items-center text-4xl  mt-16">
                  <div className='h-full flex items-end text-center'>
                    Are you sure you would like to update {deviceNote.note.name}?
                  </div>
                  <div className="flex w-full mx-4 h-full items-end ">
                    <Button onClick={() => { setSubmitOverlay(false) }} size='lg' className='mx-4' variant='ghost' fullWidth >Return</Button>
                    <Button onClick={handleSubmit} size='lg' className='mx-4' variant='ghost' fullWidth >Submit</Button>
                  </div>
                  <div className='h-full '></div>
                </div>
              </div>
            </motion.div>
          )}

          {deleteOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="z-10 absolute inset-0 flex justify-center items-center mt-0  backdrop-blur bg-background/80 h-full">
              <div className="w-4/5 md:px-0 md:w-2/3 my-8 h-full pt-12">
                <div className="h-full max-h-full w-full flex flex-col justify-center py-32 items-center text-4xl  mt-16">
                  <div className='h-full flex items-end text-center '>
                    Are you sure you would like to delete {deviceNote.note.name}?
                  </div>
                  <div className="flex w-full mx-4 h-full items-end ">
                    <Button onClick={() => { setDeleteOverlay(false) }} size='lg' className='mx-4' variant='ghost' fullWidth >Return</Button>
                    <Button onClick={handleDelete} size='lg' className='mx-4' variant='ghost' fullWidth >Submit</Button>
                  </div>
                  <div className='h-full '></div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    );
  }
}
