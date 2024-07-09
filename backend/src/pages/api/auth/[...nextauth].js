import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user
        } else {
          throw new Error('Invalid email or password')
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    jwt: true
  },
  callbacks: {
    async session(session, user) {
      session.userId = user.id
      return session
    },
    async jwt(token, user) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  }
})
