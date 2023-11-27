import PatientData from "../models/PatientData.js";

async function searchPatient(req, res) {
  try {
    const searchedItem = req.body.search;

    const fieldsToSearch = [
      "patientName",
      "patientdescription",
      "patientrupees",
      "patientday",
      "patientmonth",
      "patientyear",
    ];

    let result = [];
    let matchedField = null;

    for (const field of fieldsToSearch) {
      const query = { [field]: { $regex: new RegExp(searchedItem, 'i') } };
      const data = await PatientData.find(query);

      if (data && data.length > 0) {
        result = data;
        matchedField = field;
        break;
      }
    }

    res.status(200).json({ result, matchedField });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
}

export default searchPatient;
