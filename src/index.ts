import path from 'upath'
import {execa, parseCommandString, Options} from 'execa'

/**
 * spawn vd-tool process
 *
 * @param args vd-tool cli args
 * @param options execa options
 */
export async function vdTool(
  args?: readonly string[],
  options?: Options
) {
  const file = path.join(__dirname, '..', 'bin', 'vd-tool')
  if (!options) options = { stderr: process.stderr, stdout: process.stdout }
  Object.assign(options, { shell: true })

  return await execa(file, args, options)
}

type VdConvertOptions = {
  outDir?: string // output dir path
  width?: number // forces width in DP
  height?: number // forces height in DP
  addHeader?: boolean // add AOSP header
}

type VdConvertResult = {
  input: string
  output: string
  warnings?: string[]
  errors?: string[]
}


/**
 * SVG to Vector Drawable conversion
 *
 * @param input file or directory path
 * @param options VdConvertOptions
 */
export async function vdConvert(input: string, options: VdConvertOptions = {}) {
  const args = ['-c']
  const { outDir, width, height, addHeader} = options
  args.push('-in', String(input))
  if (outDir) args.push('-out', String(outDir))
  if (width) args.push('-widthDp', String(width))
  if (height) args.push('-heightDp', String(height))
  if (addHeader) args.push('--addHeader')
  const {stderr} = await vdTool(args, { stderr: 'pipe', stdout:'pipe' })
  const {dir, name} = path.parse(input)
  const output = path.join(outDir || dir, name) + '.xml'
  const result: VdConvertResult = {input, output}
  const errors: string[] = []  
  const warnings: string[] = []  

  if (typeof stderr === 'string') {
    for (const line of stderr.split(/\r?\n/)) {
      if (line.startsWith('ERROR')) errors.push(line);
      else if (line.startsWith('WARNING')) warnings.push(line);
    }
  }
  
  if (errors.length) result.errors = errors
  if (warnings.length) result.warnings = warnings

  return result
}
