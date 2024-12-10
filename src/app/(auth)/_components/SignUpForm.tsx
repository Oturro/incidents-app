'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUpSchema } from '@/lib/ZodSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signupAction } from '../actions/auth.actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SignUpForm = () => {
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            secondname: "",
            lastname: "",
            email: "",
            password: ""
        },
    })

    async function handleOnSubmit (values: z.infer<typeof signUpSchema>) {
        //:@TODO
        setError(null)
        startTransition(async () => {
            const response = await signupAction(values)
            if(response.error) { 
                setError(response.error) 
            }else {
                router.push('/incidents')
            }
        })
        
    }

    return (
        <>
            <h1 className='title text-center'>Registro</h1>
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
                        name="secondname"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Primer apellido" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Segundo apellido" {...field} />
                                </FormControl>
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
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        <FormMessage>{ error }</FormMessage>
                    }
                    <Button disabled={isPending} type="submit" className='bg-green-700'>Registrarse</Button>
                    <div className='text-center w-full'>
                        <p className='text-[18px]' >Ya tienes una cuenta?</p>
                        <Link href={'/login'} >Inicia sesión</Link>
                        {/* <p className=''>Registrate aquí</p> */}
                    </div>
                </form>
            </Form>
        </>
    )
}

export default SignUpForm