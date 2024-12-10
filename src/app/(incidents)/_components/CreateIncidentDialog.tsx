import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import IncidentForm from './IncidentForm'
import { useIncidents } from '../hooks/useIncidents'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'



const CreateIncidentDialog = () => {
    // const { createUser } = useUsers()
    const { createIncident } = useIncidents()
    
    const [open, setOpen] = useState<boolean>(false)


    const submit = async (values: { title: string; description: string }) => {
        await createIncident(values)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='flex gap-1 items-center justify-center'>
                <Button>
                    <Plus size={16} />Agregar incidencia
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Incidencia nueva</DialogTitle>
                    {/* <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription> */}
                </DialogHeader>
                <IncidentForm onSubmit={submit} />
            </DialogContent>
        </Dialog>
    )
}

export default CreateIncidentDialog