import NextAuth from "next-auth"
import { db } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    ...authConfig,
    session: { strategy: "jwt" },
    callbacks: {
        jwt({ token, user }) {
            console.log('@@@@@@@@@User....', user)
            if (user) { // User is available during sign-in
                token.id = user.id
                token.role = user.role
            }
            console.log('@@@@@@@Token....', token)
            return token
        },
        session({ session, token }) {
            if(session.user){
                // session.user.id = token.id
                session.user.role = token.role
            }
            return session
        },
    },

})
