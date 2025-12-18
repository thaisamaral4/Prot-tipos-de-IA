
export enum ServiceType {
  CONSULTA = 'CONSULTA',
  EXAME = 'EXAME'
}

export interface Service {
  id: string;
  type: ServiceType;
  name: string;
  description: string;
  basePrice: number;
  preparationInfo?: string;
}

export interface Unit {
  id: string;
  name: string;
  address: string;
  availableServices: string[]; // Array of service IDs
  availableHours: Record<string, string[]>; // Date (YYYY-MM-DD) -> Times
}

export enum AppointmentStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

export interface Appointment {
  id: string;
  serviceId: string;
  unitId: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  createdAt: string;
  status: AppointmentStatus;
}

export type BookingStep = 'SERVICE_TYPE' | 'DETAILS' | 'UNIT' | 'DATE_TIME' | 'PATIENT_INFO' | 'CONFIRMATION';
