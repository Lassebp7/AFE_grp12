export type UserRoles = "Client" | "PersonalTrainer" | "Manager" | undefined;

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personalTrainerId?: number;
  accountType: UserRoles;
}

export interface SessionUser {
  name: string | null | undefined;
  id: string | undefined;
  role: UserRoles;
}
