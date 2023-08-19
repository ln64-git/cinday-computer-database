'use client'
import { Image } from '@nextui-org/react'

export default function Content() {
  return (
    <div className="h-full">
      <Image alt="iPad" src="/ipad.png" width={300} height={300} />
      <div className="bg-emerald-700 flex flex-grow h-full">Content</div>
      <div className="bg-stone-700 flex flex-grow h-full">Content</div>
    </div>
  )
}
