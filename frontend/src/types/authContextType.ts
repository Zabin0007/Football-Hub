import { User } from "./auth"

export type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isLoggedIn: boolean
    login : (user:User) => void
    logout: () => void
}