import PatientData from "../models/PatientData.js";

async function addPatientData(req, res){
    try {
        const {patientName, patientdescription, patientrupees, patientday, patientmonth, patientyear} = req.body;
        if(patientName || patientrupees || patientday || patientmonth || patientyear) {
            const newPatient = new PatientData({
                patientName,
                patientdescription,
                patientrupees,
                patientday, 
                patientmonth, 
                patientyear
            });
            const patient = await newPatient.save()
            res.status(200).json(patient);
        } else {   
            console.error("Plese fill up the all form completely");
            res.status(404).send("Plese fill up the all form completely");
        }
    } catch (error) {
        console.error('Eror to add patient data:', error);
        res.status(404).send(error.message);
    }
}

export default addPatientData;