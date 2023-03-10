import express from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { protect } from './middleware.js'

const prisma = new PrismaClient()

function getAuthRoutes (app) {
  const router = express.Router()
  
  router.post('/google-login', googleLogin)
  router.get('/me', protect, me)
    router.get('/signout', signout)

  return router
}

async function googleLogin (req, res) {
  const { username, email } = req.body
    let user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (!user) {
        user = await prisma.user.create({
            data: {
                username: username,
                email: email
            }
        })
    }
    const tokenPayload = { id: user.id }
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.cookie('token', token, { httpOnly: true })
    res.status(200).send({ token })
}

async function me (req, res) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id
    }
  })
  res.status(200).json(user)
}

function signout (req, res) {
  res.clearCookie('token')
  res.status(200).json({ message: 'Signed out' })
}