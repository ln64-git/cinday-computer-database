import { laptop } from "@prisma/client";

export default function GetLaptopDevice(
  devices: any[],
  deviceId: number,
): laptop | undefined {
  return devices.find((device) => device.laptop_id === deviceId)
}