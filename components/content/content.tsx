'use client'
import DeviceImage from '@/lib/util/device-logo'
import { usePathname } from 'next/navigation'

export default function Content() {
  const pathname = usePathname()
  const isIPad = pathname === '/ipads'

  return (
    <div className="h-full">
      <DeviceImage isIPad={isIPad} />
      <div className="bg-emerald-700 flex flex-grow h-full">Content</div>
      <div className="bg-stone-700 flex flex-grow h-full">Content</div>
    </div>
  )
}
