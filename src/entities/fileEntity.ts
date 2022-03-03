import { readFileSync } from 'fs'

export class FileEntity {
  constructor (public path: string, public content: string | null = null) {
    if (!content) {
      const fileContent = readFileSync(path, 'utf-8')
      this.content = fileContent
    }
  }

  public preview (len = 300): string {
    return this.content!.slice(0, len) + '...[...]'
  }
}
