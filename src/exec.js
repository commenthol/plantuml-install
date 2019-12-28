const { spawn } = require('child_process')

async function exec (command, args, opts = {}) {
  let stdout = ''
  let stderr = ''

  const { write, piped, ...spawnOpts} = opts

  return new Promise((resolve, reject) => {
    const sub = spawn(command, args, spawnOpts)
    sub.stdout.on('data', data => { stdout += data; write && process.stdout.write(data) })
    sub.stderr.on('data', data => { stderr += data; write && process.stderr.write(data) })
    sub.on('close', () => resolve(stdout))
    sub.on('error', err => {
      err.stderr = stderr.toString()
      reject(err)
    })

    if (piped) {
      process.stdin.pipe(sub.stdin)
    }
  })
}

module.exports = exec
