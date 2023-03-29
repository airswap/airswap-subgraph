import { BigInt } from '@graphprotocol/graph-ts'
import { Transfer as TransferEvent } from '../../generated/AirswapToken/AirswapToken'
import { getUser, updateDailyTransferValue } from '../entities'
import { TokenTransfer } from '../../generated/schema'

export function handleTransfer(event: TransferEvent): void {
  const entity = new TokenTransfer(event.transaction.hash.toHex())

  const fromUser = getUser(event.params._from.toHexString())
  const toUser = getUser(event.params._to.toHexString())

  fromUser.tokenBalance = fromUser.tokenBalance.minus(event.params._value)
  fromUser.totalTransfers = fromUser.totalTransfers.plus(BigInt.fromI32(1))

  fromUser.save()

  toUser.tokenBalance = toUser.tokenBalance.plus(event.params._value)
  toUser.totalTransfers = toUser.totalTransfers.plus(BigInt.fromI32(1))
  toUser.save()

  entity._from = fromUser.id
  entity._to = toUser.id
  entity._value = event.params._value
  entity.save()
  updateDailyTransferValue(event, event.params._value)
}
