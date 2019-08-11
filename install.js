#!/usr/bin/env node
const { platform } = process

if (platform != 'win32') {
  const execa = require('execa')
  const path = require('path')
  const { stderr, stdout } = process
  const shell = true
  const binPath = path.join(__dirname, 'bin', 'vd-tool')
  execa.commandSync(`chmod +x ${binPath}`, {
    shell,
    stdout,
    stderr
  })
}
