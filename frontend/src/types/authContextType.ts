import { User } from "./auth"

export type AuthContextType = {
    user: User | null;
    isLoggedIn: boolean
    login : (user:User) => void
    logout: () => void
}