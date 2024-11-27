import fs from 'node:fs'
import { argv } from 'node:process'
import Mustache from 'mustache'

import delegateBlocks from '@airswap/delegate/deploys-blocks.js'
import delegateDeploys from '@airswap/delegate/deploys.js'
import registryBlocks from '@airswap/registry/deploys-blocks.js'
import registryDeploys from '@airswap/registry/deploys.js'
import swapBlocks from '@airswap/swap-erc20/deploys-blocks.js'
import swapDeploys from '@airswap/swap-erc20/deploys.js'
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
        delegate_address: delegateDeploys[chainId],
        delegate_start_block: delegateBlocks[chainId],
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
