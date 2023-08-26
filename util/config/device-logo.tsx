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
        initial={{ opacity: 0, }} // Initial state
        animate={{ opacity: 1, }} // Animation state
        transition={{ duration: .5, delay: .2 }} // Animation configuration
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
          height={props.size + props.size / 10}
          width={props.size + props.size / 10}
          src="/laptop.png"
        />
      </div>
    )
  }
}
