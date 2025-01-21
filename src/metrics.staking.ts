import { BigInt } from '@graphprotocol/graph-ts'
import { Transfer } from '../generated/StakingContract/StakingContract'
import { TotalStaked } from '../generated/schema'

export const BIGINT_ZERO = BigInt.zero()

export function updateStakingMetrics(
  event: Transfer,
  stakedAmount: BigInt,
  stakersCount: BigInt
): void {
  let totalStaked = TotalStaked.load(event.address.toHexString())
  if (!totalStaked) {
    totalStaked = new TotalStaked(event.address.toHexString())
    totalStaked.amount = BIGINT_ZERO
    totalStaked.count = BIGINT_ZERO
  }

  totalStaked.amount = totalStaked.amount.plus(stakedAmount)
  let newStakersCount = totalStaked.count.plus(stakersCount)
  totalStaked.count = newStakersCount.lt(BIGINT_ZERO)
    ? BIGINT_ZERO
    : newStakersCount

  totalStaked.save()
}
