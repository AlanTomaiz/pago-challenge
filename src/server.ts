import express from 'express'
import 'express-async-errors'

const server = express()
server.use(express.json())

server.listen(3333, () => {
  console.log('Server is running on port 3333!')
})
