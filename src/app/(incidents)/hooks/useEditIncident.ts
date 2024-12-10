import useSWR from 'swr';
import { update } from '@/app/actions/incidents.actions';
import { useToast } from '@/hooks/use-toast';
import { fetcherI } from './useIncidents';


// const fetcher = async () => {
//     const incidents = await findAll();
//     return incidents;
// };
// const fetcher = async () => {
//     const incidents = await findAll();
//     return incidents;
// };

export const useEditIncidents = (id:string) => {
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
                description: "No se pudo editar la incidencia!:" + error,
            })
            // mutate(prevData => prevData?.filter(incident => incident.id !== newIncident.id), false);
        }
    };
    
    async function destroyed () {
        try {
            if(!id) return
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
