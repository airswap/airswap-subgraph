import {
  Authorize as AuthorizeEvent,
  DelegateSwap as DelegateSwapEvent,
  OwnershipHandoverCanceled as OwnershipHandoverCanceledEvent,
  OwnershipHandoverRequested as OwnershipHandoverRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Revoke as RevokeEvent,
  SetRule as SetRuleEvent,
  UnsetRule as UnsetRuleEvent,
} from '../generated/Delegate/Delegate'
import { Market } from '../generated/schema'

import {
  Address,
  BigInt,
  Bytes,
  ByteArray,
  crypto,
  ethereum,
  store,
} from '@graphprotocol/graph-ts'

const TRANSFER_TOPIC_HASH = crypto.keccak256(
  ByteArray.fromUTF8('Transfer(address,address,uint256)')
)
const TRANSFER_TOPIC = 0 // Index of event signature topic
const FROM_TOPIC = 1 // Index of 'from' address topic
const TO_TOPIC = 2 // Index of 'to' address topic

// Helper function to decode address from log topic
function getAddress(topic: Bytes): Address {
  return ethereum.decode('address', topic)!.toAddress()
}

// Helper function to decode amount from log data
function getAmount(data: Bytes): BigInt {
  return ethereum.decode('uint256', data)!.toBigInt()
}

export function handleDelegateSwap(event: DelegateSwapEvent): void {
  // Get all transaction logs
  const logs = event.receipt!.logs || []

  // Variables to store swap details extracted from logs
  let signerToken: Address | null = null
  let signerAmount: BigInt = BigInt.fromI32(0)
  let senderWallet: Address | null = null
  let senderToken: Address | null = null
  let senderAmount: BigInt = BigInt.fromI32(0)

  // Counters for nested log iteration
  let i = logs.length
  let j = logs.length
  let ilog: ethereum.Log
  let jlog: ethereum.Log
  let ifrom: Address
  let ito: Address
  let jfrom: Address
  let jto: Address

  // Iterate through logs to find mutual transfers
  while (i--) {
    ilog = logs.at(i)

    // Check if current log is a Transfer event
    if (ilog.topics.at(TRANSFER_TOPIC).equals(TRANSFER_TOPIC_HASH)) {
      ifrom = getAddress(ilog.topics.at(FROM_TOPIC))
      ito = getAddress(ilog.topics.at(TO_TOPIC))

      // Look for matching transfer in remaining logs
      j = logs.length
      while (j--) {
        jlog = logs.at(j)

        if (jlog.topics.at(TRANSFER_TOPIC).equals(TRANSFER_TOPIC_HASH)) {
          jfrom = getAddress(jlog.topics.at(FROM_TOPIC))
          jto = getAddress(jlog.topics.at(TO_TOPIC))

          // Check if transfers are between the same parties
          if (
            ifrom.equals(event.params.signerWallet) &&
            ifrom.equals(jto) &&
            ito.equals(jfrom)
          ) {
            // Store swap details from matching transfers
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

  // If swap details were found, update the market
  if (senderWallet !== null && signerToken !== null && senderToken !== null) {
    // Create market ID using consistent token ordering
    let marketId: Bytes
    if (senderToken.toHexString() < signerToken.toHexString()) {
      marketId = senderToken.concat(signerToken).concat(senderWallet)
    } else {
      marketId = signerToken.concat(senderToken).concat(senderWallet)
    }

    // Load and update market's filled amount
    let market = Market.load(marketId)
    if (market) {
      market.filledAmount = market.filledAmount.plus(senderAmount)
      market.save()
    }
  }
}
export function handleSetRule(event: SetRuleEvent): void {
  let market = Market.load(
    event.params.senderWallet
      .concat(event.params.senderToken)
      .concat(event.params.signerToken)
  )

  if (!market) {
    market = new Market(
      event.params.senderWallet
        .concat(event.params.senderToken)
        .concat(event.params.signerToken)
    )
  }

  market.senderToken = event.params.senderToken
  market.signerToken = event.params.signerToken
  market.senderWallet = event.params.senderWallet
  market.ruleAmount = event.params.senderAmount
  market.filledAmount = BigInt.fromI32(0)
  market.expiry = event.params.expiry

  market.save()
}

export function handleUnsetRule(event: UnsetRuleEvent): void {
  let marketId = event.params.senderWallet
    .concat(event.params.senderToken)
    .concat(event.params.signerToken)

  let market = Market.load(marketId)
  if (market) {
    store.remove('Market', marketId.toHexString())
  }
}
