import { getSession } from 'next-auth/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { method } = req

  switch (method) {
    case 'GET':
      const projects = await prisma.project.findMany({
        where: { userId: session.userId }
      })
      res.status(200).json(projects)
      break
    case 'POST':
      const { name } = req.body
      const project = await prisma.project.create({
        data: { name, userId: session.userId }
      })
      res.status(201).json(project)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
