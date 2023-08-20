import AddIPad from "./AddIPad"

const addAllIPads = async () => {
  try {
    const iPadArray = [
      [
        {
          name: "High School 1 iPad 15",
          software_version: "13.5.1",
          internal_model_id: "MR7G2LL/A",
          external_model_id: "A1893 (iPad 6th Gen)",
          serial_number: "GG7X47QQJF8K",
        },
        {
          name: "Middle 1 Device 7",
          software_version: "12.5.6",
          internal_model_id: "MD785LL/A",
          external_model_id: "A1474 (iPad Air 1st Gen)",
          serial_number: "DMPMT8YWFK10",
        },
        {
          name: "Activation Locked (black cover blue tape)",
          software_version: "Activation Locked",
          internal_model_id: "Activation Locked",
          external_model_id: "A1458 (iPad 4th Gen)",
          serial_number: "DMRMVK7YF182",
        },
        {
          name: "Activation Locked (White, CinDay case)",
          software_version: "Activation Locked",
          internal_model_id: "Activation Locked",
          external_model_id: "A2270 (iPad 8th Gen)",
          serial_number: "H96FF19GQ1GD",
        },
        {
          name: "Locked (Gold, Keyboard Case)",
          software_version: "Locked",
          internal_model_id: "Locked",
          external_model_id: "A1673 (iPad Pro 2nd Gen)",
          serial_number: "DMPRD9D6H1MR",
        },
        {
          name: "Middle School 1 Device 5",
          software_version: "15.7.2",
          internal_model_id: "MNV22LL/A",
          external_model_id: "A1566 (iPad Air 2st Gen)",
          serial_number: "DMPST24PHG5D",
        },
        {
          name: "Middle School 1 Device 6",
          software_version: "12.5.6",
          internal_model_id: "MD785LL/A",
          external_model_id: "A1474 (iPad Air 1st Gen)",
          serial_number: "DMPMT8YWFK10",
        },
        {
          name: "High School 1 Device 6",
          software_version: "15.7.1",
          internal_model_id: "MR7G2LL/A",
          external_model_id: "A1893 (iPad 6 Gen)",
          serial_number: "GG7X4A3HJF8K",
        },
        {
          name: "High School Device 8",
          software_version: "15.6",
          internal_model_id: "MR7G2LL/A",
          external_model_id: "A1893 (iPad 6 Gen)",
          serial_number: "GG7X3729JF8K",
        },
      ],
    ]
    // Loop through the array and call AddIPad function for each iPad
    for (const iPad of iPadArray) {
      await AddIPad({ iPad }) // Pass the iPad object as an object property
    }
    console.log("All iPads added successfully!")
  } catch (error) {
    console.log("Error adding iPads to the database:", error)
  }
}

export default addAllIPads()
