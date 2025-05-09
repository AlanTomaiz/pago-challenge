import fs from 'node:fs'
import path from 'node:path'

import { Slugfy } from '../utils/slugify.js'

export class VideosRepository {
  private static VIDEO_DIR = path.resolve(process.cwd(), 'videos')

  static async saveToDisk(filename: string, buffer: Buffer) {
    const slug = Slugfy.generateSlug(filename)

    await fs.promises.mkdir(this.VIDEO_DIR, { recursive: true })
    const filepath = path.join(this.VIDEO_DIR, slug)
    await fs.promises.writeFile(filepath, buffer)
  }
}
