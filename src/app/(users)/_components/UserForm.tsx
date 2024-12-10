'use client'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createUserSchema } from '@/lib/ZodSchemas'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    
    FormField,
    FormItem,
    
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


interface UserFormProps {
    onSubmit: (values:any) => void
}


export const UserForm = ({
    onSubmit
}: UserFormProps) => {

    const form = useForm<z.infer<typeof createUserSchema>>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            email: ""
        },
    })

    function handleOnSubmit(values: z.infer<typeof createUserSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // const createdUser = create(values)
        onSubmit(values)
        // console.log(createdUser)

    }

    return (
        <>
            <h1 className='title'>Crear usuario</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel>Username</FormLabel> */}
                                <FormControl>
                                    <Input placeholder="Nombre de usuario" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}

export default UserForm