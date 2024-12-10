'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/lib/ZodSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginAction } from '../actions/auth.actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LoginForm = () => {
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function handleOnSubmit(values: z.infer<typeof loginSchema>) {
        //:@TODO
        setError(null)
        startTransition(async () => {
            const response = await loginAction(values)
            if (response.error) { setError(response.error) } else {
                router.push('/incidents')
            }
        })

    }

    return (
        <>
            <h1 className='title text-center w-full'>Iniciar sesión</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOnSubmit)} className="flex flex-col justify-center space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='pt-4'>
                                {/* <FormLabel>Email</FormLabel> */}
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel>Password</FormLabel> */}
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        <FormMessage>{error}</FormMessage>
                    }
                    <Button disabled={isPending} type="submit" className='bg-green-700 mx-auto'>Iniciar sesión</Button>
                    <div className='text-center w-full'>
                        <p className='text-[18px]' >No tienes una cuenta?</p>
                        <Link href={'/signup'} >Registrate aquí</Link>
                        {/* <p className=''>Registrate aquí</p> */}
                    </div>
                </form>
            </Form>
        </>
    )
}

export default LoginForm