export enum UserRole {
  Teacher = 'Teacher',
  Student = 'Student',
}

export interface IUSer {
  _id?: string;
  displayname?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
