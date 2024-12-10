import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import LogoutButton from '@/app/(auth)/_components/LogoutButton'


export default function Navbar() {
    return (

        <div className='w-full py-4 bg-slate-500'>
            <div className='flex  wrapper'>
                <LogoutButton />
                <NavigationMenu className='ml-auto'>
                    <NavigationMenuList className='ml-auto'>
                        <NavigationMenuItem>

                            <NavigationMenuTrigger className='bg-transparent text-white' >Item One</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>

                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

            </div>

        </div>

    )
}
