import {
  Authorize as AuthorizeEvent,
  DelegateSwap as DelegateSwapEvent,
  OwnershipHandoverCanceled as OwnershipHandoverCanceledEvent,
  OwnershipHandoverRequested as OwnershipHandoverRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Revoke as RevokeEvent,
  SetRule as SetRuleEvent,
  UnsetRule as UnsetRuleEvent
} from "../generated/Delegate/Delegate"
import {
  Authorize,
  DelegateSwap,
  OwnershipHandoverCanceled,
  OwnershipHandoverRequested,
  OwnershipTransferred,
  Revoke,
  SetRule,
  UnsetRule
} from "../generated/schema"

export function handleAuthorize(event: AuthorizeEvent): void {
  let entity = new Authorize(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.signatory = event.params.signatory
  entity.signer = event.params.signer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDelegateSwap(event: DelegateSwapEvent): void {
  let entity = new DelegateSwap(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nonce = event.params.nonce
  entity.signerWallet = event.params.signerWallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipHandoverCanceled(
  event: OwnershipHandoverCanceledEvent
): void {
  let entity = new OwnershipHandoverCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pendingOwner = event.params.pendingOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipHandoverRequested(
  event: OwnershipHandoverRequestedEvent
): void {
  let entity = new OwnershipHandoverRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pendingOwner = event.params.pendingOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldOwner = event.params.oldOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRevoke(event: RevokeEvent): void {
  let entity = new Revoke(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tmp = event.params.tmp
  entity.signer = event.params.signer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetRule(event: SetRuleEvent): void {
  let entity = new SetRule(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.senderWallet = event.params.senderWallet
  entity.senderToken = event.params.senderToken
  entity.senderRuleAmount = event.params.senderRuleAmount
  entity.senderFilledAmount = event.params.senderFilledAmount
  entity.signerToken = event.params.signerToken
  entity.signerAmount = event.params.signerAmount
  entity.ruleExpiry = event.params.ruleExpiry

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnsetRule(event: UnsetRuleEvent): void {
  let entity = new UnsetRule(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.signer = event.params.signer
  entity.signerToken = event.params.signerToken
  entity.senderToken = event.params.senderToken

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
