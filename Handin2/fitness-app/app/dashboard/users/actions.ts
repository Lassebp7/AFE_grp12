import { User } from "@/app/types";
import { get } from "@/utils/api";

export async function getClientsByTrainer(): Promise<User[]> {
    try {
        return await get("/Users/Clients");
    } catch (error) {
        throw error;
    }
}