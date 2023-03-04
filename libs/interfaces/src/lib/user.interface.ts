export enum UserRole {
  Teacher = 'Teacher',
  Student = 'Student',
}

export interface IUSer {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
