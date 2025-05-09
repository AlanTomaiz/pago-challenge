import { type Request, type Response } from 'express'
import { AppError } from '../utils/appError.js'
import { VideoService } from './videoService.js'

const FILE_MAX_SIZE = 10 * 1024 * 1024 // 10MB

export class VideoController {
  static async upload(req: Request, res: Response) {
    if (!req.file) {
      throw new AppError('Nenhum arquivo enviado.')
    }

    const { originalname, mimetype, buffer } = req.file
    if (!mimetype.startsWith('video/')) {
      throw new AppError('Arquivo inválido. Somente vídeos são permitidos.')
    }

    if (buffer.length > FILE_MAX_SIZE) {
      throw new AppError('Arquivo excede o tamanho máximo permitido de 10MB.')
    }

    await VideoService.saveVideo(originalname, buffer)
    res.status(204).send()
  }

  static async stream(req: Request, res: Response) {
    const { filename } = req.params

    const videoBuffer = await VideoService.getVideo(filename)
    if (!videoBuffer) {
      throw new AppError('Vídeo não encontrado.', 404)
    }

    const contentLength = videoBuffer.length
    res
      .status(206)
      .header({
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4'
      })
      .send(videoBuffer)
  }
}
