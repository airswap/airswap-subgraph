import fs from 'node:fs'
import { argv } from 'node:process'
import Mustache from 'mustache'

import registryBlocks from '@airswap/registry/deploys-blocks.js'
import registryDeploys from '@airswap/registry/deploys.js'
import swapBlocks from '@airswap/swap-erc20/deploys-blocks.js'
import swapDeploys from '@airswap/swap-erc20/deploys.js'
import stakingBlocks from '@airswap/staking/deploys-blocks.js'
import stakingDeploys from '@airswap/staking/deploys.js'
import { ChainIds, chainNames } from '@airswap/utils'

const LEGACY_SWAP_V4_ADDRESS = '0xd82fa167727a4dc6d6f55830a2c47abbb4b3a0f8'
const LEGACY_SWAP_V4_START_BLOCK = 16776806
const LEGACY_STAKING_V3_ADDRESS = '0x6d88B09805b90dad911E5C5A512eEDd984D6860B'
const LEGACY_STAKING_V3_START_BLOCK = 14359343
const LEGACY_STAKING_V4_ADDRESS = '0x9fc450F9AfE2833Eb44f9A1369Ab3678D3929860'
const LEGACY_STAKING_V4_START_BLOCK = 17215773

async function main() {
  const chainId = Number(argv[2])
  if (ChainIds[chainId] === undefined) {
    console.error(`Unknown chainId ${chainId}.`)
  } else {
    let content = Mustache.render(
      fs.readFileSync('./subgraph.template.yaml').toString(),
      {
        network: ChainIds[chainId].toLowerCase(),
        swap_erc20_address: swapDeploys[chainId],
        swap_erc20_start_block: swapBlocks[chainId],
        legacy_swap_erc20_v4_address: LEGACY_SWAP_V4_ADDRESS,
        legacy_swap_erc20_v4_start_block: LEGACY_SWAP_V4_START_BLOCK,
        registry_address: registryDeploys[chainId],
        registry_start_block: registryBlocks[chainId],
      }
    )
    if (chainId === 1) {
      const stakingContent = Mustache.render(
        fs.readFileSync('./subgraph.template.staking.yaml').toString(),
        {
          network: ChainIds[chainId].toLowerCase(),
          staking_address: stakingDeploys[chainId],
          staking_start_block: stakingBlocks[chainId],
          legacy_staking_v3_address: LEGACY_STAKING_V3_ADDRESS,
          legacy_staking_v3_start_block: LEGACY_STAKING_V3_START_BLOCK,
          legacy_staking_v4_address: LEGACY_STAKING_V4_ADDRESS,
          legacy_staking_v4_start_block: LEGACY_STAKING_V4_START_BLOCK,
        }
      )
      content = content + stakingContent
    }
    fs.writeFileSync('./subgraph.yaml', content)
    console.log(`Wrote subgraph.yaml for ${chainNames[chainId]}.`)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
