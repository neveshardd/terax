import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../configs/env.js'
import { tokenMessages } from '../exceptions/token.js'

console.log('Middleware carregado')

export const authMiddleware = (req, res, next) => {
    console.log('Middleware da rota: ', req.path)

    const token = req.cookies?.access_token

    if (!token) return res.status(401).json({
        message: tokenMessages.notToken
    })

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
        console.log('Cookies recebidos:', req.cookies);
    } catch (err) {
        return res.status(403).json({
            message: tokenMessages.invalidToken
        })
    }
}