import { writeFile } from "fs";
import path from "path";
import { Node, Project, ScriptTarget, SyntaxKind } from "ts-morph";
import { FileEntity } from "../entities/fileEntity";
import { tsquery } from '@phenomnomnominal/tsquery';
const serialize = require('serialize-javascript');


const extract = (fileEntity: FileEntity, outDir: string) => {

    const project = new Project({
        compilerOptions: {
            target: ScriptTarget.ES2020,
            skipAddingFilesFromTsConfig: true,

        }
    });
    const sourceFile = project.addSourceFilesAtPaths(fileEntity.path);
    project.resolveSourceFileDependencies();

    // const ast = tsquery.ast(sourceFile[0].getText()); 

    // const nodes = tsquery(ast, ':declaration');
    // console.log(`tsquery:declaration `,  (nodes)); // any


    const mySetDecl = sourceFile[0]
    // console.log(`JSAPIRequest=> text\n//////////////////\n${mySetDecl.getText()}\n//////////////////\n`); // any
    // console.log(`JSAPIRequest=> getLeadingCommentRange,\n`, mySetDecl.getLeadingCommentRanges().pop()?.getText()); // any



    const interfaces =[]
     mySetDecl.forEachChild(node => {
        if (Node.isInterfaceDeclaration(node)) {
            console.log(`name:`, node.getName(),"text:========\n"+ node.getJsDocs().map(j=>j.getInnerText())+'\n============/'); // any
          
            node.getProperties().forEach(property=>{
                console.log(`jsdoc:`,property.getName(),'----', property.getJsDocs().map(j=>j.getInnerText()))
            })
            node.getMembers().forEach(property=>{
                console.log(`jsdoc:mem`,property.getKindName(),'----', property.getJsDocs().map(j=>j.getInnerText()))
            })
            // return node; // stops iterating over the children and returns this value
            interfaces.push(node)
        }
        // return undefined; // return a falsy value or no value to continue iterating
    });

    // console.log(`JSAPIRequest=> interfaces,\n`, interfaces); // any

    // let sourceFileOutPut = '## hehe';
    // sourceFileOutPut += sourceFile[0].getSourceFile();


    // // output
    // writeFile(path.resolve(outDir,fileEntity.path),
    //     sourceFileOutPut,{},(e)=>{throw e})

}

const Extractor = {
    extract

}
export default Extractor