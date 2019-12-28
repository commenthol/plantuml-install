#!/usr/bin/env node

/**
 * on linux only
 * tries to obtain HiDPI value from `xrandr` to calculate `GDK_SCALE` value
 */

const os = require('os')
const exec = require('./exec.js')

const gtkScale = async () => {
  if (os.platform() === 'linux') {
    if (process.env.GDK_SCALE) return process.env.GDK_SCALE

    const stdout = await exec('xrandr')
    const connected = stdout.split(/\n/).filter(line => / connected /.test(line))[0]
    const [_, x, y, xmm, ymm] = /^.*[a-z]+ (\d+)x(\d+).*?(\d+)mm x (\d+)mm\s*$/.exec(connected)
    const xDpi = Math.round(x * 25.4 / xmm)
    const scale = Math.floor(xDpi / 96)
    return scale
  }
}

module.exports = gtkScale
