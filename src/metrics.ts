import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { SwapERC20 as SwapERC20Event } from '../generated/SwapERC20Contract/SwapERC20Contract'
import { TotalVolume, DailyVolume, DailyFees } from '../generated/schema'

export const BIGINT_ZERO = BigInt.zero()
export const BIGINT_TWO = BigInt.fromI32(2)
export const BIGINT_TEN = BigInt.fromI32(10)
export const BIGINT_TEN_THOUSAND = BigInt.fromI32(10000)

export const BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO)
export const BIGDECIMAL_TWO = new BigDecimal(BIGINT_TWO)
export const BIGDECIMAL_TEN_THOUSAND = new BigDecimal(BIGINT_TEN_THOUSAND)

export function updateVolumeEntity(
  event: SwapERC20Event,
  swapValue: BigDecimal
): void {
  const dayId = event.block.timestamp.toI32() / 86400

  let volume = DailyVolume.load(dayId.toString())
  if (!volume) {
    volume = new DailyVolume(dayId.toString())
    volume.date = 0
    volume.amount = BigDecimal.fromString('0')
    volume.save()
  }

  if (volume.date == 0) {
    volume.date = event.block.timestamp.toI32()
  }
  volume.amount = volume.amount.plus(swapValue)
  volume.save()

  let swapVolume = TotalVolume.load(event.address.toHex())
  if (!swapVolume) {
    swapVolume = new TotalVolume(event.address.toHex())
    swapVolume.amount = BIGDECIMAL_ZERO
    swapVolume.save()
  }
  swapVolume.amount = swapVolume.amount.plus(swapValue)
  swapVolume.save()
}

export function updateFeesEntity(
  event: SwapERC20Event,
  feeValueUsd: BigDecimal
): void {
  const dayId = event.block.timestamp.toI32() / 86400

  let fees = DailyFees.load(dayId.toString())
  if (!fees) {
    fees = new DailyFees(dayId.toString())
    fees.date = 0
    fees.amount = BigDecimal.fromString('0')
    fees.save()
  }

  if (fees.date == 0) {
    fees.date = event.block.timestamp.toI32()
  }
  fees.amount = fees.amount.plus(feeValueUsd)
  fees.save()
}
