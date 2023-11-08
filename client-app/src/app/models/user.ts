import { Doctor } from "./doctor";

export interface User {
    username: string;
    displayName: string;
    token: string;
    favorites: Doctor[];
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}