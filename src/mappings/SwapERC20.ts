import {
  Authorize as AuthorizeEvent,
  Cancel as CancelEvent,
  SwapERC20 as SwapEvent,
} from '../../generated/SwapERC20Contract/SwapERC20Contract'
import { BigDecimal } from '@graphprotocol/graph-ts'
import { Cancel, Swap, SwapContract, TotalVolume } from '../../generated/schema'
import {
  getUser,
  getToken,
  BIGDECIMAL_ZERO,
  BIGDECIMAL_TWO,
  BIGDECIMAL_TEN_THOUSAND,
} from '../entities'
import { getUsdPricePerToken } from '../messari/prices'
import * as utils from '../messari/prices/common/utils'

import { updateDailyFeesCollected, updateDailySwapVolume } from '../metrics'

export function handleAuthorize(event: AuthorizeEvent): void {
  const signer = getUser(event.params.signer.toHex())
  const signerWallet = getUser(event.params.signerWallet.toHex())

  const authorize = signer.authorizeAddress
  const currentIdx = authorize.indexOf(signerWallet.id)

  if (currentIdx == -1) {
    authorize.push(signerWallet.id)
    signer.authorizeAddress = authorize
    signer.save()
  }
}

export function handleCancel(event: CancelEvent): void {
  const entity = new Cancel(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  )
  entity.nonce = event.params.nonce
  entity.signerWallet = event.params.signerWallet
  entity.save()
}

export function handleSwap(event: SwapEvent): void {
  const completedSwap = new Swap(
    event.params.signerWallet.toHex() + event.params.nonce.toString()
  )

  let swapContract = SwapContract.load(event.address.toHex())
  if (!swapContract) {
    swapContract = new SwapContract(event.address.toHex())
    swapContract.save()
  }

  const signerWallet = getUser(event.params.signerWallet.toHex())
  const senderWallet = getUser(event.params.senderWallet.toHex())
  const signerToken = getToken(event.params.signerToken.toHex())
  const senderToken = getToken(event.params.senderToken.toHex())

  const senderTokenPrice = getUsdPricePerToken(event.params.senderToken)
  const signerTokenPrice = getUsdPricePerToken(event.params.signerToken)

  const senderTokenAmount = event.params.senderAmount
  const senderTokenDecimal = utils
    .getTokenDecimals(event.params.senderToken)
    .toBigDecimal()

  const senderAmountUSD = senderTokenAmount
    .toBigDecimal()
    .div(senderTokenDecimal)
    .times(senderTokenPrice.usdPrice)
    .div(BigDecimal.fromString(senderTokenPrice.decimals.toString()))

  const signerTokenAmount = event.params.signerAmount
  const signerTokenDecimal = utils
    .getTokenDecimals(event.params.signerToken)
    .toBigDecimal()

  const signerAmountUSD = signerTokenAmount
    .toBigDecimal()
    .div(signerTokenDecimal)
    .times(signerTokenPrice.usdPrice)
    .div(BigDecimal.fromString(signerTokenPrice.decimals.toString()))

  const sumSwap = senderAmountUSD.plus(signerAmountUSD)
  const avgSwap = sumSwap.div(BIGDECIMAL_TWO)

  const protocolFee = event.params.protocolFee
  const fees = avgSwap
    .times(protocolFee.toBigDecimal())
    .div(BIGDECIMAL_TEN_THOUSAND)

  const swapAddress = event.address.toHex()
  let swapVolume = TotalVolume.load(swapAddress)
  if (!swapVolume) {
    swapVolume = new TotalVolume(swapAddress)
    swapVolume.amount = BIGDECIMAL_ZERO
    swapVolume.save()
  }
  swapVolume.amount = swapVolume.amount.plus(avgSwap)

  completedSwap.swap = swapContract.id
  completedSwap.block = event.block.number
  completedSwap.transactionHash = event.transaction.hash
  completedSwap.timestamp = event.block.timestamp
  completedSwap.from = event.transaction.from

  completedSwap.signerWallet = signerWallet.id
  completedSwap.signerToken = signerToken.id
  completedSwap.protocolFee = event.params.protocolFee
  completedSwap.senderWallet = senderWallet.id
  completedSwap.senderToken = senderToken.id
  completedSwap.senderAmountUSD = senderAmountUSD
  completedSwap.signerAmountUSD = signerAmountUSD
  completedSwap.signerAmount = signerTokenAmount
  completedSwap.senderAmount = senderTokenAmount
  completedSwap.senderTokenDecimal = senderTokenDecimal
  completedSwap.signerTokenDecimal = signerTokenDecimal
  completedSwap.senderTokenPrice = senderTokenPrice.usdPrice
  completedSwap.signerTokenPrice = signerTokenPrice.usdPrice
  completedSwap.save()
  swapVolume.save()

  updateDailySwapVolume(event, avgSwap)
  updateDailyFeesCollected(event, fees)
}
