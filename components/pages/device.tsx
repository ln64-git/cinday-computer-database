"use client"
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DeviceImage from '@/util/config/device-logo';
import DeviceInfo from '../features/device/device-info';
import GetDevice from '@/util/function/device/get-device';
import { motion } from 'framer-motion'
import { Button, Card, CardHeader, Input } from '@nextui-org/react'
import { PlusIcon } from '../interface/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setEditFlag } from '@/util/lib/redux-toolkit/reducers/interface/edit-flag-slice';
import { RootState } from '@/util/lib/redux-toolkit/store';
import EditIPad from '@/util/server/iPad/EditIPad';
import EditLaptop from '@/util/server/laptop/EditLaptop';
import convertToDateIPadData from '@/util/function/convert/to-date/convert-to-date-ipad-data';
import convertToDateLaptopData from '@/util/function/convert/to-date/convert-to-date-laptop-data';
import { setUserDevice } from '@/util/lib/redux-toolkit/reducers/user-device-slice';
import DeleteIPad from '@/util/server/iPad/DeleteIPad';
import DeleteLaptop from '@/util/server/laptop/DeleteLaptop';
import GetDeviceNoteArray from '@/util/function/device/get-device-notes';
import { ipad_note, laptop_note } from '@prisma/client';
import AddIPadNote from '@/util/server/iPadNote/AddIPadNote';
import AddLaptopNote from '@/util/server/laptopNote/AddLaptopNote';

