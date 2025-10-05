import { User } from "./usersSchema";

// Para insertar nuevos usuarios
export type NewUser = Omit<User, "id" | "created_at" | "updated_at">;

// Para actualizar usuarios
export type UpdateUser = Partial<Omit<User, "id" | "created_at">> & {
  id: number;
};
