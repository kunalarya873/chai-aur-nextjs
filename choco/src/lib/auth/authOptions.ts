import GoogleProvider from "next-auth/providers/google";
import { users } from "@/lib/db/schemas";
import { db } from "../db/db";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            async profile(profile, token: any) {
                console.log('Received profile:', profile);
                console.log('Received token:', token);

                const data = {
                    fname: profile.given_name,
                    lname: profile.family_name,
                    email: profile.email,
                    provider: 'GOOGLE',
                    externalId: profile.sub,
                    image: profile.picture,
                };

                try {
                    const user = await db
                        .insert(users)
                        .values(data)
                        .onConflictDoUpdate({
                            target: users.email,
                            set: data,
                        })
                        .returning();

                    if (user.length === 0) {
                      throw new Error("User insertion failed");
                    }

                    return {
                        ...data,
                        id: String(user[0].id),
                        role: user[0].role,
                    };
                } catch (error) {
                    console.error("Error inserting/updating user:", error);
                    return { id: '' };
                }
            },
        }),
    ],
    callbacks: {
        session(data: any){
            return data;
        },
        jwt({token, user}: {token: any; user: any}){
            if (user){
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        }
    }
};