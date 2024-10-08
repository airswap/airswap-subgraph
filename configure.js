const { argv } = require('node:process')
const fs = require('fs')
const Mustache = require('mustache')

const { ChainIds, chainNames } = require('@airswap/utils')
const deploys = require('@airswap/swap-erc20/deploys')
const blocks = require('@airswap/swap-erc20/deploys-blocks')

async function main() {
  const chainId = Number(argv[2])
  if (ChainIds[chainId] === undefined) {
    console.error(`Unknown chainId ${chainId}.`)
  } else {
    const content = Mustache.render(
      fs.readFileSync('./subgraph.template.yaml').toString(),
      {
        network: ChainIds[chainId].toLowerCase(),
        swap_erc20_address: deploys[chainId],
        swap_erc20_start_block: blocks[chainId],
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
