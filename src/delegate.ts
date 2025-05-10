import { SetRule as SetRuleEvent } from '../generated/DelegateContract/DelegateContract'
import { UnsetRule as UnsetRuleEvent } from '../generated/DelegateContract/DelegateContract'
import { DelegatedSwapFor as DelegatedSwapForEvent } from '../generated/DelegateContract/DelegateContract'
import { Rule } from '../generated/schema'
import {
  BigInt,
  store,
  Bytes,
  ByteArray,
  crypto,
  ethereum,
  Address,
} from '@graphprotocol/graph-ts'

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

export function handleSetRule(event: SetRuleEvent): void {
  const ruleId = event.params.senderWallet
    .toHex()
    .concat(event.params.senderToken.toHex())
  let rule = Rule.load(ruleId)

  if (!rule) {
    rule = new Rule(ruleId)
  }

  rule.senderAmountFilled = BigInt.fromI32(0)
  rule.signerAmountFilled = BigInt.fromI32(0)
  rule.senderWallet = event.params.senderWallet
  rule.senderToken = event.params.senderToken
  rule.senderAmount = event.params.senderAmount
  rule.signerToken = event.params.signerToken
  rule.signerAmount = event.params.signerAmount
  rule.expiry = event.params.expiry
  rule.save()
}

export function handleUnsetRule(event: UnsetRuleEvent): void {
  store.remove(
    'Rule',
    event.params.senderWallet.toHex().concat(event.params.senderToken.toHex())
  )
}

export function handleDelegatedSwapFor(event: DelegatedSwapForEvent): void {
  const logs = event.receipt!.logs || []
  let transactionSignerAmount = BigInt.zero()
  let transactionSenderAmount = BigInt.zero()
  let signerToken: Address | null = null
  let senderToken: Address | null = null

  for (let i = 0; i < logs.length; i++) {
    const currentLog = logs[i]

    if (currentLog.topics.at(TRANSFER_TOPIC).equals(TRANSFER_TOPIC_HASH)) {
      const from = getAddress(currentLog.topics.at(FROM_TOPIC))
      const to = getAddress(currentLog.topics.at(TO_TOPIC))
      const amount = getAmount(currentLog.data)

      if (from.equals(event.params.signerWallet) && to.equals(event.address)) {
        transactionSignerAmount = transactionSignerAmount.plus(amount)
        if (signerToken === null) {
          signerToken = currentLog.address
        }
      }

      if (from.equals(event.params.senderWallet) && to.equals(event.address)) {
        transactionSenderAmount = transactionSenderAmount.plus(amount)
        if (senderToken === null) {
          senderToken = currentLog.address
        }
      }
    }
  }

  if (!senderToken || !signerToken) return

  const ruleId = event.params.senderWallet.toHex().concat(senderToken.toHex())
  const rule = Rule.load(ruleId)
  if (!rule) return

  rule.signerAmountFilled = rule.signerAmountFilled.plus(
    transactionSignerAmount
  )
  rule.senderAmountFilled = rule.senderAmountFilled.plus(
    transactionSenderAmount
  )
  rule.save()
}
