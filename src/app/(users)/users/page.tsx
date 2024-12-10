'use client'

import { auth } from '../../../../auth'
import UserIndex from '../_components/UserIndex'

export default async function UserPage() {

  const session = await auth()
  console.log(session)
  if (session?.user.role !== "admin") {
    return (
      <div className='flex w-full min-h-screen items-center justify-center text-orange-600'>
        <p className='text-center font-bold title-sm'>
          No tiene permiso para acceder a esta configuración
        </p>
      </div>
    )
  }

  return (
    <div className='min-h-[100vh]'>
      <div className="wrapper">
        <UserIndex />
      </div>
    </div>
  )
}
