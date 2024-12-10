'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { string, z } from "zod"



export async function create(user: any) {
    try {
        const { name, email } = user

        const adminRole = await db.role.findFirst({
            where: {
                name: 'user'
            }
        })

        const createdUser = await db.user.create({
            data: {
                name, 
                email,
                role: {
                    connect: {
                        id: adminRole?.id
                    }
                },
                accounts: {
                    create: []
                },
                incidents: {
                    create: []
                }
            }
        })
        return createdUser
    } catch (error) {
        console.error(error)
    }
}




export async function findAll() {
    try {

        const users = await db.user.findMany()
        return users
    } catch (error) {
        console.error(error)
    }
}


export async function destroy(id: string) {
    try {

        const users = await db.user.delete({
            where: {
                id
            }
        })
        return users
    } catch (error) {
        console.error(error)
    }
}