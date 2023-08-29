
interface DeviceInfoProps {
  device: any,
  isIPad: boolean
  editFleg: boolean
}

export default function DeviceInfo(props: DeviceInfoProps) {
  if (props.isIPad) {
    return (
      <div >
        <div className="flex justify-center mt-6 mb-10 text-2xl font-bold">
          <p>{props.device.name}</p>
        </div>
        <div className="flex justify-between my-2 text-2xl">
          <p className="text-left truncate">Software Version:</p>
          <p>{props.editFleg ? props.device.software_version : (
            <div>
              edit
            </div>
          )}</p>
        </div>
        <div className="flex justify-between my-2 text-2xl">
          <p className="text-left truncate">Internal Model ID:</p>
          <p>{props.device.internal_model_id}</p>
        </div>
        <div className="flex justify-between my-2 text-2xl">
          <p className="text-left truncate">External Model ID:</p>
          <p>{props.device.external_model_id}</p>
        </div>
        <div className="flex justify-between my-2 text-2xl">
          <p className="text-left truncate">Serial Number:</p>
          <p>{props.device.serial_number}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className="flex justify-center mt-6 mb-10 text-2xl font-bold">
          <p>{props.device.name}</p>
        </div>
        <div className="flex justify-between my-2 text-2xl">
          <p className="text-left truncate">Serial Number:</p>
          <p>{props.device.serial_number}</p>
        </div>
        <div className="flex justify-between my-2 text-2xl">
          <p className="text-left truncate">Springboro Tag ID:</p>
          <p>{props.device.springboro_tag_id}</p>
        </div>
        <div className="flex justify-between my-2 text-2xl">
          <p className="text-left truncate">Aux Funds PO ID:</p>
          <p>{props.device.aux_funds_po_id}</p>
        </div>
        <div className="flex justify-between my-2 text-2xl">
          <p className="text-left truncate">Cinday ID:</p>
          <p>{props.device.cinday_id}</p>
        </div>
      </div>
    );
  }
}
