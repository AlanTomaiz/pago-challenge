import { VideosRepository } from './videoRepository.js'

export class VideoService {
  static async saveVideo(filename: string, buffer: Buffer) {
    await VideosRepository.saveToDisk(filename, buffer)
  }
}
