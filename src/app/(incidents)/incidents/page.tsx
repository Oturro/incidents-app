

import LogoutButton from '@/app/(auth)/_components/LogoutButton'
import { auth } from '../../../../auth'
import IncidentsIndex from '../_components/IncidentsIndex'

export default async function page() {

  const session = await auth()

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
