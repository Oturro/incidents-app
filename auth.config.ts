import { loginSchema } from "@/lib/ZodSchemas"
import { db } from "@/lib/db"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'

// Notice this is only an object, not a full Auth.js instance
export default {
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// credentials: {
			//   email: {},
			//   password: {},
			// },
			authorize: async (credentials) => {

				const { data, success } = loginSchema.safeParse(credentials)

				if (!success) {
					throw new Error("Credenciales inválidas")
				}

				const user = await db.user.findFirst({
					where: {
						email: data.email,
					},

				})

				if (!user) throw new Error("Usuario inexistente!")

				if (!user.password) throw new Error('Hubo un problema con el password en la BD!')

				const isValid = await bcrypt.compare(data.password, user.password)

				if (!isValid) throw new Error("Password incorrecto!")

				return user

			},
		})
	],
} satisfies NextAuthConfig