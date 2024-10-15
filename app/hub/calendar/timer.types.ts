export enum Status {
  Active = 'active',
  Archived = 'archived',
}

export type User = {
  id: String;
  name?: String;
  fullName?: String;
  birthDate?: Date;
  gender?: String;
  hashedPassword?: String;
  email?: String;
  image?: String;
  roles?: string[];
  job?: String;
  department?: String;
  employeeNumber?: String;
  personalPhoneNumber?: String;
  companyPhoneNumber?: String;
  companyCode?: String;
  nextMedicalAppointment?: Date;
  nextMedicalAppointmentLocal?: String;
  contractType?: String;
  contractStartDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Tag = { id: string; name: string; status: Status };
