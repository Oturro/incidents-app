import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIncidents } from '../hooks/useIncidents'


const DestroyIncidentDialog = ({ id }: { id: string }) => {
    
    const { deleteIncident } = useIncidents()


    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant={'destructive'} >
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Esta seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta accion no puede deshacer. Esto borrará permanentemente la incidencia de la base de datos
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>deleteIncident(id)}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default DestroyIncidentDialog