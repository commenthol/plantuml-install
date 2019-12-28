#!/usr/bin/env node

const {resolve} = require('path')
const gtkScale = require('./gtkScale.js')
const exec = require('./exec.js')

;(async () => {
  const plantumlJar = resolve(__dirname, 'plantuml.jar')
  const argv = process.argv.slice(2)
  try {
    process.env.GDK_SCALE = await gtkScale()
  } catch (e) {}

  const piped = argv.some(arg => /^-p|-pipe$/.test(arg))

  await exec('java', ['-jar', plantumlJar].concat(argv), { write: true, piped })
})()
