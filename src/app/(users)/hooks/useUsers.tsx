import useSWR from 'swr';
import { findAll, create } from '@/app/actions/users.actions';
import { useToast } from '@/hooks/use-toast';

const fetcher = async () => {
    const users = await findAll();
    return users;
};

export const useUsers = () => {

    const { toast } = useToast()
    const { data, error, mutate } = useSWR('findAll', fetcher);

    async function createUser (values: { name: string; email: string }) {
        const newUser = { id: Date.now().toString(), ...values };

        // Actualización optimista
        // mutate(prevData => [...(prevData ?? []), newUser], false);
        mutate()
        try {
            await create(newUser);
            mutate(); // Revalida después de la creación
            toast({
                title: "Usuario insertado",
                description: "El usuario ha sido insertado con exito!",
            })
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "No se pudo insertar el usuario!",
            })
            // Revertir la actualización optimista en caso de error
            mutate(prevData => prevData?.filter(user => user.id !== newUser.id), false);
        }
    };

    return {
        users: data,
        error,
        createUser,
    };
};
