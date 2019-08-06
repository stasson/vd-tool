import path from 'path'
import execa from 'execa'


// Converts SVG files to VectorDrawable XML files.
// Displays VectorDrawables.
// Usage: [-c] [-d] [-in <file or directory>] [-out <directory>] [-widthDp <size>] [-heightDp <size>] [-addHeader]
// Options:
//   -in <file or directory>:  If -c is specified, Converts the given .svg file
//                             to VectorDrawable XML, or if a directory is specified,
//                             all .svg files in the given directory. Otherwise, if -d
//                             is specified, displays the given VectorDrawable XML file
//                             or all VectorDrawables in the given directory.
//   -out <directory>          If specified, write converted files out to the given
//                             directory, which must exist. If not specified the
//                             converted files will be written to the directory
//                             containing the input files.
//   -c                        If present, SVG files are converted to VectorDrawable XML
//                             and written out.
//   -d                        Displays the given VectorDrawable(s), or if -c is
//                             specified the results of the conversion.
//   -widthDp <size>           Force the width to be <size> dp, <size> must be integer
//   -heightDp <size>          Force the height to be <size> dp, <size> must be integer
//   -addHeader                Add AOSP header to the top of the generated XML file
// Examples:
//   1) Convert SVG files from <directory> into XML files at the same directory and visualize the XML file results:
//   vd-tool -c -d -in <directory>
//   2) Convert SVG file and visualize the XML file results:
//   vd-tool -c -d -in file.svg
//   3) Display VectorDrawable's XML files from <directory>:
//   vd-tool -d -in <directory>

export async function vdTool(
  args?: readonly string[],
  options?: execa.Options
) {
  const file = path.join(__dirname, '..', 'bin', 'vd-tool')
  if (!options) options = { stderr: process.stderr }
  Object.assign(options, { shell: true })
  return await execa(file, args, options)
}

export async function vdConvert(
  input: string,
  option: {
    outDir?: string
    width?: number
    height?: number
    addHeader?: boolean
  } = {}
) {
  const args = ['-c']
  const { outDir, width, height, addHeader } = option
  args.push('-in', String(input))
  if (outDir) args.push('-out', String(outDir))
  if (width) args.push('-widthDp', String(width))
  if (height) args.push('-heightDp', String(height))
  if (addHeader) args.push('--addHeader')
  return vdTool(args)
}
