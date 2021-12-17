import { vdConvert, vdTool } from '../src'
import path from 'path'
import fs from 'fs'

describe('tests', () => {
  it('converts svg', async () => {
    const fixture = path.join(__dirname, 'fixture', 'icon.svg')
    const outDir = path.join(__dirname, 'output')
    const result = await vdConvert(fixture, { outDir })
    expect(result.input).toMatch(/icon.svg/)
    expect(result.output).toMatch(/icon.xml/)
    expect(result.errors).toBeUndefined()
    expect(result.warnings).toBeUndefined()
    const xml = fs.readFileSync(
      path.join(__dirname, 'output', 'icon.xml'),
      'utf8'
    )
    expect(xml).toMatchSnapshot()
  }, 19999)

  it('reports errors and warnings', async () => {
    const fixture = path.join(__dirname, 'fixture', 'errors.svg')
    const outDir = path.join(__dirname, 'output')
    const result = await vdConvert(fixture, { outDir })
    expect(result.input).toMatch(/errors.svg/)
    expect(result.output).toMatch(/errors.xml/)
    expect(result.errors).toMatchInlineSnapshot(`
      Array [
        "ERROR @ line 9: Referenced id not found",
        "ERROR @ line 11: Referenced id not found",
      ]
    `)
    expect(result.warnings).toMatchInlineSnapshot(`undefined`)
    const xml = fs.readFileSync(
      path.join(__dirname, 'output', 'errors.xml'),
      'utf8'
    )
    expect(xml).toMatchSnapshot()
  }, 19999)
})
