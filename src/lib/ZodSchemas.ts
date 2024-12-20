import { string, z } from "zod";

export const createUserSchema = z.object({
    email: string({ 'required_error': 'Debe poner el email' })
        .min(3, 'Debe tener mínimo 3 caracteres')
        .email("Email inválido"),
    name: string({ required_error: "Debe poner el nombre del usuario" })
        .min(3, "Debe tener mínimo 3 caracteres")
})


export const createIncidentSchema = z.object({
    title: string({ 'required_error': 'Debe poner el título' })
        .min(3, 'Debe tener mínimo 5 caracteres'),
    description: string({ 'required_error': 'Debe poner la descripción' })
        .min(5, 'Debe tener mínimo 3 caracteres')
})



export const loginSchema = z.object({
    email: string({ 'required_error': 'Debe poner el email' })
        .min(5, 'Debe tener mínimo 5 caracteres')
        .email("Email inválido"),
    password: string({ required_error: "Debe poner el password" })
        .min(8, "Debe tener mínimo 8 caracteres")
        .max(25, "Se acepta como máximo 25 caracteres")
        .regex(/[A-Z]/, { message: "La contraseña debe incluir al menos una letra mayúscula" })
        .regex(/[0-9]/, { message: "La contraseña debe incluir al menos un número" })
        .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe incluir al menos un carácter especial" })
        
})


export const signUpSchema = z.object({
    name: string({ 'required_error': 'Debe poner el nombre' })
        .min(3, 'Debe tener mínimo 3 caracteres'),
    secondname: string(),
    lastname: string(),
    email: string({ 'required_error': 'Debe poner el email' })
        .min(5, 'Debe tener mínimo 5 caracteres')
        .email("Email inválido"),
    password: string({ required_error: "Debe poner el password" })
        .min(8, "Debe tener mínimo 3 caracteres")
        .max(25, "Se acepta como máximo 25 caracteres")
        .regex(/[A-Z]/, { message: "La contraseña debe incluir al menos una letra mayúscula" })
        .regex(/[0-9]/, { message: "La contraseña debe incluir al menos un número" })
        .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe incluir al menos un carácter especial" })
        
})



export const resetPasswSchema = z.object({ 
    email: string({ 'required_error': 'Debe poner el email' })
        .min(5, 'Debe tener mínimo 5 caracteres')
        .email("Email inválido"),
    newpass: z.string({ required_error: 'Debe poner el password' }) 
        .min(8, "Debe tener mínimo 8 caracteres") 
        .max(25, "Se acepta como máximo 25 caracteres") 
        .regex(/[A-Z]/, { message: "La contraseña debe incluir al menos una letra mayúscula" }) 
        .regex(/[0-9]/, { message: "La contraseña debe incluir al menos un número" }) 
        .regex(/[^a-zA-Z0-9]/, { 
            message: "La contraseña debe incluir al menos un carácter especial" 
        }), 
    confirm: z.string({ required_error: "Debe confirmar el password" }) 
})
.refine((data) => data.newpass === data.confirm, { 
    message: "Las contraseñas no coinciden", path: ["confirm"], 
});