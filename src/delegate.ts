import { SetRule as SetRuleEvent } from '../generated/DelegateContract/DelegateContract'
import { UnsetRule as UnsetRuleEvent } from '../generated/DelegateContract/DelegateContract'
import { SwapDelegateFor as SwapDelegateForEvent } from '../generated/DelegateContract/DelegateContract'
import {
  Address,
  BigInt,
  Bytes,
  ByteArray,
  crypto,
  ethereum,
} from '@graphprotocol/graph-ts'

function getAmount(data: Bytes): BigInt {
  return ethereum.decode('uint256', data)!.toBigInt()
}

export function handleSetRule(event: SetRuleEvent): void {}

export function handleUnsetRule(event: UnsetRuleEvent): void {}

export function handleSwapDelegateFor(event: SwapDelegateForEvent): void {}
