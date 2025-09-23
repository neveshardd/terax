import { JWT_EXPIRES_IN, JWT_SECRET } from '../configs/env.js'
import prisma from '../configs/prisma.js'
import routers from '../configs/router.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userMessages } from '../exceptions/user.js'

routers.post('/register', async (req, res) => {
    const user = req.body
    const { name, email, password, confirmPassword } = user
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    if (password !== confirmPassword) {
        return res.status(422).json({
            message: userMessages.comparePasswords
        })
    }

    const existing = await prisma.user.findFirst({
        where: {
            email: email
        }
    })

    if (existing) {
        return res.status(409).json({
            message: userMessages.existingEmail
        })
    }

    try {

        await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hash
            }
        })

        res.status(201).json({
            message: userMessages.createdUser,
            data: {
                email: email,
                name: name,
            }
        })

    } catch (err) {
        return res.status(500).json({
            message: userMessages.internalError,
            error: err.message
        })
    }

})

routers.post('/login', async (req, res) => {
    const user = req.body
    const { email, password } = user

    const existing = await prisma.user.findFirst({
        where: {
            email: email,
        }
    })

    if (!existing) {
        return res.status(401).json({
            message: userMessages.incorrect
        })
    }

    const compare = await bcrypt.compare(password, existing.password)
    if (!compare) {
        return res.status(401).json({
            message: userMessages.incorrect
        })
    }

    try {

        const token = jwt.sign({
            id: existing.id,
            email: existing.email
        }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        })

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000
        })

        return res.status(200).json({
            message: userMessages.loggedIn,
            token
        })

    } catch (err) {
        res.status(500).json({
            message: userMessages.internalError,
            error: err.message
        })
    }
})


routers.get('/logout', async (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: false, 
        sameSite: "lax",
        path: "/",   
    });
    res.status(200).json({ message: "Logout realizado com sucesso!" });
});

export default routers
