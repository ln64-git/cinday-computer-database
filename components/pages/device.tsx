'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/react'
import DeviceImage from '@/util/config/device-logo'

export default function Device() {
  const pathname = usePathname()
  const isIPad = pathname.startsWith('/ipads')

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    try {
      console.log('Clicked!')
    } catch (error) {
      console.log('Error adding iPads to the database:', error)
    }
  }

  return (
    <div className="h-full flex flex-col justify-center">
      <DeviceImage size={200} isIPad={isIPad} />
      <Button onClick={handleSubmit}>CLICK ME DAMNIT</Button>
      <div className=" flex flex-grow h-full">Content</div>
      <div className=" flex flex-grow h-full">Content</div>
    </div>
  )
}
