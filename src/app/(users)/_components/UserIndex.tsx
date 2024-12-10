'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import CreateUserDialog from './CreateUserDialog'
import { findAll } from '@/app/actions/users.actions'
import { User } from '@prisma/client'
import useSWR from 'swr'
import { useUsers } from '../hooks/useUsers'

const fetcher = async () => { const lists = await findAll(); return lists; };


const UserIndex = () => {
    const { users, error } = useUsers();

    if (error) return <div>Error loading data</div>;

    return (
        <>
            <div className='flex items-center' >
                <h1 className='title'>Usuarios</h1>
                <div className='ml-auto'>
                    <CreateUserDialog />
                </div>
            </div>


            <Table className=''>
                <TableCaption>
                    {
                        !users && <div>Loading...</div>
                    }
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className='text-right'>Incidencias</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className={`${!users && 'flex items-center justify-center'}`}>
                    {
                        users?.map((user: User) => (
                            <TableRow>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="text-right">Ver incidencias</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default UserIndex