import express from 'express'
import 'express-async-errors'

import { ErrorHandler } from './middleware/errorHandler.js'
import { VideoModule } from './modules/videoModule.js'

const server = express()
server.use(express.json())

VideoModule.register(server)

server.use(ErrorHandler.register)
server.listen(3333, () => {
  console.log('Server is running on port 3333!')
})
