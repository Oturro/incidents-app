import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UserForm from './UserForm'
import { useUsers } from '../hooks/useUsers'


const CreateUserDialog = () => {
    const { createUser } = useUsers()
    
    const [open, setOpen] = useState<boolean>(false)


    const submit = async (values: { name: string; email: string }) => {
        await createUser(values)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>Nuevo usuario</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Usuario nuevo</DialogTitle>
                    {/* <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription> */}
                </DialogHeader>
                <UserForm onSubmit={submit} />
            </DialogContent>
        </Dialog>
    )
}

export default CreateUserDialog