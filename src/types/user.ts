export type UserRole = "user" | "admin";

export interface AppUser {
  uid: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}