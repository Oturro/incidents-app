'use client'

import { GetServerSideProps } from 'next';
import { auth } from '../../../../auth'
import UserIndex from '../_components/UserIndex'
import { Session } from '@/app/(incidents)/incidents/page';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await auth();
  if (!session) {
    return {
      redirect: {
        destination: '/login', // redirigir a la página de inicio de sesión si no está autenticado 
        permanent: false,
      },
    };
  }

  return {
    props: {
      session, // pasar la sesión como una prop al componente 
    },
  };
};


export default async function UserPage({ session }: { session: Session }) {

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
