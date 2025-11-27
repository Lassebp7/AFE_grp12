import { auth } from "@/app/auth/auth";
import { redirect } from "next/navigation";
import CreateExerciseForm from "./create-exercise-form";

interface AddProps {
  params: {
    id: string; // The dynamic segment [id] will be available here
  };
}

export default async function AddExercisePage({ params }: AddProps) {
  const { id } = await params;
  const session = await auth();
  const role = session?.user.role;

  if (role !== "PersonalTrainer") {
    redirect("/dashboard");
  }

  // Use a component wrapper to keep this page on 'use server' implicitely
  return <CreateExerciseForm workoutId={id} />;
}
