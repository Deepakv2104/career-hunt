export interface User {
  userId: number;
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
  role: Role;
}

export enum Role {
    ADMIN = 'ADMIN',
    EMPLOYER = 'EMPLOYER',
    USER = 'USER'
  }