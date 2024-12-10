'use client'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createIncidentSchema } from '@/lib/ZodSchemas'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'

interface IncidentFormProps {
    onSubmit: (values: { title: string; description: string, closed: boolean}) => void
    incident: {
        id: string;
        title: string;
        description: string;
        userId: string | null;
        closed: boolean;
    } | undefined
}


export const EditIncidentForm = ({
    onSubmit,
    incident,
}: IncidentFormProps) => {

    const form = useForm<z.infer<typeof createIncidentSchema>>({
        resolver: zodResolver(createIncidentSchema),
        defaultValues: {
            title: `${incident?.title}`,
            description: `${incident?.description}`
        },
    })

    function handleOnSubmit(values: z.infer<typeof createIncidentSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const updaValues = {
            ...values,
            closed: false
        }
        onSubmit(updaValues)
        // console.log(createdUser)

    }

    return (
        <>
            <h1 className='title'>Editar incidencia</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Título de la incidendia" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Debe poner un titulo claro y descriptivo.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Redacta una descripción clara y detallada de la incidencia"
                                        className="w-full resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    You can <span>@mention</span> other users and organizations.
                                </FormDescription>
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

export default EditIncidentForm