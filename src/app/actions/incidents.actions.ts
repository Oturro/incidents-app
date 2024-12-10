'use server'

import { db } from "@/lib/db"
import { Incident } from "@prisma/client"
import { auth } from "../../../auth"

export async function create(incident: Incident) {

    const session = await auth()

    const loggedUser = await db.user.findFirst({
        where:{
            email: session?.user?.email
        }
    })
    try {
        const { title, description, closed} = incident
        const createdIncident = await db.incident.create({
            data: {
                title, 
                description,
                closed,
                user: {
                    connect: {
                        id: loggedUser?.id
                    }
                }
            }
        })
        return createdIncident
    } catch (error) {
        console.error(error)
    }
}

// export async function update(incident: any) {
export async function update(incident: { id: string; title: string; description: string, closed:boolean }) {
    
    try {
        const { id, title, description, closed} = incident
        const createdIncident = await db.incident.update({
            where:{id},
            data: {
                title, 
                description,
                closed,
            }
        })
        return createdIncident
    } catch (error) {
        console.error(error)
    }
}


export async function findOne(id:string) {
    
    try {
        
        const finded = await db.incident.findFirst({
            where:{id}
        })
        return finded
    } catch (error) {
        console.error(error)
    }
}


export async function findAll() {
    const session = await auth()
    try {

        const incidents = await db.incident.findMany({
            where: {
                user: {
                    // email: 'riderbacknoruego@gmail.com'
                    // email: 'orlenides@gmail.com'
                    email: session?.user?.email
                }
            }
        })
        return incidents
    } catch (error) {
        console.error(error)
    }
}


export async function destroy(id: string) {
    try {

        const incident = await db.incident.delete({
            where: {
                id
            }
        })
        return incident
    } catch (error) {
        console.error(error)
    }
}