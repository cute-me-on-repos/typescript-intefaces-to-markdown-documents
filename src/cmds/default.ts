/* eslint-disable @typescript-eslint/no-var-requires */
import type { Arguments, CommandBuilder } from 'yargs'
import { FileEntity } from '../entities/fileEntity'
import Extractor from '../compiler/extractor'
import { outputFileSync } from 'fs-extra'
import path from 'path'
import prettier from 'prettier'
import chokidar from 'chokidar'
import { templates } from '../template'
import { prettierConfigTS } from '../compiler/consts'

type Options = {
  files?: string[] | string;
  outDir: string;
  watch?: boolean,
  log?: boolean
};

export const command = '$0 compile [outDir] [watch] [log] [files..]'
export const desc = 'compile ts types to markdown files'

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .alias({ c: 'compile' })
    .option('files..', {
      describe: 'ts types files with only type and interfaces'
    })
    .option('outDir', {
      describe: 'output directory',
      default: './output'
    })
    .option('watch', {
      describe: 'enable watching file change',
      default: true
    })
    .option('log', {
      describe: 'enable console logging',
      default: true
    })
    .example('$0 compile --out-dir=output --no-watch --log --files ./input/**/*.ts', 'compile all ts files to ./output folder')

export const handler = (argv: Arguments<Options>): void => {
  if (!argv.log) {
    console.log = () => { return undefined }
  }
  console.log('argv:', argv)
  const { outDir, watch } = argv
  let files = argv.files
  if (!files || files.length === 0) {
    console.error('No file detected.')
    process.exit(1)
  }
  if (!Array.isArray(files)) {
    files = [files]
  }

  // console.log(`args:\n${JSON.stringify(argv, null, 2)}`)
  // console.log(`files:\n${JSON.stringify(files, null, 2)}\n`)

  outputFileSync(path.join(outDir, 'my-common-params.d.ts'), prettier.format(templates['my-common-params'], prettierConfigTS))
  outputFileSync(path.join(outDir, 'index.d.ts'), `${files.map(p => `/// <reference path="${path.basename(p.replace(/\.ts/g, '.d.ts'))}"/>`).join('\n')}\n`)

  function doExtract (filePath:string) {
    const newFileEntity = new FileEntity((filePath))
    Extractor.extract(newFileEntity, outDir)
  }

  for (let index = 0; index < files!.length; index++) {
    doExtract(files![index])
  }

  let watcherRunningTimeout :ReturnType<typeof setTimeout>
  function runWatchLoop () {
    clearTimeout(watcherRunningTimeout)
    watcherRunningTimeout = setTimeout(function () {
      runWatchLoop()
    }, 500)
  }
  function killProcess () {
    process.exit(1)
  }
  if (watch) {
    const watcher = chokidar.watch(files, { persistent: true })
    watcher
      .on('add', function (fpath) { console.log('File', fpath, 'has been added'); doExtract(fpath) })
      .on('change', function (fpath) { console.log('File', fpath, 'has been changed'); doExtract(fpath) })
      .on('unlink', function (fpath) {
        console.log('File', fpath, 'has been removed')
      })
      .on('error', function (error) { console.error('Error happened', error) })

    process.on('SIGTERM', killProcess)
    process.on('SIGINT', killProcess)
    process.on('uncaughtException', function (e) {
      console.error('[uncaughtException] app will be terminated: ', e.stack)
      killProcess()
    })
    runWatchLoop()
  }
}
