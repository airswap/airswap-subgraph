import { BigInt } from '@graphprotocol/graph-ts'
import { Transfer } from '../generated/StakingContract/StakingContract'
import { Staker } from '../generated/schema'
import { updateStakingMetrics } from './metrics'

export function handleTransfer(event: Transfer): void {
  const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
  // Tokens to add/subtract from totalStakedAmount
  let tokenCount = event.params.tokens
  // Stakers to add/subtract from totalStakersCount
  let stakersCount = BigInt.fromI32(0)
  // If from is zero address, this is a staking action
  if (event.params.from.toHex() == ADDRESS_ZERO) {
    let staker = Staker.load(event.params.to)
    if (!staker) {
      staker = new Staker(event.params.to)
      staker.stakedAmount = BigInt.fromI32(0)
      stakersCount = BigInt.fromI32(1)
    }
    staker.stakedAmount = staker.stakedAmount.plus(event.params.tokens)

    staker.save()
    // If to is zero address, this is a staking action
  } else if (event.params.to.toHex() == ADDRESS_ZERO) {
    tokenCount = tokenCount.times(BigInt.fromI32(-1))
    let staker = Staker.load(event.params.from)
    // staker should always exist as you can't unstake if you don't have any tokens staked
    if (staker) {
      staker.stakedAmount = staker.stakedAmount.minus(event.params.tokens)
      if (staker.stakedAmount.equals(BigInt.fromI32(0))) {
        stakersCount = BigInt.fromI32(-1)
      }
      staker.save()
    }
    // The staking contract is not and ERC20 so all transfers should have to or from as zero address
  } else {
    return
  }
  updateStakingMetrics(event, tokenCount, stakersCount)
}
