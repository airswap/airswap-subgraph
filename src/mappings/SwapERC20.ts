import { SwapERC20 as SwapERC20Event } from '../../generated/SwapERC20Contract/SwapERC20Contract'
import { SwapERC20 } from '../../generated/schema'
import { getUsdPricePerToken } from '../messari/prices'
import { DEFAULT_USDC_DECIMALS } from '../messari/prices/common/constants'
import { getTokenDecimals } from '../messari/prices/common/utils'
import { ethereum, log, Address, BigInt } from '@graphprotocol/graph-ts'

import { updateMetrics, BIGINT_TEN, BIGDECIMAL_TWO } from '../metrics'

export type Transfer = {
  token: Address
  from: Address
  to: Address
  amount: BigInt
}

export function handleSwapERC20(event: SwapERC20Event): void {
  const swap = new SwapERC20(
    `${event.params.signerWallet.toHex()}${event.params.nonce.toString()}`
  )
  if (event.receipt) {
    const logs = event.receipt!.logs
    const transfers: Transfer[] = []

    for (let i = 0; i < logs.length; i++) {
      let parsed = ethereum.decode('(uint256,address)', logs[i].data)
      if (parsed) {
        while (i--) {
          parsed = ethereum.decode('(address,address,uint256)', logs[i].data)
          if (parsed) {
            const transfer = parsed.toTuple()
            transfers.push({
              token: logs[i].address,
              from: transfer.at(0).toAddress(),
              to: transfer.at(1).toAddress(),
              amount: transfer.at(2).toBigInt(),
            })
          }
        }
        break
      }
    }

    const fee = transfers[0]
    const signer = transfers[1]
    const sender = transfers[2]

    if (fee.from !== event.params.signerWallet)
      log.warning(
        'unable to get SwapERC20 params: found incorrect fee transfer (wrong signerWallet)',
        []
      )
    if (signer.from !== event.params.signerWallet)
      log.warning(
        'unable to get SwapERC20 params: found incorrect signer transfer (wrong signerWallet)',
        []
      )
    if (signer.from !== sender.to)
      log.warning(
        'unable to get SwapERC20 params: signer transfer mismatched sender transfer',
        []
      )
    if (sender.from !== signer.to)
      log.warning(
        'unable to get SwapERC20 params: sender transfer mismatched signer transfer',
        []
      )

    const senderTokenPrice = getUsdPricePerToken(sender.token)
    const senderTokenDecimal = BIGINT_TEN.pow(
      getTokenDecimals(sender.token).toI32()
    ).toBigDecimal()

    const senderAmountUSD = sender.amount
      .toBigDecimal()
      .div(senderTokenDecimal)
      .times(senderTokenPrice.usdPrice)

    const signerTokenPrice = getUsdPricePerToken(signer.token)
    const signerTokenDecimal = BIGINT_TEN.pow(
      getTokenDecimals(signer.token).toI32()
    ).toBigDecimal()

    const signerAmountUSD = signer.amount
      .toBigDecimal()
      .div(signerTokenDecimal)
      .times(signerTokenPrice.usdPrice)

    const swapValue = senderAmountUSD
      .plus(signerAmountUSD)
      .div(BIGDECIMAL_TWO)
      .truncate(DEFAULT_USDC_DECIMALS)

    const feeAmount = BIGINT_TEN.pow(DEFAULT_USDC_DECIMALS).toBigDecimal()

    updateMetrics(event, swapValue, feeAmount)

    swap.hash = event.transaction.hash
    swap.block = event.block.number
    swap.sender = event.transaction.from
    swap.contract = event.address
    swap.timestamp = event.block.timestamp

    swap.nonce = event.params.nonce
    swap.signerWallet = event.params.signerWallet
    swap.signerToken = signer.token
    swap.signerAmount = signer.amount
    swap.senderWallet = sender.from
    swap.senderToken = sender.token
    swap.senderAmount = sender.amount
    swap.feeAmount = fee.amount

    swap.senderAmountUSD = senderAmountUSD
    swap.signerAmountUSD = signerAmountUSD
    swap.senderTokenPrice = senderTokenPrice.usdPrice
    swap.signerTokenPrice = signerTokenPrice.usdPrice
    swap.senderTokenDecimal = senderTokenDecimal
    swap.signerTokenDecimal = signerTokenDecimal

    swap.save()
  }
}
