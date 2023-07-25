import {
  CompleteDurationChange as CompleteDurationChangeEvent,
  SetDelegate as SetDelegateEvent,
  Transfer as TransferEvent,
} from '../../generated/StakingContract/StakingContract'
import {
  CompleteDurationChange,
  SetDelegate,
  Transfer,
} from '../../generated/schema'

export function handleCompleteDurationChange(
  event: CompleteDurationChangeEvent
): void {
  const entity = new CompleteDurationChange(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  )
  entity.newDuration = event.params.newDuration
  entity.save()
}

export function handleSetDelegate(event: SetDelegateEvent): void {
  const entity = new SetDelegate(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  )
  entity.delegate = event.params.delegate
  entity.account = event.params.account
  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  const entity = new Transfer(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokens = event.params.tokens
  entity.save()
}
