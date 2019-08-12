import { vdConvert, vdTool } from '../src'
import path from 'path'
import fs from 'fs'

describe('tests', () => {
  it('converts svg', async () => {
    const fixture = path.join(__dirname, 'fixture', 'icon.svg')
    const outDir = path.join(__dirname, 'output')
    const result = await vdConvert(fixture, { outDir })
    expect(result && result.exitCode).toEqual(0)
    expect(result.stdout).toMatchSnapshot()
    const xml = fs.readFileSync(
      path.join(__dirname, 'output', 'icon.xml'),
      'utf8'
    )
    expect(xml).toMatchSnapshot()
  })

  it('reports errors and warnings', async () => {
    const fixture = path.join(__dirname, 'fixture', 'errors.svg')
    const outDir = path.join(__dirname, 'output')
    const result = await vdConvert(fixture, { outDir })
    expect(result && result.exitCode).toEqual(0)
    expect(result.stdout).toMatchInlineSnapshot(`
      "-c parsed, so we will convert the SVG files
      -in parsed C:\\\\workspace\\\\github\\\\vd-tool\\\\tests\\\\fixture\\\\errors.svg
      -out parsed C:\\\\workspace\\\\github\\\\vd-tool\\\\tests\\\\output
      Convert 1 SVG files in total, errors found in 1 files"
    `)
    expect(result.stderr).toMatchInlineSnapshot(`
      "error is In errors.svg:
      ERROR @ line 11: <mask> is not supported
      WARNING @ line 7: Scaling of the stroke width is ignored"
    `)
    const xml = fs.readFileSync(
      path.join(__dirname, 'output', 'errors.xml'),
      'utf8'
    )
    expect(xml).toMatchSnapshot()
  })
})
