import PatientData from "../models/PatientData.js";

async function searchSinglePatient(req, res) {
  try {
    const uniqueId = req.body.uid;

    const result = await PatientData.findById(uniqueId);

    if (!result) {
      return res.status(404).send("Patient not found");
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export default searchSinglePatient;
