export type UserRoles = "Client" | "PersonalTrainer" | "Manager";

export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    personalTrainerId?: number;
    accountType: UserRoles;
}