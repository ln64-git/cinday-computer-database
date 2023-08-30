interface getNextDeviceIdProps {
  deviceArray: any[],
  isIPad: boolean
}

export function getNextDeviceId(props: getNextDeviceIdProps) {
  if (!props.deviceArray || props.deviceArray.length === 0) {
    return 1;
  }

  let maxId = props.isIPad ? props.deviceArray[0].ipad_id : props.deviceArray[0].laptop_id;

  for (const device of props.deviceArray) {
    const id = props.isIPad ? device.ipad_id : device.laptop_id;
    if (id > maxId) {
      maxId = id;
    }
  }

  return maxId + 1;
}
