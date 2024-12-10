'use server'

import { db } from "@/lib/db"





export async function create(user: { id: string, name: string, email: string }) {
    try {
        const { name, email } = user

        

        const createdUser = await db.user.create({
            data: {
                name, 
                email,
                role: "user",
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