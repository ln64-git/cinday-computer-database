interface getNextDeviceIdProps {
  deviceArray: any[],
  deviceType: 'ipad' | 'laptop' | 'note'
}

export function getNextDeviceId(props: getNextDeviceIdProps) {
  if (!props.deviceArray || props.deviceArray.length === 0) {
    return 1;
  }

  let maxId = props.deviceArray[0][`${props.deviceType}_id`];

  for (const device of props.deviceArray) {
    const id = device[`${props.deviceType}_id`];
    if (id > maxId) {
      maxId = id;
    }
  }

  return maxId + 1;
}
