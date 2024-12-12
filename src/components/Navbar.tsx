

import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    
} from "@/components/ui/navigation-menu"
import LogoutButton from '@/app/(auth)/_components/LogoutButton'
import { auth } from '../../auth'
import Image from 'next/image'


export default async function Navbar() {
    const session = await auth()
	
	const username = session?.user.name
	const initial = username?.charAt(0).toUpperCase()

    return (

        <div className='w-full py-4 bg-slate-300'>
            <div className='flex  wrapper'>

                <p>
                    <Image 
                        alt='logo'
                        src={'/logo.svg'}
                        width={40}
                        height={0}
                    />
                </p>

                <NavigationMenu className='ml-auto'>
                    <NavigationMenuList className='ml-auto'>
                        <NavigationMenuItem>

                            <NavigationMenuTrigger className='bg-transparent text-orange-500 font-bold rounded-full' >{initial}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink >
                                    <LogoutButton />
                                </NavigationMenuLink>
                            </NavigationMenuContent>

                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

            </div>

        </div>

    )
}
