"use server";

import { User, UserRoles } from "@/app/types";
import { post } from "@/utils/api";

export async function createClient(personalTrainerId: number, formData: FormData) {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const newClient: User = {
        firstName,
        lastName,
        email,
        password,
        personalTrainerId,
        accountType: "Client",
        userId: 0
    };

    await post<User>("/Users", newClient);
}

export async function createTrainer(formData: FormData) {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const newTrainer: User = {
        firstName,
        lastName,
        email,
        password,
        personalTrainerId: undefined,
        accountType: "PersonalTrainer",
        userId: 0
    };

    await post<User>("/Users", newTrainer);
}