"use server"

import { z } from "zod"
import { signIn } from "../../../../auth"
import { loginSchema, resetPasswSchema, signUpSchema } from "@/lib/ZodSchemas"
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


export const resetAction = async (values: z.infer<typeof resetPasswSchema>) => {

    try {
        const {data, success} = resetPasswSchema.safeParse(values)

        if(!success) {
            return { error: "Datos inválidos" }
        }

        const user = await db.user.findFirst({
            where: {
                email: data.email,
            },

        })

        if (!user) {
            return { error: "El usuario no existe" }
        } else {
            const password = await bcrypt.hash(data.newpass, 10)
            
            await db.user.update({
                where: {
                    email: user.email as string
                },
                data: {
                    password
                }
            })
    
            return ({ success: true })

        }

    } catch (error) {
        if(error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }

        return { error: `error 500 ${error}` }
    }
}

export const signupAction = async (values: z.infer<typeof signUpSchema>) => {
    
    try {
        const {data, success} = signUpSchema.safeParse(values)

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