import { BigDecimal } from '@graphprotocol/graph-ts'
import { getDailyfeesCollected, getDailySwapVolume } from './entities'
import { Swap as SwapEvent } from '../generated/SwapContract/SwapContract'

export function updateDailySwapVolume(
  event: SwapEvent,
  swapValue: BigDecimal
): void {
  //the following uses integer division based on the number of seconds in a day to generate the id and date
  const dayId = event.block.timestamp.toI32() / 86400
  const dayStartTimestamp = dayId * 86400

  const dailyVolume = getDailySwapVolume(dayId.toString())
  //setup the dayStartTimeStamp if the entity is new
  if (dailyVolume.date == 0) {
    dailyVolume.date = dayStartTimestamp
  }
  dailyVolume.amount = dailyVolume.amount.plus(swapValue)
  dailyVolume.save()
}

export function updateDailyFeesCollected(
  event: SwapEvent,
  feeValueUsd: BigDecimal
): void {
  //the following uses integer division based on the number of seconds in a day to generate the id and date
  const dayId = event.block.timestamp.toI32() / 86400
  const dayStartTimestamp = dayId * 86400

  const dailyFees = getDailyfeesCollected(dayId.toString())
  //setup the dayStartTimeStamp if the entity is new
  if (dailyFees.date == 0) {
    dailyFees.date = dayStartTimestamp
  }
  dailyFees.amount = dailyFees.amount.plus(feeValueUsd)
  dailyFees.save()
}
