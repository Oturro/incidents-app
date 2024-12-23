import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"



import { Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EditIncidentForm from './EditIncidentForm'
import { useEditIncidents } from '../hooks/useEditIncident'


const EditIncidentDialog = ({id}:{id:string }) => {
    // const { createUser } = useUsers()
    const { updateIncident, incident } = useEditIncidents(id)
    
    
    const [open, setOpen] = useState<boolean>(false)


    const submit = async (values: { title: string; description: string, closed: boolean}) => {
        await updateIncident(values)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='flex gap-1 items-center justify-center'>
                <Button variant={'ghost'} size='sm' >
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Incidencia nueva </DialogTitle>
                    {/* <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription> */}
                </DialogHeader>
                <EditIncidentForm onSubmit={submit} incident={incident} />
            </DialogContent>
        </Dialog>
    )
}

export default EditIncidentDialog