import { SwapERC20 as SwapERC20Event } from '../generated/SwapERC20Contract/SwapERC20Contract'
import { SwapERC20 } from '../generated/schema'

import { getUsdPricePerToken } from './messari/prices'
import { DEFAULT_USDC_DECIMALS } from './messari/prices/common/constants'
import { getTokenDecimals } from './messari/prices/common/utils'

import {
  Address,
  BigInt,
  ByteArray,
  crypto,
  ethereum,
  log
} from '@graphprotocol/graph-ts'

import {
  updateMetrics,
  BIGINT_TEN,
  BIGDECIMAL_TWO,
  BIGDECIMAL_TEN_THOUSAND,
  BIGINT_ZERO,
} from './metrics'

const PROTOCOL_FEE_RECEIVER_ADDRESS =
  '0xaD30f7EEBD9Bd5150a256F47DA41d4403033CdF0'

const TRANSFER_TOPIC = 0
const FROM_TOPIC = 1
const TO_TOPIC = 2

export function handleSwapERC20(event: SwapERC20Event): void {
  const logs = event.receipt!.logs || []

  let feeAmount = BIGINT_ZERO
  let signerToken: Address | null = null
  let signerAmount: BigInt = BIGINT_ZERO
  let senderWallet: Address | null = null
  let senderToken: Address | null = null
  let senderAmount: BigInt = BIGINT_ZERO

  let i = logs.length
  while (i--) {
    const logi = logs.at(i)
    if (
      logi.topics.length &&
      crypto
        .keccak256(ByteArray.fromUTF8('Transfer(address,address,uint256)'))
        .equals(logi.topics.at(TRANSFER_TOPIC))
    ) {

      log.info('{}, {}', [
        ethereum.decode('address', logi.topics.at(FROM_TOPIC))!.toAddress().toHexString(),
        ethereum.decode('address', logi.topics.at(TO_TOPIC))!.toAddress().toHexString()
      ])

      if (
        ethereum.decode('address', logi.topics.at(TO_TOPIC))!.toAddress() ===
        Address.fromString(PROTOCOL_FEE_RECEIVER_ADDRESS)
      ) {
        feeAmount = ethereum.decode('uint256', logi.data)!.toBigInt()
      } else {
        let j = logs.length
        while (j--) {
          const logj = logs.at(j)
          if (
            logi.topics.length &&
            crypto
              .keccak256(
                ByteArray.fromUTF8('Transfer(address,address,uint256)')
              )
              .equals(logj.topics.at(TRANSFER_TOPIC))
          ) {
            const ifrom = ethereum
              .decode('address', logi.topics.at(FROM_TOPIC))!
              .toAddress()
            const ito = ethereum
              .decode('address', logi.topics.at(TO_TOPIC))!
              .toAddress()
            const jfrom = ethereum
              .decode('address', logj.topics.at(FROM_TOPIC))!
              .toAddress()
            const jto = ethereum
              .decode('address', logj.topics.at(TO_TOPIC))!
              .toAddress()

            if (
              ifrom === event.params.signerWallet &&
              ifrom === jto &&
              ito == jfrom
            ) {
              signerToken = logi.address
              signerAmount = ethereum.decode('uint256', logi.data)!.toBigInt()
              senderWallet = jfrom
              senderToken = logj.address
              senderAmount = ethereum.decode('uint256', logj.data)!.toBigInt()
              break
            }
          }
        }
      }
    }
  }

  if (
    signerToken !== null &&
    senderToken !== null &&
    senderWallet !== null
  ) {
    const senderTokenPrice = getUsdPricePerToken(senderToken)
    const senderTokenDecimal = BIGINT_TEN.pow(
      getTokenDecimals(senderToken).toI32() as u8
    ).toBigDecimal()

    const senderAmountUSD = senderAmount
      .toBigDecimal()
      .div(senderTokenDecimal)
      .times(senderTokenPrice.usdPrice)

    const signerTokenPrice = getUsdPricePerToken(signerToken)
    const signerTokenDecimal = BIGINT_TEN.pow(
      getTokenDecimals(signerToken).toI32() as u8
    ).toBigDecimal()

    const signerAmountUSD = signerAmount
      .toBigDecimal()
      .div(signerTokenDecimal)
      .times(signerTokenPrice.usdPrice)

    const swapValue = senderAmountUSD
      .plus(signerAmountUSD)
      .div(BIGDECIMAL_TWO)
      .truncate(DEFAULT_USDC_DECIMALS)

    const feeValue = swapValue
      .times(feeAmount.toBigDecimal())
      .div(BIGDECIMAL_TEN_THOUSAND)
      .truncate(DEFAULT_USDC_DECIMALS)

    updateMetrics(event, swapValue, feeValue)

    let entity = new SwapERC20(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.nonce = event.params.nonce
    entity.signerWallet = event.params.signerWallet

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.nonce = event.params.nonce
    entity.signerWallet = event.params.signerWallet
    entity.signerToken = signerToken
    entity.signerAmount = signerAmount
    entity.senderWallet = senderWallet
    entity.senderToken = senderToken
    entity.senderAmount = senderAmount
    entity.feeAmount = feeAmount

    entity.senderAmountUSD = senderAmountUSD
    entity.signerAmountUSD = signerAmountUSD
    entity.feeAmountUSD = feeValue
    entity.senderTokenPrice = senderTokenPrice.usdPrice
    entity.signerTokenPrice = signerTokenPrice.usdPrice
    entity.senderTokenDecimal = senderTokenDecimal
    entity.signerTokenDecimal = signerTokenDecimal

    entity.save()
  }
}
