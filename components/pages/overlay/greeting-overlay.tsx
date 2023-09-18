"use client";
import { Button } from '@nextui-org/react';
import Home from '../home';
import { motion } from "framer-motion";
import { ipad, ipad_note, laptop, laptop_note } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setDemoStatus } from '@/util/lib/redux-toolkit/reducers/demo-slice';
import { useEffect, useState } from 'react';
import { RootState } from '@/util/lib/redux-toolkit/store';

interface GreetingOverlayProps {
  iPadArray?: ipad[];
  iPadNotesArray?: ipad_note[];
  laptopArray?: laptop[];
  laptopNotesArray?: laptop_note[];
}

export default function GreetingOverlay(data: GreetingOverlayProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [overlay, setOverlay] = useState(false);
  const demoStatus = useSelector((state: RootState) => state.demo.status);
  if (!demoStatus) {
    setOverlay(true)
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setOverlay(true);
    }, 600000); // 10 minutes in milliseconds
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="h-full flex flex-col items-center justify-center gap-4">
      <Home {...data} verifiedUser={true} />
      {overlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="z-10 absolute inset-0 flex justify-center items-center mt-0 bg-background backdrop-blur bg-background/90"
        >
          <div className="w-4/5 md:px-0 md:w-2/3 my-8 h-full pt-72">
            <div className="h-full max-h-full w-full flex flex-col justify-start items-center">
              <div className="w-4/5 px-4">
                {/* ... (your content here) */}
              </div>
              <div className="flex flex-col w-1/2 my-16 justify-center align-middle">
                <Button
                  className="my-4 w-full"
                  variant='flat'
                  size="lg"
                  fullWidth
                  onClick={() => {
                    router.push('/api/auth/signin');
                  }}
                >
                  Login
                </Button>
                <Button
                  className="my-4 w-full"
                  variant='flat'
                  size="lg"
                  fullWidth
                  onClick={() => {
                    dispatch(setDemoStatus(true));
                    setOverlay(false);
                  }}
                >
                  Demo
                </Button>
              </div>
              <div className="py-4">&nbsp;</div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
