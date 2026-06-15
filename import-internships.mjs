import { createClient } from '@sanity/client'
import fs from 'fs'
import readline from 'readline'

// Load environment variables from .env.local
const envContent = fs.readFileSync('.env.local', 'utf-8')
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=')
  if (key && valueParts.length > 0) {
    process.env[key.trim()] = valueParts.join('=').trim()
  }
})

const projectId = '8lpmdwks'
const dataset = 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('❌ Error: SANITY_API_TOKEN not found in environment variables')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
})

const importFile = async (filename) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filename)
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })

    let count = 0

    rl.on('line', async (line) => {
      if (line.trim()) {
        try {
          const doc = JSON.parse(line)
          await client.create(doc)
          count++
          console.log(`✓ ${filename}: Created "${doc.title}"`)
        } catch (err) {
          console.error(`❌ Error importing line: ${err.message}`)
          reject(err)
        }
      }
    })

    rl.on('close', () => {
      console.log(`\n✅ ${filename}: ${count} documents imported successfully!\n`)
      resolve()
    })

    rl.on('error', reject)
  })
}

const run = async () => {
  try {
    console.log('🚀 Starting import process...\n')
    
    console.log('📦 Importing domains...')
    await importFile('domains-seed.ndjson')
    
    console.log('📦 Importing internships...')
    await importFile('internships-seed.ndjson')
    
    console.log('🎉 All done! Your internships and domains are now in Sanity CMS.')
  } catch (err) {
    console.error('❌ Import failed:', err.message)
    process.exit(1)
  }
}

run()
