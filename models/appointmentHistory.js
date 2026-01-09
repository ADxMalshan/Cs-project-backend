import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    appointmentId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now

    },
    appointmentDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    petDetails: [
        {
            petType: {
                type: String,
                required: true
            },
            petBreed: {
                type: String,
                required: true
            },
            petAge: {
                type: Number,
                required: true
            }
        }
    ],
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
    phoneNumber: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    details:{
        type:String,
        required:false
    }
    

});
const appointment = mongoose.model("AppointmentHistory", appointmentSchema);
export default appointment;