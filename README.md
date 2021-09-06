# vd-tool

Packaging of the Android Studio VectorDrawable CLI tool

## Pre-requisite

- Requires Java 8 or higher

## Sources

Binaries were built using the following branch:
<https://android.googlesource.com/platform/tools/base/+/refs/tags/studio-2020.3.1/vector-drawable-tool>

## Cli

```bash
$ npm install -g vd-tool
$ vd-tool

Converts SVG files to VectorDrawable XML files.
Displays VectorDrawables.
Usage: [-c] [-d] [-in <file or directory>] [-out <directory>] [-widthDp <size>] [-heightDp <size>] [-addHeader]
Options:
  -in <file or directory>:  If -c is specified, Converts the given .svg file
                            to VectorDrawable XML, or if a directory is specified,
                            all .svg files in the given directory. Otherwise, if -d
                            is specified, displays the given VectorDrawable XML file
                            or all VectorDrawables in the given directory.
  -out <directory>          If specified, write converted files out to the given
                            directory, which must exist. If not specified the
                            converted files will be written to the directory
                            containing the input files.
  -c                        If present, SVG files are converted to VectorDrawable XML
                            and written out.
  -d                        Displays the given VectorDrawable(s), or if -c is
                            specified the results of the conversion.
  -widthDp <size>           Force the width to be <size> dp, <size> must be integer
  -heightDp <size>          Force the height to be <size> dp, <size> must be integer
  -addHeader                Add AOSP header to the top of the generated XML file
Examples:
  1) Convert SVG files from <directory> into XML files at the same directory and visualize the XML file results:
  vd-tool -c -d -in <directory>
  2) Convert SVG file and visualize the XML file results:
  vd-tool -c -d -in file.svg
  3) Display VectorDrawable's XML files from <directory>:
  vd-tool -d -in <directory>
```

## Lib

```bash
$ npm i vd-tool
```

```javascript
const { vdConvert } = require('vd-tool')

vdConvert('path/to/svg-file-or-dir', options: {
  outDir?: string     // output dir path
  width?: number      // forces width in DP
  height?: number     // forces height in DP
  addHeader?: boolean // add AOSP header
})
.then(() => {
  //...
})
.catch(({message}) => {
  console.error('message')
})
```
