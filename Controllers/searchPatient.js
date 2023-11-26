import PatientData from "../models/PatientData.js";

async function searchPatient(req, res) {
  try {
    var searchedItem = req.body.search;
    let result;
    let errorFalse = true;
    var dataPropertiesName = [
      "patientName",
      "patientdescription",
      "patientrupees",
      "patientday",
      "patientmonth",
      "patientyear",
    ];

    for (let i = 0; i < dataPropertiesName.length; i++) {
      const currentProperty = await PatientData.find({
        [dataPropertiesName[i].toLowerCase()]: searchedItem.toLowerCase(),
      });

      if (currentProperty.length !== 0) {
        result = currentProperty;
        errorFalse = true;
        break;
      } else {
        errorFalse = false;
      }
    }

    if (!errorFalse) {
      res.status(404).send("Not found");
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export default searchPatient;
