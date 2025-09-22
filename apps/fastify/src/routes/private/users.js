import prisma from "../../configs/prisma.js";
import { authMiddleware } from "../../middlewares/auth.js";
import routers from "../root.js";
import { userMessages } from "../../exceptions/user.js";

routers.get('/me', authMiddleware, async (req, res) => {
    const { id } = req.user

    try {
        const user = await prisma.user.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        if (!user) {
            return res.status(404).json({
                message: userMessages.notExistingUser
            })
        }

        res.json({
            data: user
        })
    } catch (err) {
        return res.status(500).json({
            message: userMessages.internalError,
            error: err.message
        })
    }
})

export default routers