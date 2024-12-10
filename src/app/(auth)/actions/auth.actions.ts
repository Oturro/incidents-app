"use server"

import { z } from "zod"
import { auth, signIn, signOut } from "../../../../auth"
import { loginSchema, signUpSchema } from "@/lib/ZodSchemas"
import { AuthError } from "next-auth"
import { db } from "@/lib/db"
import bcrypt from 'bcryptjs'

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
    try {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false
        })

        return ({ success: true })
    } catch (error) {
        if(error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }

        return { error: "error 500" }
    }
}

export const signupAction = async (values: z.infer<typeof signUpSchema>) => {
    const session = await auth()
    try {
        const {data, error, success} = signUpSchema.safeParse(values)

        if(!success) {
            return { error: "Datos inválidos" }
        }

        const user = await db.user.findUnique({
            where: {
                email: data.email
            }
        })

        if(user)  return { error: "Ese usuario ya existe!" } 

        const password = await bcrypt.hash(data.password, 10)

        
        await db.user.create({
            data: {
                email: data.email,
                name: `${data.name} ${data.secondname} ${data.lastname}`,
                password,
                role: 'user'
            }
        })

        await signIn("credentials", {
            email: values.email,
            password: data.password,
            redirect: false
        })

        return ({ success: true })
        
    } catch (error) {
        if(error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }

        return { error: "error 500" }
    }
}