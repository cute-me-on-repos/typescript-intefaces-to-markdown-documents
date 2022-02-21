import type { Arguments, CommandBuilder } from 'yargs';
import { readFileSync } from 'fs';
import { FileEntity } from '../entities/fileEntity';
import Extractor from '../compiler/extractor';
type Options = {
    files?: string[] | string;
    outDir: string
};

export const command: string[] = ['$0 [outDir] [files..]', 'compile [outDir] [files..]'];
export const desc: string = 'compile ts types to markdown files';


export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .positional('files..', {
            describe: 'ts types files with only type and interfaces'
        })
        .positional('outDir', {
            describe: 'output directory. Default: ./output',
            default: './output'
        })


export const handler = (argv: Arguments<Options>): void => {
    let { files, outDir } = argv
    if (!files) {
        console.error("No file detected.")
        process.exit(1);
    }
    if (!Array.isArray(files)) {
        files = [files]
    }

    console.log(`args here:\n${JSON.stringify(argv, null, 2)}`);
    console.log(`files here:\n${JSON.stringify(files, null, 2)}\n`);



    const fileEntities: Array<FileEntity> = [];
    for (let index = 0; index < files.length; index++) {
        const path = files[index];
        const newFileEntity = new FileEntity(path)
        fileEntities.push(newFileEntity); 
        Extractor.extract(newFileEntity, outDir)

    }

    process.exit(0);
};