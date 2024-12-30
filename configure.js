import fs from 'node:fs'
import { argv } from 'node:process'
import Mustache from 'mustache'

import registryBlocks from '@airswap/registry/deploys-blocks.js'
import registryDeploys from '@airswap/registry/deploys.js'
import swapBlocks from '@airswap/swap-erc20/deploys-blocks.js'
import swapDeploys from '@airswap/swap-erc20/deploys.js'
import stakingBlocks from '@airswap/staking/deploys-blocks.js'
import stakingDeploys from '@airswap/staking/deploys.js'
import additionalContractsSupported from './additionalContractsSupported.json' with { type: 'json' }
import { ChainIds, chainNames } from '@airswap/utils'

async function main() {
  const chainId = Number(argv[2])
  if (ChainIds[chainId] === undefined) {
    console.error(`Unknown chainId ${chainId}.`)
  } else {
    const content = Mustache.render(
      fs.readFileSync('./subgraph.template.yaml').toString(),
      {
        network: ChainIds[chainId].toLowerCase(),
        swap_erc20_address: swapDeploys[chainId],
        swap_erc20_start_block: swapBlocks[chainId],
        registry_address: registryDeploys[chainId],
        registry_start_block: registryBlocks[chainId],
        staking_address: stakingDeploys[chainId],
        staking_start_block: stakingBlocks[chainId],
        staking_v3_address:
          additionalContractsSupported[chainId].Staking.v3.address,
        staking_v3_start_block:
          additionalContractsSupported[chainId].Staking.v3.startBlock,
        staking_v4_address:
          additionalContractsSupported[chainId].Staking.v4.address,
        staking_v4_start_block:
          additionalContractsSupported[chainId].Staking.v4.startBlock,
      }
    )
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
