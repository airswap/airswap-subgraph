import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import stakingDeploys from '@airswap/staking/deploys.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get network ID from command line argument
const networkId = process.argv[2]
if (!networkId) {
  console.error('Please provide a network ID as an argument')
  process.exit(1)
}

try {
  // Create the generated directory if it doesn't exist
  const outputPath = join(__dirname, './generated/constants.ts')
  mkdirSync(dirname(outputPath), { recursive: true })

  // Read and parse the JSON file
  const jsonPath = join(__dirname, './additionalContractsSupported.json')
  const rawData = readFileSync(jsonPath, 'utf8')
  const json = JSON.parse(rawData)

  // Check if network exists in JSON
  if (!json[networkId] || !json[networkId]['Staking']) {
    console.error(`Network ${networkId} not found in configuration`)
    process.exit(1)
  }

  // Extract addresses from the nested structure
  const STAKING_V3_ADDRESS = json[networkId]['Staking']['v3']['address']
  const STAKING_V4_ADDRESS = json[networkId]['Staking']['v4']['address']

  // TODO: Import STAKING_V4_2_ADDRESS from @airswap/staking/deploys
  const STAKING_V4_2_ADDRESS = stakingDeploys[networkId] // Placeholder

  // Generate TypeScript content
  const tsContent = `// THIS FILE IS GENERATED. DO NOT EDIT.
// Run \`yarn codegen\` to regenerate.

export const STAKING_V3_ADDRESS = "${STAKING_V3_ADDRESS}";
export const STAKING_V4_ADDRESS = "${STAKING_V4_ADDRESS}";
export const STAKING_V4_2_ADDRESS = "${STAKING_V4_2_ADDRESS}";
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
`

  // Write the TypeScript file
  writeFileSync(outputPath, tsContent)
  console.log('✨ Generated generated/constants.ts')
} catch (error) {
  console.error('Error generating constants:', error)
  process.exit(1)
}
