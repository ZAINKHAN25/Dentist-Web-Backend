import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
    patientName: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    },
    patientdescription: {
        type: String,
        require: false
    },
    patientrupees:{
        type: Number,
        require: true
    },
    patientday:{
        type: Number,
        require: true
    },
    patientmonth:{
        type: Number,
        require: true    
    },
    patientyear:{
        type: Number,
        require: true    
    },

},
    { timestamps: true }
)

export default mongoose.model("PatientData", PatientSchema)