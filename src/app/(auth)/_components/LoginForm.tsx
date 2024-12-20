'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/lib/ZodSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginAction } from '../actions/auth.actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const LoginForm = () => {
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const [emailReset, setEmailReset] = useState<string | null>(null)
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
            if (response.error) { 
                setError(response.error)
                if(response.error == "Password incorrecto!") {
                    setEmailReset(values.email)
                }
            } else {
                router.push('/incidents')
            }
        })

    }

    return (
        <>
            {/* <h1 className='title text-center w-full'> */}
            <p className='flex flex-col w-full justify-center gap-2 items-center'>
                    <Image
                        alt='logo'
                        src={'/logov2.svg'}
                        width={50}
                        height={0}
                    />
                    <div className='flex-col text-center text-[32px] gap-2 leading-10'>
                        <p>Incidencias</p>
                        <p>Online</p>
                    </div>
                </p>
            {/* </h1> */}
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
                        {/* {
                            error == "Password incorrecto!" && emailReset !=null && <p className='text-[16px] text-green-600'>Ha olvidado su contraseña? Haga click <span><Link href={`/reset/${emailReset}`} className='text-red-600' >aquí</Link></span></p>
                        } */}
                        {
                            <p className='text-[16px] text-green-600'>Ha olvidado su contraseña? Haga click <span><Link href={`/reset/${emailReset}`} className='text-red-600' >aquí</Link></span></p>
                        }
                        
                    </div>
                </form>
            </Form>
        </>
    )
}

export default LoginForm