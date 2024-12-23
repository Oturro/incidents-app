import useSWR from 'swr';
import { findAll, create, destroy } from '@/app/actions/incidents.actions';
import { useToast } from '@/hooks/use-toast';
import { Incident } from '@prisma/client';



export const fetcherI = async () => {
    // const session = await auth()
    const incidents = await findAll();
    return incidents;
};

export const useIncidents = () => {

    const { toast } = useToast()
    const { data, error, mutate } = useSWR('findAllIncidents', fetcherI);


    async function createIncident(values: { title: string; description: string }) {

         
        const newIncident: Incident = {
            id: Date.now().toString(),
            userId: null,
            modifiedAt: null,
            createdAt: null,
            closed: false,
            ...values
        };

        mutate(prevData => [...(prevData ?? []), newIncident], false);

        try {
            await create(newIncident);
            mutate();
            toast({
                title: "Incidencia insertada",
                description: "La incidencia ha sido insertada con exito!",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo insertar la incidencia!" + error,
            })
            mutate(prevData => prevData?.filter(incident => incident.id !== newIncident.id), false);
        }
    };

    async function deleteIncident (id: string) {

        mutate(prevData => prevData?.filter(incident => incident.id !== id), false);
        toast({
            title: "Incidencia eliminada",
            description: "La incidencia ha sido borrada correctamente!"
        })

        try {
            await destroy(id)
        } catch (error) {
            toast({
                title: "Error",
                description: "Ha ocurrido un error y no se ha podido eliminar la incidencia" + error
            })
            mutate()
        }
    }
    

    return {
        incidents: data,
        error,
        createIncident,
        deleteIncident,
    };
};
