'use client'

import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from "next-auth/react"



export default function LogoutButton() {

	

	const [isPending, startTransition] = useTransition()

	const handleClick = async () => {
		startTransition(async ()=>{
			await signOut({
				callbackUrl: '/login'
			})

		})
	}

	return (
		<Button variant={"link"} disabled={isPending} onClick={handleClick}>Logout</Button>
	)
}
