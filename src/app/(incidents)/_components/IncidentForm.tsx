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
    onSubmit: (values: { title: string; description: string }) => void
}


export const IncidentForm = ({
    onSubmit
}: IncidentFormProps) => {

    const form = useForm<z.infer<typeof createIncidentSchema>>({
        resolver: zodResolver(createIncidentSchema),
        defaultValues: {
            title: "",
            description: ""
        },
    })

    function handleOnSubmit(values: z.infer<typeof createIncidentSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        onSubmit(values)
        // console.log(createdUser)

    }

    return (
        <>
            <h1 className='title'>Crear incidencia</h1>
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
                                <FormMessage />
                            </FormItem>


                        )}
                    />
                    <Button type="submit">Enviar</Button>
                </form>
            </Form>
        </>
    )
}

export default IncidentForm