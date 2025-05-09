import { Redis } from 'ioredis'
import fs from 'node:fs'
import path from 'node:path'

import { Slugfy } from '../utils/slugify.js'

export class VideoRepository {
  private static redis = new Redis()
  private static TTL_SECONDS = 60
  private static VIDEO_DIR = path.resolve(process.cwd(), 'videos')

  static async saveToDisk(filename: string, buffer: Buffer) {
    const slug = Slugfy.generateSlug(filename)

    await fs.promises.mkdir(this.VIDEO_DIR, { recursive: true })
    const filepath = path.join(this.VIDEO_DIR, slug)
    await fs.promises.writeFile(filepath, buffer)

    this.saveCache(slug, buffer)
  }

  static async getVideo(filename: string) {
    const slug = Slugfy.generateSlug(filename)

    // cache
    const base64 = await this.redis.get(slug)
    if (base64) {
      return Buffer.from(base64, 'base64')
    }

    // disk
    const filepath = path.join(this.VIDEO_DIR, slug)
    const stat = await fs.promises.stat(filepath)
    if (!stat.isFile()) {
      return null
    }

    const videoFromDisk = await fs.promises.readFile(filepath)
    await this.saveCache(slug, videoFromDisk)

    return videoFromDisk
  }

  static async saveCache(slug: string, buffer: Buffer) {
    const base64 = buffer.toString('base64')
    await this.redis.set(slug, base64, 'EX', this.TTL_SECONDS)
  }
}
