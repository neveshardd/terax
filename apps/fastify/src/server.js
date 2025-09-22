import express from 'express'
import rootRoute from './routes/root.js'
import userRoutes from './routes/auth.js'
import usersRoutes from './routes/private/users.js'
import { PORT } from './configs/env.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())

app.use(express.json())

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001'
    ],
    credentials: true,
    methods: ['GET', 'POST']
}))

app.use('/', rootRoute)
app.use('/api/v1', userRoutes)
app.use('/api/v1', usersRoutes)

app.listen(PORT, () => {
    console.log(`Server listening in http://localhost:${PORT}`)
})