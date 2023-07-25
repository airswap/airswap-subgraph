import { SwapERC20 as SwapERC20Event } from '../../generated/SwapERC20Contract/SwapERC20Contract'
import { SwapERC20 } from '../../generated/schema'
import { getUsdPricePerToken } from '../messari/prices'
import { DEFAULT_USDC_DECIMALS } from '../messari/prices/common/constants'
import { getTokenDecimals } from '../messari/prices/common/utils'

import {
  updateVolumeEntity,
  updateFeesEntity,
  BIGINT_TEN,
  BIGDECIMAL_TWO,
  BIGDECIMAL_TEN_THOUSAND,
} from '../metrics'

export function handleSwapERC20(event: SwapERC20Event): void {
  const swap = new SwapERC20(
    event.params.signerWallet.toHex() + event.params.nonce.toString()
  )

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

  const averageValue = senderAmountUSD
    .plus(signerAmountUSD)
    .div(BIGDECIMAL_TWO)
    .truncate(DEFAULT_USDC_DECIMALS)
  updateVolumeEntity(event, averageValue)

  const feeValue = averageValue
    .times(event.params.protocolFee.toBigDecimal())
    .div(BIGDECIMAL_TEN_THOUSAND)
    .truncate(DEFAULT_USDC_DECIMALS)
  updateFeesEntity(event, feeValue)

  swap.hash = event.transaction.hash
  swap.block = event.block.number
  swap.sender = event.transaction.from
  swap.contract = event.address
  swap.timestamp = event.block.timestamp

  swap.nonce = event.params.nonce
  swap.signerWallet = event.params.signerWallet
  swap.signerToken = event.params.signerToken
  swap.signerAmount = event.params.signerAmount
  swap.senderWallet = event.params.senderWallet
  swap.senderToken = event.params.senderToken
  swap.senderAmount = event.params.senderAmount
  swap.protocolFee = event.params.protocolFee

  swap.senderAmountUSD = senderAmountUSD
  swap.signerAmountUSD = signerAmountUSD
  swap.senderTokenPrice = senderTokenPrice.usdPrice
  swap.signerTokenPrice = signerTokenPrice.usdPrice
  swap.senderTokenDecimal = senderTokenDecimal
  swap.signerTokenDecimal = signerTokenDecimal

  swap.save()
}
