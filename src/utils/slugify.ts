import path from 'node:path'

export class Slugfy {
  static generateSlug(filename: string) {
    const ext = path.extname(filename)
    const baseName = filename
      .replace(ext, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    return `${baseName}${ext}`
  }
}
