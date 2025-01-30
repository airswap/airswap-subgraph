import { SwapERC20 as SwapERC20Event } from '../generated/SwapERC20Contract/SwapERC20Contract'
import { SwapERC20 } from '../generated/schema'

import { getUsdPricePerToken } from './messari/prices'
import { DEFAULT_USDC_DECIMALS } from './messari/prices/common/constants'
import { getTokenDecimals } from './messari/prices/common/utils'

import {
  Address,
  BigInt,
  Bytes,
  ByteArray,
  crypto,
  ethereum,
} from '@graphprotocol/graph-ts'

import { updateSwapMetrics, BIGINT_TEN, BIGINT_ZERO } from './metrics'

const PROTOCOL_FEE_RECEIVER = Address.fromString(
  '0xad30f7eebd9bd5150a256f47da41d4403033cdf0'
)

const TRANSFER_TOPIC_HASH = crypto.keccak256(
  ByteArray.fromUTF8('Transfer(address,address,uint256)')
)
const TRANSFER_TOPIC = 0
const FROM_TOPIC = 1
const TO_TOPIC = 2

function getAddress(topic: Bytes): Address {
  return ethereum.decode('address', topic)!.toAddress()
}

function getAmount(data: Bytes): BigInt {
  return ethereum.decode('uint256', data)!.toBigInt()
}

export function handleSwapERC20(event: SwapERC20Event): void {
  const logs = event.receipt!.logs || []

  let feeAmount = BIGINT_ZERO
  let signerToken: Address | null = null
  let signerAmount: BigInt = BIGINT_ZERO
  let senderWallet: Address | null = null
  let senderToken: Address | null = null
  let senderAmount: BigInt = BIGINT_ZERO

  let i = logs.length
  let j = logs.length
  let ilog: ethereum.Log
  let jlog: ethereum.Log
  let ifrom: Address
  let ito: Address
  let jfrom: Address
  let jto: Address

  // SwapERC20 only includes nonce and signerWallet.
  // Remaining swap fields are derived from mutual transfers.
  // Iterate over logs to find mutual transfers.
  while (i--) {
    ilog = logs.at(i)

    // Check if log is a transfer.
    if (ilog.topics.at(TRANSFER_TOPIC).equals(TRANSFER_TOPIC_HASH)) {
      ito = getAddress(ilog.topics.at(TO_TOPIC))

      // Check if transfer is to fee receiver.
      if (ito.equals(PROTOCOL_FEE_RECEIVER)) {
        feeAmount = getAmount(ilog.data)
      } else {
        ifrom = getAddress(ilog.topics.at(FROM_TOPIC))
        j = logs.length

        // Iterate over logs again to find mutual transfers.
        while (j--) {
          jlog = logs.at(j)

          // Check if log is a transfer.
          if (jlog.topics.at(TRANSFER_TOPIC).equals(TRANSFER_TOPIC_HASH)) {
            jfrom = getAddress(jlog.topics.at(FROM_TOPIC))
            jto = getAddress(jlog.topics.at(TO_TOPIC))

            // Check if transfer is mutual.
            if (
              ifrom.equals(event.params.signerWallet) &&
              ifrom.equals(jto) &&
              ito.equals(jfrom)
            ) {
              // Found mutual transfers.
              signerToken = ilog.address
              signerAmount = getAmount(ilog.data)
              senderWallet = jfrom
              senderToken = jlog.address
              senderAmount = getAmount(jlog.data)
              break
            }
          }
        }
      }
    }
  }

  // If swap was found, determine USD values and save.
  if (senderWallet !== null && signerToken !== null && senderToken !== null) {
    const signerTokenUSDPrice = getUsdPricePerToken(signerToken).usdPrice
    const senderTokenUSDPrice = getUsdPricePerToken(senderToken).usdPrice
    const signerAmountUSD = signerAmount
      .toBigDecimal()
      .div(
        BIGINT_TEN.pow(
          getTokenDecimals(signerToken).toI32() as u8
        ).toBigDecimal()
      )
      .times(signerTokenUSDPrice)

    const feeAmountUSD = feeAmount
      .toBigDecimal()
      .div(
        BIGINT_TEN.pow(
          getTokenDecimals(signerToken).toI32() as u8
        ).toBigDecimal()
      )
      .times(signerTokenUSDPrice)

    const senderAmountUSD = senderAmount
      .toBigDecimal()
      .div(
        BIGINT_TEN.pow(
          getTokenDecimals(senderToken).toI32() as u8
        ).toBigDecimal()
      )
      .times(senderTokenUSDPrice)

    updateSwapMetrics(event, senderAmountUSD, feeAmountUSD)

    const entity = new SwapERC20(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    )

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.from = event.transaction.from
    entity.to = event.address

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
    entity.feeAmountUSD = feeAmountUSD

    entity.save()
  }
}
