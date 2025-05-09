import { VideoRepository } from './videoRepository.js'

export class VideoService {
  static async saveVideo(filename: string, buffer: Buffer) {
    await VideoRepository.saveToDisk(filename, buffer)
  }

  static async getVideo(filename: string) {
    return VideoRepository.getVideo(filename)
  }
}
