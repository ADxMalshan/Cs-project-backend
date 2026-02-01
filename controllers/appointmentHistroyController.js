import appointment from "../models/appointmentHistory.js";
import image from "../models/image.js";


export async function createAppointment(req, res) {
    console.log(req.body);
    if (req.user == null) {
        res.status(403).json({
            message: "unauthorized"
        })
        return;
    }
    if (req.user.isDisabled) {
        res.status(403).json({
            message: "Your account is disabled"
        })
        return;
    }
    const body = req.body
    const appointmentData = {
        appointmentId: "",
        email: req.user.email,
        name: body.name,
        petDetails: body.petDetails,
        details: body.details,
        appointmentDate: body.appointmentDate,
        phoneNumber: body.phone,
        imageUrl: " ",
    }
    appointment.find().sort({
        date: -1
    }).limit(1).then(async (lastAppointments) => {
        if (lastAppointments.length == 0) {
            appointmentData.appointmentId = "APP0001"
            console.log("done")
        } else {
            const lastAppointment = lastAppointments[0]
            const lastAppointmentId = lastAppointment.appointmentId  //APP001
            const lastAppointmentNumber = lastAppointmentId.replace("APP", "")  //001
            const lastAppointmentNumberInt = parseInt(lastAppointmentNumber) //1
            const newAppointmentNumberInt = lastAppointmentNumberInt + 1
            const newAppointmentNumberstr = newAppointmentNumberInt.toString().padStart(4, "0")
            appointmentData.appointmentId = "APP" + newAppointmentNumberstr
        }

        await image.find({
            petType: body.petDetails.petType
        }).then((images) => {
            appointmentData.imageUrl = images[0].link
        }).catch((err) => {
            console.log(err);
        })
        const appointments = new appointment(appointmentData)
        appointments.save().then(() => {
            res.json({
                message: "Appointment saved successfully"
            })
        }).catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "An error occurred"
            })
        })
    })


}

export function getAppointment(req, res) {
    if (req.user == null) {
        res.status(403).json({
            message: "unauthorized"
        })
        return;
    }
    if (req.user.role == "admin") {
        appointment.find().then(
            (appointments) => {
                res.json(appointments)
            }
        ).catch(
            (err) => {
                res.status(500).json({
                    message: "appointment not found"
                })
            }
        )
    }
    else {
        appointment.find({
            email: req.user.email
        }).then(
            (appointments) => {
                res.json(appointments)
            }
        ).catch(
            (err) => {
                res.status(500).json({
                    message: "appointment not found"
                })
            }
        )
    }

}




export async function updateAppointment(req, res) {
    console.log(req.params);
    try {
        if (req.user == null) {
            res.status(401).json({
                message: "unauthorized"
            })
            return;
        }
        if (req.user.role !== "admin" && req.user.role !== "superadmin") {
            res.status(403).json({
                message: "unauthorized"
            })
            return;
        }

        const appointmentId = req.params.appointmentId
        let appointmen = await appointment.findOneAndUpdate({ appointmentId: appointmentId }, req.body)
        res.json({
            message: "Appointment updated successfully"
        })

    }
    catch (err) {
        console.log(err)
        res.status(500).json(
            {
                message: "An error occurred"
            }
        )

    }

}

export async function deleteAppointment(req, res) {
    try {
        console.log(req.user);
        if (req.user == null) {
            res.status(401).json({
                message: "unauthorized"
            })
            return
        }
        if (req.user.role !== "admin" && req.user.role !== "superadmin") {
            res.status(403).json({
                message: "unauthorized"
            })
            return
        }

        const appointmentId = req.params.appointmentId
        const appointmentDeleted = await appointment.findOneAndDelete({ appointmentId: appointmentId, email: req.user.email })
        if (appointmentDeleted == null) {
            res.status(404).json({
                message: "Appointment not found"
            })
            return
        }
        res.json({
            message: "Appointment deleted successfully"
        })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "An error occurred"
        })
    }
}