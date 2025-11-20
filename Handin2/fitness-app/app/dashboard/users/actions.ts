import { authenticatedFetch } from "@/utils/authFetch";

export async function getClientsByTrainer() {
    try {
        await authenticatedFetch// API call to fetch clients for a trainer
    } catch (error) {
        throw error;
    }
}