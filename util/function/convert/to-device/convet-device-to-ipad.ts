export default function convertDeviceToIPad(inputObject : any) {
  const fieldsToRemove = ["springboro_tag_id", "aux_funds_po_id", "cinday_id"];
  const outputObject = { ...inputObject };

  for (const field of fieldsToRemove) {
    delete outputObject[field];
  }

  return outputObject;
}