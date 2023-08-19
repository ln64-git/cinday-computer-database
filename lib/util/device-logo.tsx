import React from 'react'
import { Image } from '@nextui-org/react'

interface DeviceImageProps {
  isIPad: boolean
}

export default function DeviceImage(props: DeviceImageProps) {
  if (props.isIPad) {
    return (
      <div>
        <Image
          alt="image of iPad"
          height={40}
          radius="sm"
          src="/ipad.png"
          width={40}
        />
      </div>
    )
  } else {
    return (
      <div>
        <Image
          alt="image of Laptop"
          height={100}
          radius="sm"
          src="/laptop.png"
          width={40}
        />
      </div>
    )
  }
}
