const { argv } = require('node:process')
const fs = require('fs')
const Mustache = require('mustache')

const { ChainIds, chainNames } = require('@airswap/constants')
const { Staking, SwapERC20, Wrapper } = require('@airswap/libraries')

async function main() {
  const chainId = Number(argv[2])
  if (ChainIds[chainId] === undefined) {
    console.error(`Unknown chainId ${chainId}.`)
  } else {
    const content = Mustache.render(
      fs.readFileSync('./subgraph.template.yaml').toString(),
      {
        network: ChainIds[chainId].toLowerCase(),
        staking_address: Staking.getAddress(chainId),
        staking_start_block: Staking.getBlock(chainId),
        swap_erc20_address: SwapERC20.getAddress(chainId),
        swap_erc20_start_block: SwapERC20.getBlock(chainId),
        wrapper_address: Wrapper.getAddress(chainId),
        wrapper_start_block: Wrapper.getBlock(chainId),
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
