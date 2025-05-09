import { type Express } from 'express'
import multer from 'multer'

import { VideoController } from './videoController.js'

export class VideoModule {
  static register(app: Express): void {
    const uploadMiddleware = multer().single('video')

    app.post('/upload/video', uploadMiddleware, VideoController.upload)
  }
}
