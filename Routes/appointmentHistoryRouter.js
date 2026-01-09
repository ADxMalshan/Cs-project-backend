import express from 'express';
import { createAppointment, deleteAppointment, getAppointment, updateAppointment } from '../controllers/appointmentHistroyController.js';

const appointmentRouter = express.Router();

appointmentRouter.post('/',createAppointment);
appointmentRouter.get('/',getAppointment);
appointmentRouter.put('/:appointmentId',updateAppointment)
appointmentRouter.delete('/:appointmentId',deleteAppointment)
export default appointmentRouter;