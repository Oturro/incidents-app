'use client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Incident } from '@prisma/client'

import { useIncidents } from '../hooks/useIncidents'
import CreateIncidentDialog from './CreateIncidentDialog'


import EditIncidentDialog from './EditIncidentDialog'
import DestroyIncidentDialog from './DestroyIncidentDialog'




const IncidentsIndex = () => {
    const { incidents, error } = useIncidents();
    

    if (error) return <div>Error cargando las incidencias</div>;

    return (
        <>
            <div className='flex items-center mt-8' >
                <h1 className='title'>Incidencias</h1>
                <div className='ml-auto'>
                    <CreateIncidentDialog />
                </div>
            </div>


            <Table className=''>
                <TableCaption>
                    {
                        !incidents ? <div>Loading...</div> : (
                            incidents?.length == 0 && <div>No hay incidencias en esta sessión</div>
                        )
                    }
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Titulo</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead className='text-right'>Opciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className={`${!incidents && 'flex items-center justify-center'}`}>
                    {
                        incidents?.map((incident: Incident) => (
                            <TableRow key={incident.id}>
                                <TableCell className="font-medium">{incident.title}</TableCell>
                                <TableCell>{incident.description}</TableCell>
                                <TableCell className='flex justify-end space-x-1'>
                                    <EditIncidentDialog id={incident.id} />
                                    <DestroyIncidentDialog id={incident.id} />
                                    
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default IncidentsIndex