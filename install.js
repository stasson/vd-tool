#!/usr/bin/env node
const { platform } = process;

(async () => {
  if (platform !== 'win32') {
    const execa = await import('execa')
    const path = await import('path')
    const { stderr, stdout } = process
    const shell = true
    const binPath = path.join(__dirname, 'bin', 'vd-tool')
    
    execa.execaCommandSync(`chmod +x ${binPath}`, {
      shell,
      stdout,
      stderr
    })
  }
})()