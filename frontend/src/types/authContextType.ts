import { User } from "./auth"

export type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isLoggedIn: boolean
    login : (userData:User , token:string) => void
    logout: () => void
}