export default function Device() {
  const router = useRouter()
  const pathname = usePathname();
  const isIPad = pathname.startsWith('/ipads');
  const deviceId = parseInt(pathname.split('/').pop() || '');
  const device = GetDevice(deviceId, isIPad);
  const deviceNotes = GetDeviceNoteArray(deviceId, isIPad)

  const [isMobile, setIsMobile] = useState(true);
  const dispatch = useDispatch();

  const editFlag = useSelector(
    (state: RootState) => state.edit.status,
  )
  const userDevice = useSelector(
    (state: RootState) => state.userDevice.state,
  )


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 1080);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    dispatch(setEditFlag(false))
  }, [dispatch])

  const [submitOverlay, setSubmitOverlay] = useState(false)
  const [deleteOverlay, setDeleteOverlay] = useState(false)
  const [noteOverlay, setNoteOverlay] = useState(false)

  const overlay = submitOverlay || deleteOverlay || noteOverlay

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
        await EditIPad({
          userDevice: convertToDateIPadData(userDevice),
          deviceId: deviceId
        })
      } else {
        await EditLaptop({
          userDevice: convertToDateLaptopData(userDevice),
          deviceId: deviceId
        })
      }
    } finally {
      router.push("/")
    }
  }

  const [userDeviceNote, setUserNoteState] = useState({
    note_id: '',
    laptop_id: '',
    ipad_id: '',
    name: '',
    summary: '',
  });


  const handleSubmitNote = async () => {
    try {
      if (isIPad) {
        await AddIPadNote(convertToDateIPadData(userDeviceNote), deviceId)
      } else {
        await AddLaptopNote(convertToDateLaptopData(userDeviceNote), deviceId)
      }
    } finally {
      setNoteOverlay(false)
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
        initial={{ opacity: 0 }} // Start with opacity 0 and y offset
        animate={{ opacity: 1 }} // Fade-in and move up to original position
        exit={{ opacity: 0 }} // Fade-out and move up during exit
        transition={{ duration: .8 }} // Animation duration and type
        className="w-full h-full flex flex-wrap justify-center "
      >
        <div className='w-full h-full flex justify-center'>
          {!isMobile ? (
            <div className='w-4/5 md:px-0 md:w-2/3  my-8'>
              <div className={`${overlay ? 'filter blur-md pointer-events-none overflow-hidden h-full max-h-full w-full flex flex-col justify-start items-center' : 'h-full max-h-full w-full flex flex-col justify-start items-center'}`}>
                <div className='flex justify-center'>
                  <DeviceImage size={150} isIPad={isIPad} />
                </div>
                <div className='w-full '>
                  <DeviceInfo device={device} isIPad={isIPad} editFlag={editFlag} />
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
                  <div className='w-1/2 text-center my-16'>
                    <Button size='lg' variant='flat' fullWidth onClick={() => dispatch(setEditFlag(!editFlag))}>edit</Button>
                  </div>
                )}

                <div className='w-full h-full text-l   '>
                  {deviceNotes?.map((note: ipad_note | laptop_note, index: number) => (
                    <Card
                      key={index}
                      className="justify-center w-full"
                    >
                      <CardHeader className="flex justify-center items-center gap-3">
                        <DeviceImage size={60} isIPad={isIPad} />
                        <div className="min-h-[55px] flex flex-row justify-between items-center w-full">
                          <div className="flex flex-col items-start">
                            <p className="">{device.name}</p>
                            <p className="font-bold">{note.name}</p>
                          </div>
                          <Button onClick={() => { router.push('/' + (isIPad ? 'ipads/' : 'laptops/') + deviceId + '/' + note.note_id) }}>Details</Button>
                        </div>
                      </CardHeader>
                      <div className='pb-4 bt-6 px-8'>
                        {note.summary}
                      </div>
                    </Card>
                  ))}

                  <div className='w-full my-4'>
                    <Card
                      className="justify-center w-full "
                    >
                      <CardHeader className="flex justify-start items-center gap-3   ">
                        <div className='w-full  flex justify-center items-center'>
                          <div className="min-h-[55px] flex flex-row  items-center w-2/3">
                            <Button onClick={() => { setNoteOverlay(true) }} fullWidth variant='light' color="default"><PlusIcon /></Button>
                          </div>
                        </div>
                      </CardHeader>
                      <div className='pb-4 bt-6 px-8 flex justify-center'>
                        New Note
                      </div>
                    </Card>
                  </div>
                </div>
                <div className='py-4'>&nbsp;</div>
              </div>
            </div>
          ) : (
            <div className='flex flex-col h-full flex-grow  items-center max-w-6xl '>
              <div className=' h-full w-full flex justify-between items-center '>
                <div className='flex flex-col justify-center items-center py-12 pl-32 '>
                  <div className=' flex items-center justify-center flex-col pb-6 pt-12 '>
                    <motion.div
                      initial={{ opacity: 0, x: -100 }} // Start with opacity 0 and move in from the left (x: -100)
                      animate={{ opacity: 1, x: 1 }} // Fade-in and move to original position (x: 0)
                      exit={{ opacity: 0, x: -100 }} // Fade-out and move out to the left (x: -100)
                      transition={{ duration: .1 }} // Animation duration and type
                      className='  flex justify-center items-center h-1/2 py-12'>
                      <DeviceImage size={250} isIPad={isIPad} />
                    </motion.div>
                  </div>
                </div>
                <div className=' flex flex-col justify-center items-center  px-12 '>
                  <div className=' w-full mx-12   flex flex-col justify-center items-center '>
                    <motion.div
                      initial={{ opacity: 0 }} // Start with opacity 0 and y offset
                      animate={{ opacity: 1 }} // Fade-in and move up to original position
                      exit={{ opacity: 0 }} // Fade-out and move up during exit
                      transition={{ duration: .8 }} // Animation duration and type
                      className='w-full mb-10 mt-12 '>
                      <DeviceInfo device={device} isIPad={isIPad} editFlag={editFlag} />
                    </motion.div>
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
                      <div className='w-1/2 text-center my-16'>
                        <Button size='lg' variant='flat' fullWidth onClick={() => dispatch(setEditFlag(!editFlag))}>edit</Button>
                      </div>
                    )}

                  </div>
                </div>
                <div className=' h-2/4'></div>
              </div>
              <div className='w-full h-full text-l'>
                <motion.div
                  initial={{ opacity: 0, y: 100 }} // Start with opacity 0 and move up (y: 100)
                  animate={{ opacity: 1, y: 0 }} // Fade-in and move up to original position (y: 0)
                  exit={{ opacity: 0, y: -100 }} // Fade-out and move up during exit (y: -100)
                  transition={{ duration: .4 }} // Animation duration and type
                  className='flex flex-wrap justify-center'
                >
                  {deviceNotes?.map((note: ipad_note | laptop_note, index: number) => (
                    <Card
                      key={index}
                      className="justify-center w-1/3 m-4"
                    >
                      <CardHeader className="flex justify-center items-center gap-3">
                        <DeviceImage size={60} isIPad={isIPad} />
                        <div className="min-h-[55px] flex flex-row justify-between items-center w-full">
                          <div className="flex flex-col items-start">
                            <p className="">{device.name}</p>
                            <p className="font-bold">{note.name}</p>
                          </div>
                          <Button onClick={() => { router.push('/' + (isIPad ? 'ipads/' : 'laptops/') + deviceId + '/' + note.note_id) }}>Details</Button>
                        </div>
                      </CardHeader>
                      <div className='pb-4 bt-6 px-8'>
                        {note.summary}
                      </div>
                    </Card>
                  ))}
                  <Card
                    className="justify-center w-1/3 m-4"
                  >
                    <CardHeader className="flex justify-start items-center gap-3   ">
                      <div className='w-full  flex justify-center items-center'>
                        <div className="min-h-[55px] flex flex-row  items-center w-2/3">
                          <Button onClick={() => { setNoteOverlay(true) }} fullWidth variant='light' color="default"><PlusIcon /></Button>
                        </div>
                      </div>
                    </CardHeader>
                    <div className='pb-4 bt-6 px-8 flex justify-center'>
                      New Note
                    </div>
                  </Card>
                </motion.div>
                <div className='flex justify-center'>
                </div>
              </div>
              <div className='py-4'>&nbsp;</div>
            </div>
          )}

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
                    Are you sure you would like to update {device.name}?
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
                    Are you sure you would like to delete {device.name}?
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

          {noteOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="z-10 absolute inset-0 flex justify-center items-center mt-0  backdrop-blur bg-background/80 h-full">
              <div className="w-4/5 md:px-0 md:w-2/3 my-8 h-full pt-12">
                <div className="h-full max-h-full w-full flex flex-col justify-center py-32 items-center text-2xl  mt-16">
                  <div className='h-full flex items-end text-center '>
                    <Card
                      className="justify-center w-full my-4"
                    >
                      <CardHeader className="flex justify-center items-center gap-3 ">
                        <DeviceImage size={60} isIPad={isIPad} />
                        <div className="min-h-[55px] flex flex-row justify-between items-center w-full">
                          <div className="flex flex-col items-start">
                            <p>{device.name}</p>
                            <Input
                              type="text"
                              name="name"
                              value={userDeviceNote.name}
                              variant='bordered'
                              onChange={handleInputChange}
                              classNames={{ input: ["text-left"] }}
                            />
                          </div>
                        </div>
                      </CardHeader>
                      <div className='pb-4 bt-6 px-8'>
                        <Input
                          type="text"
                          name="summary"
                          value={userDeviceNote.summary}
                          variant='bordered'
                          onChange={handleInputChange}
                          classNames={{ input: ["text-left"] }}
                        />
                      </div>
                    </Card>
                  </div>
                  <div className="flex w-full mx-4 h-full items-end ">
                    <Button onClick={() => { setNoteOverlay(false) }} size='lg' className='mx-4' variant='ghost' fullWidth >Return</Button>
                    <Button onClick={handleSubmitNote} size='lg' className='mx-4' variant='ghost' fullWidth >Submit</Button>
                  </div>

                  <div className='h-full '></div>
                </div>
              </div>
            </motion.div>
          )}


          {/* {noteOverlay2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="z-10 absolute inset-0 flex justify-center items-center mt-0  backdrop-blur bg-background/80 h-full">
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
                              <Input
                                type="text"
                                name="name"
                                value={userDeviceNote.name}
                                variant='bordered'
                                onChange={handleInputChange}
                                classNames={{ input: ["text-left"] }}
                              />
                            </div>
                          </div>
                        </CardHeader>
                        <div className='pb-4 bt-6 px-8'>
                          <Input
                            type="text"
                            name="summary"
                            value={userDeviceNote.summary}
                            variant='bordered'
                            onChange={handleInputChange}
                            classNames={{ input: ["text-left"] }}
                          />
                        </div>
                      </Card>
                    </div>
                    <div className='flex justify-between  w-1/2'>
                      <div className='w-1/3 text-center my-16 mx-2'>
                        <Button
                          className="mx-4"
                          size="lg"
                          variant="flat"
                          fullWidth
                          onClick={() => { setNoteOverlay(false) }}>
                          Return
                        </Button>
                      </div>
                      <div className='w-1/3 text-center my-16 mx-2'>
                        <Button
                          className="mx-4"
                          size="lg"
                          variant="flat"
                          fullWidth
                          onClick={handleSubmitNote}>
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )} */}


        </div>
      </motion.div>
    );
  }
}
