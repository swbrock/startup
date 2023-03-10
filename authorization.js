import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
export async function getAuthUser(req, res, next) {}

export async function protect(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Unauthorized' })
    }
}

try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id
        }
    })
    req.user = user
    next()
} catch (error) {
    next ({ message: 'Unauthorized'})
}