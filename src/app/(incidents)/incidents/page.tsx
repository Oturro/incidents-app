'use client'


import { useSession } from 'next-auth/react'
import { auth } from '../../../../auth'
import IncidentsIndex from '../_components/IncidentsIndex'

export default function IncidentsPage() {

  // const session = await auth()

  const session = useSession()

  if (!session) {
    return <div>Not authenticated</div>
  }

  
  return (
    <div className='min-h-[100vh]'>
      <div className="wrapper">
        {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
        {/* <LogoutButton /> */}
        <IncidentsIndex />
      </div>
    </div>
  )
}
