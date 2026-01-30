export type UserRole = "user" | "admin";

export interface AppUser {
  uid: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface UserProfileType {
  id: string;
  email: string;
  role: UserRole;
  username: string;
  createdAt: Date;
}