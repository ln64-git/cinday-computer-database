export default function convertDeviceToLaptop(inputObject: any) {
  const fieldsToRemove = ["internal_model_id", "external_model_id", "software_version"];
  const outputObject = { ...inputObject };

  for (const field of fieldsToRemove) {
    delete outputObject[field];
  }

  return outputObject;
}