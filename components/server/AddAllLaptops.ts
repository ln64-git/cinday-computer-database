import AddLaptop from './AddLaptop'
import laptopData from '../../../cinday backup/laptops.json'

const AddAllLaptops = async () => {
  const laptops = stringToDate(laptopData)

  try {
    for (const laptop of laptops) {
      await AddLaptop(laptop)
    }
    console.log('All laptops added successfully!')
  } catch (error) {
    console.log('Error adding laptops to the database:', error)
  }
}

export default AddAllLaptops

const stringToDate = (laptops: any) => {
  return laptops.map((laptop: any) => ({
    ...laptop,
    date_created: new Date(laptop.date_created),
    date_modified: new Date(laptop.date_modified),
  }))
}
