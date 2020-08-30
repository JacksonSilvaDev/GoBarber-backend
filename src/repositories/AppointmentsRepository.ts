import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

// DTO - Data Transfer Object
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  /**
   * all
   */
  public all(): Appointment[] {
    return this.appointments;
  }

  /**
   * findByDate
   */
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment => {
      return isEqual(date, appointment.date);
    });

    return findAppointment || null;
  }

  /**
   * create
   * provider: string, date: Date
   */
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
