import path from 'path'
import execa from 'execa'

/**
 * spawn vd-tool process
 * 
 * @param args vd-tool cli args
 * @param options execa options
 */
export async function vdTool(
  args?: readonly string[],
  options?: execa.Options
) {
  const file = path.join(__dirname, '..', 'bin', 'vd-tool')
  if (!options) options = { stderr: process.stderr, stdout: process.stdout }
  Object.assign(options, { shell: true })
  return await execa(file, args, options)
}

type VdConvertOptions = {
  outDir?: string     // output dir path
  width?: number      // forces width in DP
  height?: number     // forces height in DP
  addHeader?: boolean // add AOSP header
  stdout?: execa.StdioOption // default to pipe
  stderr?: execa.StdioOption // default to pipe
}

/**
 * SVG to Vector Drawable conversion 
 * 
 * @param input file or directory path
 * @param options VdConvertOptions
 */
export async function vdConvert(
  input: string,
  options: VdConvertOptions = {}
) {
  const args = ['-c']
  const { outDir, width, height, addHeader, stderr, stdout} = options
  args.push('-in', String(input))
  if (outDir) args.push('-out', String(outDir))
  if (width) args.push('-widthDp', String(width))
  if (height) args.push('-heightDp', String(height))
  if (addHeader) args.push('--addHeader')
  return vdTool(args, {stderr, stdout})
}
