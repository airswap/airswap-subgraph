import {
  SetMax as SetMaxEvent,
  SetScale as SetScaleEvent,
  Withdraw as WithdrawEvent
} from "../generated/PoolContract/PoolContract"
import {
  SetMax,
  SetScale,
  PoolClaim
} from "../generated/schema"


export function handleSetMax(event: SetMaxEvent): void {
  let entity = new SetMax(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.max = event.params.max
  entity.save()
}

export function handleSetScale(event: SetScaleEvent): void {
  let entity = new SetScale(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.scale = event.params.scale
  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new PoolClaim(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.nonce = event.params.nonce
  entity.timestamp = event.block.timestamp
  entity.expiry = event.params.expiry
  entity.account = event.params.account
  entity.token = event.params.token
  entity.amount = event.params.amount
  entity.score = event.params.score
  entity.save()
}
