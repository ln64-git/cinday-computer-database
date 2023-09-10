import React from 'react'

interface DeviceImageProps {
  isIPad: boolean
  size: number
}

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function DeviceImage(props: DeviceImageProps) {
  if (props.isIPad) {
    return (
      <motion.div
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        transition={{ duration: .5, delay: .2 }}
      >
        <Image
          alt="image of iPad"
          height={props.size}
          width={props.size}
          src="/ipad.png"
        />
      </motion.div>
    )
  } else {
    return (
      <div>
        <Image
          alt="image of Laptop"
          height={props.size + props.size / 5}
          width={props.size + props.size / 5}
          src="/laptop.png"
        />
      </div>
    )
  }
}
