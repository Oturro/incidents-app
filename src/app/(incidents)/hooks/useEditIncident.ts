import useSWR, { MutatorCallback, mutate } from 'swr';
import { findAll, create, update, findOne, destroy } from '@/app/actions/incidents.actions';
import { useToast } from '@/hooks/use-toast';
import { fetcherI } from './useIncidents';
import { useState } from 'react';

// const fetcher = async () => {
//     const incidents = await findAll();
//     return incidents;
// };
// const fetcher = async () => {
//     const incidents = await findAll();
//     return incidents;
// };

export const useEditIncidents = (id:any) => {
    const { toast } = useToast()

    

    const { data, error, mutate } = useSWR('findAllIncidents', fetcherI);

    // toast({
    //     title: 'Existe?',
    //     description: id
    // })
    const incident = data?.find((inci)=>inci.id == id)

    async function updateIncident (values: { /* id: string,  */title: string; description: string, closed: boolean}) {

        const theIn = {id, ...values}

        try {
            await update(theIn);
            mutate();
            toast({
                title: "Incidencia editada",
                description: "La incidencia ha sido editada con exito!",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo editar la incidencia!",
            })
            // mutate(prevData => prevData?.filter(incident => incident.id !== newIncident.id), false);
        }
    };
    
    async function destroyed () {
        try {
            if(!id) return
            const inci = await destroy(id)
            mutate()
        } catch (error) {
            console.error(error)
        }
    }

    

    return {
        incident,
        error,
        updateIncident,
        destroyed,
    };
};
