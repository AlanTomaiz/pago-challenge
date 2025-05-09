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
    const { range } = req.headers

    const buffer = await VideoService.getVideo(filename)
    if (!buffer) {
      throw new AppError('Vídeo não encontrado.', 404)
    }

    const contentLength = buffer.length
    if (!range) {
      res
        .header({
          'Content-Length': contentLength,
          'Content-Type': 'video/mp4'
        })
        .send(buffer)
      return
    }

    const [startStr, endStr] = range.replace(/bytes=/, '').split('-')
    const chunkStart = parseInt(startStr, 10) || 0
    const chunkEnd = Math.min(
      endStr ? parseInt(endStr, 10) : contentLength - 1,
      contentLength - 1
    )

    if (
      chunkStart >= contentLength ||
      chunkStart > chunkEnd ||
      isNaN(chunkStart) ||
      isNaN(chunkEnd)
    ) {
      res.status(416).send('Requested Range Not Satisfiable')
      return
    }

    const chunkSize = chunkEnd - chunkStart + 1
    const chunk = buffer.subarray(chunkStart, chunkEnd + 1)
    res
      .status(206)
      .header({
        'Content-Range': `bytes ${chunkStart}-${chunkEnd}/${contentLength}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4'
      })
      .send(chunk)
  }
}
