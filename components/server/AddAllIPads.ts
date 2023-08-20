import AddIPad from './AddIPad'
import ipadData from '../../../cinday backup/ipads.json'

const AddAllIPads = async () => {
  const ipads = stringToDate(ipadData)
  console.log(ipads)

  try {
    for (const ipad of ipads) {
      await AddIPad(ipad)
    }
    console.log('All iPads added successfully!')
  } catch (error) {
    console.log('Error adding iPads to the database:', error)
  }
}

export default AddAllIPads

const stringToDate = (ipads: any) => {
  return ipads.map((ipad: any) => ({
    ...ipad,
    date_created: new Date(ipad.date_created),
    date_modified: new Date(ipad.date_modified),
  }))
}
