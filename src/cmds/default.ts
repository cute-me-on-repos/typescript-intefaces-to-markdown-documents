import type { Arguments, CommandBuilder } from 'yargs';

type Options = {
    files?: string[] | string;
    outDir?: string
};

export const command: string[] = ['$0 [outDir] [files..]', 'compile [files..]'];
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
    let { files } = argv
    if (!files) {
        console.error("No file detected.")
        process.exit(1);
    }
    if(!Array.isArray(files)){
        files = [files]
    }

    console.log( `args here:\n${JSON.stringify(argv, null, 2)}`);
    console.log( `files here:\n${JSON.stringify(files, null, 2)}`);
    //   process.stdout.write(outString);
 
    process.exit(0);
};