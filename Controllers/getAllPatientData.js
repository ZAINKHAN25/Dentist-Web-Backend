// Import necessary modules
import PatientData from "../models/PatientData.js";
import jwt from 'jsonwebtoken'

// Function to get all patient data
async function getAllPatientData(req, res) {
    try {
        let allPatientData = await PatientData.find();
        
        res.status(200).json({
            data: { allPatientData },
            status: 'Succes'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
}

// Export the function to be used in other files
export default getAllPatientData;
