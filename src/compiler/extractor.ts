import { outputFile } from 'fs-extra'
import path from 'path'
import prettier from 'prettier'
import { Node, Project, ProjectOptions, ScriptTarget } from 'ts-morph'
import { FileEntity } from '../entities/fileEntity'
import { mapDataToTemplate, prettierConfigTS } from './consts'

interface NodeData {
  text: string;
  name: string;
  desc: string;
  props: {
    name: string;
    typeName: string;
    required: boolean;
    desc: string;
    defaultValue?: string | undefined;
  }[];
}

interface ExtractedData {
  Main: NodeData;
  Option: NodeData;
  Payload: NodeData;
  Return: NodeData;
}
const projectOption:ProjectOptions = {
  compilerOptions: {
    target: ScriptTarget.ES2020,
    skipAddingFilesFromTsConfig: true,
    declaration: true
  }
}
const extract = (fileEntity: FileEntity, outDir: string) => {
  console.log('extracting ' + fileEntity.path)
  const project = new Project(projectOption)
  const sourceFiles = project.addSourceFilesAtPaths(fileEntity.path)
  project.resolveSourceFileDependencies()
  const sourceFile = sourceFiles[0]

  project.addDirectoryAtPathIfExists
  const data: ExtractedData = {} as ExtractedData

  const interfaceTexts = [] as string[]
  sourceFile.forEachChild((node) => {
    if (Node.isInterfaceDeclaration(node)) {
      const nodeData: NodeData = {
        name: '',
        desc: '',
        props: [],
        text: node.getFullText()
          .replace(/export default /g, '')
          .replace(/export /g, '')
      }
      interfaceTexts.push(nodeData.text)
      nodeData.name = node.getName()
      nodeData.desc = node
        .getJsDocs()
        .map((j) => j.getInnerText())
        .join('\n<br/>\n')

      node.getProperties().forEach((property) => {
        const jsdocOfProp = property
          .getJsDocs()

          .map((j) => j.getInnerText())
          .join('\n<br/>\n')
        const defaultValue = jsdocOfProp
          .match(/\[(.*?)\]/m)?.[1]
          .split('=')?.[1]
        let desc = property
          .getJsDocs()
          .map((j) => j.getInnerText())
          .join('\n<br/>\n')
        if (defaultValue) {
          desc = desc.replace(/\[(.*?)\]/m, '').trim()
        }
        const typeName = property.getType().getText()
        nodeData.props.push({
          name: property.getName(),
          desc,
          typeName: typeName.startsWith('(')
            ? 'Function'
            : typeName.replace(/\|/g, '\\|'), // escape table char
          required: !property.hasQuestionToken(),
          defaultValue
        })
      })
      if (nodeData.name.endsWith('Main')) {
        data.Main = nodeData
        node.getMembers().forEach((property) => {
          nodeData.desc = [
            nodeData.desc,
            ...property.getJsDocs().map((j) => j.getInnerText())
          ].join('\n<br/>\n')
        })
      }

      if (nodeData.name.endsWith('Option')) {
        data.Option = nodeData
      }

      if (nodeData.name.endsWith('Payload')) {
        data.Payload = nodeData
      }

      if (nodeData.name.endsWith('Return')) {
        data.Return = nodeData
      }

      // console.log('LOOP res:====>', nodeData) // any
    }
    // return undefined; // return a falsy value or no value to continue iterating
  })
  // console.log('pre final data', data)
  const MDString = mapDataToTemplate({
    desc: data.Main.desc,
    paramsDesc: data.Option.desc,
    paramsTable: data.Option.props
      .filter((d) => d)
      .map(
        (p) =>
          `| ${p.name} | ${p.typeName} | ${p.required ? '  ✓   ' : ''} | ${
            p.defaultValue || ''
          } |${p.desc} |`
      )
      .join('\n'),
    payloadDesc: data.Payload.desc,
    payloadTable: data.Payload.props
      .filter((d) => d)
      .map(
        (p) =>
          `| ${p.name} | ${p.typeName} | ${p.defaultValue || ''} | ${p.desc} |`
      )
      .join('\n'),
    returnsDesc: data.Return.desc,
    returnsTable: data.Return.props
    // .filter((d) => d)
      .map(
        (p) =>
          `| ${p.name} | ${p.typeName} | ${p.defaultValue || ''} | ${p.desc} |`
      )
      .join('\n')
  })
  // console.log('LOOP res final:====>', MDString) // any

  const fullPathMD = path.join(outDir, path.basename(fileEntity.path.replace('.ts', '.md')))
  const fullPathDeclareFile = path.join(outDir, path.basename(fileEntity.path.replace('.ts', '.d.ts')))

  const apiName = data.Main.name.slice(5).slice(0, -4)
  outputFile(fullPathMD, MDString)
  const declarationString = `/// <reference path="my-common-params.d.ts"/>
declare namespace my {${interfaceTexts.join('\n')}

const ${apiName[0].toLowerCase() + apiName.slice(1)}:${data.Main.name}
}`
  outputFile(fullPathDeclareFile, prettier.format(declarationString, prettierConfigTS))
}

const Extractor = {
  extract
}
export default Extractor
