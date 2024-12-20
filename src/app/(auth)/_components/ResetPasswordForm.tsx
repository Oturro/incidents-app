'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { resetPasswSchema } from '@/lib/ZodSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { resetAction } from '../actions/auth.actions'
import Link from 'next/link'

const ResetPasswordForm = () => {
    const [error, setError] = useState<string | null>(null)
    const [info, setInfo] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof resetPasswSchema>>({
        resolver: zodResolver(resetPasswSchema),
        defaultValues: {
            email: "",
            newpass: "",
            confirm: ""
        },
    })

    async function handleOnSubmit(values: z.infer<typeof resetPasswSchema>) {
        //:@TODO
        setError(null)
        startTransition(async () => {
            const response = await resetAction(values)
            if (response.error) {
                setError(response.error)
            } else {
                setInfo("Contraseña reseteada con éxito")
                form.reset({ newpass: "", confirm: "" })
                form.control._disableForm(true)
            }
        })

    }

    return (
        <>
            <p className='flex flex-col w-full justify-center gap-2 items-center'>
                <div className='flex-col text-center text-[32px] gap-2 leading-10'>
                    <p>Resetear contraseña</p>
                </div>
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOnSubmit)} className="flex flex-col justify-center space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='pt-4'>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Entre el email de su cuenta" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="newpass"
                        render={({ field }) => (
                            <FormItem className='pt-4'>
                                <FormLabel>Nueva contraseña</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Entre la nueva contraseña" {...field} />
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
                        name="confirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmar contraseña</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirme la contraseña" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        <FormMessage>{error}</FormMessage>
                    }
                    <Button disabled={(isPending || info != null) && true} type="submit" className='bg-green-700 mx-auto'>Resetear</Button>
                    <div className='text-center w-full'>
                        {
                            info !== null ? (
                                <>
                                    <p className='text-[18px] text-green-500 font-bold' >{info}</p>
                                    <p className='text-green-500'>Ya puede volver a logearse <span><Link href={'/login'} className='text-red-500'>aquí</Link></span></p>
                                </>
                            ) : (
                                <>
                                    <p className='text-[18px]' >No necesitas resetar?</p>
                                    <p>Entra a tu cuenta <span><Link href={'/login'} className='text-red-500' >aquí</Link></span></p>
                                </>
                            )
                        }


                    </div>
                </form>
            </Form>
        </>
    )
}

export default ResetPasswordForm