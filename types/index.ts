import {User} from "@prisma/client"


export type safeUser = Omit<User, "createdAt" | "updateAt" | "emailVerified"> & {
    createdAt: string;
    updateAt: string;
    emailverified: string | null; // Align with the casing in your actual data
}
