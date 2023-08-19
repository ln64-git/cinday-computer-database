'use client'
import DeviceImage from '@/lib/util/device-logo'
import { usePathname } from 'next/navigation'

export default function Content() {
  const pathname = usePathname()
  const isIPad = pathname.startsWith('/ipads')
  return (
    <div className="h-full">
      <DeviceImage size={200} isIPad={isIPad} />
      <div className=" flex flex-grow h-full">Content</div>
      <div className=" flex flex-grow h-full">Content</div>
    </div>
  )
}
