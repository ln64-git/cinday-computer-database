'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/react'
import DeviceImage from '@/util/device-logo'
import AddAllIPadNotes from '../server/iPadNote/AddAllIPadNotes'

export default function Content() {
  const pathname = usePathname()
  const isIPad = pathname.startsWith('/ipads')

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    try {
      await AddAllIPadNotes() // Correct function name and use await
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
