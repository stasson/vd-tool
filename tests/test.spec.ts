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
    const xml = fs.readFileSync(path.join(__dirname, 'output', 'icon.xml'), 'utf8')
    expect(xml).toMatchSnapshot()
  })
})
