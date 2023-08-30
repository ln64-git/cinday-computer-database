import { ipad } from "@prisma/client";

export default function GetIPadDevice(devices: any[], deviceId: number): ipad | undefined {
  return devices.find((device) => device.ipad_id === deviceId)
}