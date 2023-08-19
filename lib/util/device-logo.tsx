import React from 'react'
import { Image } from '@nextui-org/react'

interface DeviceImageProps {
  isIPad: boolean
  size: number
}

export default function DeviceImage(props: DeviceImageProps) {
  if (props.isIPad) {
    return (
      <div>
        <Image
          alt="image of iPad"
          height={props.size}
          width={props.size}
          radius="sm"
          src="/ipad.png"
        />
      </div>
    )
  } else {
    return (
      <div>
        <Image
          alt="image of Laptop"
          height={props.size + props.size / 10}
          width={props.size + props.size / 10}
          radius="sm"
          src="/laptop.png"
        />
      </div>
    )
  }
}
