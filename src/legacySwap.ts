import { SwapERC20 as SwapERC20Event } from '../generated/SwapERC20ContractV4/SwapERC20Contract'
import { SwapERC20 } from '../generated/schema'
import { getUsdPricePerToken } from './messari/prices'
import { DEFAULT_USDC_DECIMALS } from './messari/prices/common/constants'
import { getTokenDecimals } from './messari/prices/common/utils'
import { Bytes } from '@graphprotocol/graph-ts'

import {
  updateSwapMetrics,
  BIGINT_TEN,
  BIGDECIMAL_TWO,
  BIGDECIMAL_TEN_THOUSAND,
} from './metrics'

export function handleSwapERC20(event: SwapERC20Event): void {
  const senderTokenPrice = getUsdPricePerToken(event.params.senderToken)
  const senderTokenDecimal = BIGINT_TEN.pow(
    getTokenDecimals(event.params.senderToken).toI32() as u8
  ).toBigDecimal()

  const senderAmountUSD = event.params.senderAmount
    .toBigDecimal()
    .div(senderTokenDecimal)
    .times(senderTokenPrice.usdPrice)

  const signerTokenPrice = getUsdPricePerToken(event.params.signerToken)
  const signerTokenDecimal = BIGINT_TEN.pow(
    getTokenDecimals(event.params.signerToken).toI32() as u8
  ).toBigDecimal()

  const signerAmountUSD = event.params.signerAmount
    .toBigDecimal()
    .div(signerTokenDecimal)
    .times(signerTokenPrice.usdPrice)

  const swapValue = senderAmountUSD
    .plus(signerAmountUSD)
    .div(BIGDECIMAL_TWO)
    .truncate(DEFAULT_USDC_DECIMALS)

  const feeValue = swapValue
    .times(event.params.protocolFee.toBigDecimal())
    .div(BIGDECIMAL_TEN_THOUSAND)
    .truncate(DEFAULT_USDC_DECIMALS)

  const feeAmountUSD = feeValue
    .div(signerTokenDecimal)
    .times(signerTokenPrice.usdPrice)

  updateSwapMetrics(event, swapValue, feeValue)

  const entity = new SwapERC20(
    Bytes.fromUTF8(
      `${event.params.signerWallet.toHex()}${event.params.nonce.toString()}`
    )
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.from = event.transaction.from
  entity.to = event.address

  entity.nonce = event.params.nonce
  entity.signerWallet = event.params.signerWallet
  entity.signerToken = event.params.signerToken
  entity.signerAmount = event.params.signerAmount
  entity.senderWallet = event.params.senderWallet
  entity.senderToken = event.params.senderToken
  entity.senderAmount = event.params.senderAmount
  entity.feeAmount = event.params.protocolFee

  entity.senderAmountUSD = senderAmountUSD
  entity.signerAmountUSD = signerAmountUSD
  entity.feeAmountUSD = feeAmountUSD

  entity.save()
}
