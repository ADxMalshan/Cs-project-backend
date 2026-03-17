import express from 'express';
import { createAppointment, deleteAppointment, getAppointment, updateAppointment, updateAppointmentUser } from '../controllers/appointmentHistroyController.js';

const appointmentRouter = express.Router();

appointmentRouter.post('/',createAppointment);
appointmentRouter.get('/',getAppointment);
appointmentRouter.put('/:appointmentId',updateAppointment)
appointmentRouter.put('/user/:appointmentId',updateAppointmentUser)
appointmentRouter.delete('/:appointmentId',deleteAppointment)
export default appointmentRouter;