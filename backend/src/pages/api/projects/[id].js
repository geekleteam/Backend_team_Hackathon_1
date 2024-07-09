// pages/api/projects/[id].js
import { getSession } from 'next-auth/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const {
    method,
    query: { id }
  } = req

  switch (method) {
    case 'PUT':
      const { name } = req.body
      const updatedProject = await prisma.project.update({
        where: { id: parseInt(id) },
        data: { name }
      })
      res.status(200).json(updatedProject)
      break
    case 'DELETE':
      await prisma.project.delete({
        where: { id: parseInt(id) }
      })
      res.status(204).end()
      break
    default:
      res.setHeader('Allow', ['PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
