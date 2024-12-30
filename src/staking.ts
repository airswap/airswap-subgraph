import { BigInt } from '@graphprotocol/graph-ts'
import { Transfer } from '../generated/StakingContract/StakingContract'
import { Staker } from '../generated/schema'
import { updateStakingMetrics } from './metrics'
import { store } from '@graphprotocol/graph-ts'
import {
  STAKING_V3_ADDRESS,
  STAKING_V4_ADDRESS,
  STAKING_V4_2_ADDRESS,
  ADDRESS_ZERO,
} from '../generated/constants'

export function handleTransfer(event: Transfer): void {
  // Tokens to add/subtract from totalStakedAmount
  let tokenCount = event.params.tokens
  // Stakers to add/subtract from totalStakersCount
  let stakersCount = BigInt.fromI32(0)
  // If from is zero address, this is a staking action
  if (event.params.from.toHex() == ADDRESS_ZERO) {
    let staker = Staker.load(event.params.to)
    if (!staker) {
      staker = new Staker(event.params.to)
      staker.totalStakedAmount = BigInt.fromI32(0)
      staker.v3StakedAmount = BigInt.fromI32(0)
      staker.v4StakedAmount = BigInt.fromI32(0)
      staker.v4_2StakedAmount = BigInt.fromI32(0)
      stakersCount = BigInt.fromI32(1)
    }
    addStakerAmount(event, staker)

    staker.save()
    // If to is zero address, this is a staking action
  } else if (event.params.to.toHex() == ADDRESS_ZERO) {
    tokenCount = tokenCount.times(BigInt.fromI32(-1))
    let staker = Staker.load(event.params.from)
    // staker should always exist as you can't unstake if you don't have any tokens staked
    if (staker) {
      removeStakerAmount(event, staker)
      if (staker.totalStakedAmount.equals(BigInt.fromI32(0))) {
        if (
          !staker.v3StakedAmount.equals(BigInt.fromI32(0)) ||
          !staker.v4StakedAmount.equals(BigInt.fromI32(0)) ||
          !staker.v4_2StakedAmount.equals(BigInt.fromI32(0))
        ) {
          stakersCount = BigInt.fromI32(-1)
        }
        store.remove('Staker', staker.id.toHexString())
      }
      staker.save()
    }
    // The staking contract is not and ERC20 so all transfers should have to or from as zero address
  } else {
    return
  }
  updateStakingMetrics(event, tokenCount, stakersCount)
}

function addStakerAmount(event: Transfer, staker: Staker): void {
  let contractAddress = event.address.toHexString().toLowerCase()
  if (contractAddress == STAKING_V3_ADDRESS.toLowerCase()) {
    staker.v3StakedAmount = staker.v3StakedAmount.plus(event.params.tokens)
  } else if (contractAddress == STAKING_V4_ADDRESS.toLowerCase()) {
    staker.v4StakedAmount = staker.v4StakedAmount.plus(event.params.tokens)
  } else if (contractAddress == STAKING_V4_2_ADDRESS.toLowerCase()) {
    staker.v4_2StakedAmount = staker.v4_2StakedAmount.plus(event.params.tokens)
  }
  staker.totalStakedAmount = staker.totalStakedAmount.plus(event.params.tokens)
}

function removeStakerAmount(event: Transfer, staker: Staker): void {
  let contractAddress = event.address.toHexString().toLowerCase()
  if (contractAddress == STAKING_V3_ADDRESS.toLowerCase()) {
    staker.v3StakedAmount = staker.v3StakedAmount.minus(event.params.tokens)
  } else if (contractAddress == STAKING_V4_ADDRESS.toLowerCase()) {
    staker.v4StakedAmount = staker.v4StakedAmount.minus(event.params.tokens)
  } else if (contractAddress == STAKING_V4_2_ADDRESS.toLowerCase()) {
    staker.v4_2StakedAmount = staker.v4_2StakedAmount.minus(event.params.tokens)
  }
  staker.totalStakedAmount = staker.totalStakedAmount.minus(event.params.tokens)
}
