import { faker } from '@faker-js/faker';
import fs from 'fs'; // Import the fs module

// Create mock data for iPads
export function generateMockData() {
  const mockIPadData = [];
  for (let i = 1; i <= 32; i++) {
    mockIPadData.push({
      ipad_id: i,
      name: faker.lorem.words(),
      software_version: faker.system.semver(),
      internal_model_id: faker.string.alphanumeric(10),
      external_model_id: faker.string.alphanumeric(15),
      serial_number: faker.string.alphanumeric(12),
      date_created: faker.date.past().toISOString(),
      date_modified: faker.date.recent().toISOString(),
      flag_repair: faker.datatype.boolean(),
    });
  }
  const mockLaptopData = [];
  for (let i = 1; i <= 32; i++) {
    mockLaptopData.push({
      laptop_id: i,
      name: faker.lorem.words(),
      software_version: faker.system.semver(),
      internal_model_id: faker.string.alphanumeric(10),
      external_model_id: faker.string.alphanumeric(15),
      serial_number: faker.string.alphanumeric(12),
      date_created: faker.date.past().toISOString(),
      date_modified: faker.date.recent().toISOString(),
      flag_repair: faker.datatype.boolean(),
    });
  }
  const mockIPadNotesData = [];
  for (let i = 1; i <= 16; i++) {
    mockIPadNotesData.push({
      note_id: i,
      ipad_id: faker.number.bigInt({ min: 1, max: 32 }), // Convert BigInt to string
      name: faker.lorem.words(),
      summary: faker.lorem.sentence(),
      date_created: faker.date.past().toISOString(),
      date_modified: faker.date.recent().toISOString(),
    });
  }
  const mockLaptopNotesData = [];
  for (let i = 1; i <= 16; i++) {
    mockLaptopNotesData.push({
      note_id: i,
      laptop_id: faker.number.bigInt({ min: 1, max: 32 }), // Convert BigInt to string
      name: faker.lorem.words(),
      summary: faker.lorem.sentence(),
      date_created: faker.date.past().toISOString(),
      date_modified: faker.date.recent().toISOString(),
    });
  }

  const jsonIPadNotesArray = JSON.stringify(mockIPadNotesData, null, 2);
  const jsonLaptopNotesArray = JSON.stringify(mockLaptopNotesData, null, 2);

  fs.writeFileSync('mockIPadNotesData.json', jsonIPadNotesArray); // Change 'mockData.json' to your desired file name
  fs.writeFileSync('mockLaptopNotesData.json', jsonLaptopNotesArray); // Change 'mockData.json' to your desired file name
  console.log("written.");

}
