const express = require('express')
const userRouter = require('./users/users.routers')
const itemRouter = require('./items/items.routers')

const port = 3001
const app = express()

app.use(express.json())

app.use('/users', userRouter)
app.use('/items', itemRouter)

app.get('*', (req, res) => {
    return res.status(404).json({
        data: null,
        error: 'route not found'
    })
})

app.listen(port, () => console.log(`listening on port: ${port}`))