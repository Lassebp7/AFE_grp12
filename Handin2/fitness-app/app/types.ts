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

export interface exercise {
  exerciseId: number,
  groupId: string,
  name: string,
  description: string,
  sets: number,
  repetitions: number,
  time: string,
  workoutProgramId: number,
  personalTrainerId: number
}

export interface Workout {
  workoutProgramId?: number,
  groupId?: string,
  name: string,
  description: string,
  exercises: exercise[],
  personalTrainerId?: number,
  clientId: number
}