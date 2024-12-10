


import { GetServerSideProps } from 'next';
import { auth } from '../../../../auth'
import IncidentsIndex from '../_components/IncidentsIndex'
import { User } from '@prisma/client';

export interface Session {
  userId: string;
  user: User;
  username: string;
  token: string; // Agrega otros campos que tu sesión incluya 
}

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


export default async function IncidentsPage({ session }: { session: Session }) {

  // const session = await auth()

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
