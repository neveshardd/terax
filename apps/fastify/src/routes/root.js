import routers from '../configs/router.js'

routers.get('/', (req, res) => {
    res.json({
        title: 'Terax World',
        version: 'v1',
    })
})

export default routers