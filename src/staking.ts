import { BigInt } from '@graphprotocol/graph-ts'
import { Transfer } from '../generated/StakingContract/StakingContract'
import { Staker } from '../generated/schema'
import { updateStakingMetrics } from './metrics'
import { store } from '@graphprotocol/graph-ts'

export function handleTransfer(event: Transfer): void {
  const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
  // Tokens to add/subtract from totalStakedAmount
  let tokenAmount = event.params.tokens
  // Stakers to add/subtract from totalStakersCount
  let stakersCount = BigInt.fromI32(0)
  // If from is zero address, this is a staking action
  if (event.params.from.toHex() == ADDRESS_ZERO) {
    let staker = Staker.load(event.params.to)
    if (!staker) {
      staker = new Staker(event.params.to)
      staker.amount = BigInt.fromI32(0)
      staker.initial = BigInt.fromI32(0)
      stakersCount = BigInt.fromI32(1)
    }
    staker.amount = staker.amount.plus(event.params.tokens)
    staker.initial = event.block.timestamp

    staker.save()
    // If to is zero address, this is a staking action
  } else if (event.params.to.toHex() == ADDRESS_ZERO) {
    tokenAmount = tokenAmount.times(BigInt.fromI32(-1))
    let staker = Staker.load(event.params.from)
    // staker should always exist as you can't unstake if you don't have any tokens staked
    if (staker) {
      staker.amount = staker.amount.minus(event.params.tokens)
      if (staker.amount.equals(BigInt.fromI32(0))) {
        stakersCount = BigInt.fromI32(-1)
        store.remove('Staker', event.params.from.toHexString())
        return
      }
      staker.save()
    }
    // The staking contract is not and ERC20 so all transfers should have to or from as zero address
  } else {
    return
  }
  updateStakingMetrics(event, tokenAmount, stakersCount)
}
