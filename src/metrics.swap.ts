import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { SwapERC20 as SwapERC20Event } from '../generated/SwapERC20Contract/SwapERC20Contract'
import { SwapERC20 as SwapERC20EventV4 } from '../generated/SwapERC20ContractV4/SwapERC20Contract'
import { Total, Yearly, Daily } from '../generated/schema'

export const BIGINT_ZERO = BigInt.zero()
export const BIGINT_TWO = BigInt.fromI32(2)
export const BIGINT_TEN = BigInt.fromI32(10)
export const BIGINT_TEN_THOUSAND = BigInt.fromI32(10000)

export const BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO)
export const BIGDECIMAL_TWO = new BigDecimal(BIGINT_TWO)
export const BIGDECIMAL_TEN_THOUSAND = new BigDecimal(BIGINT_TEN_THOUSAND)

export const SECONDS_IN_DAY = 86400

export function updateSwapMetricsV4(
  event: SwapERC20EventV4,
  swapValue: BigDecimal,
  feeValue: BigDecimal
): void {
  updateMetricsCore(event.address, event.block.timestamp, swapValue, feeValue)
}

export function updateSwapMetrics(
  event: SwapERC20Event,
  swapValue: BigDecimal,
  feeValue: BigDecimal
): void {
  updateMetricsCore(event.address, event.block.timestamp, swapValue, feeValue)
}

function updateMetricsCore(
  address: Address,
  timestamp: BigInt,
  swapValue: BigDecimal,
  feeValue: BigDecimal
): void {
  let total = Total.load(address.toHex())
  if (!total) {
    total = new Total(address.toHex())
    total.volume = swapValue
    total.fees = feeValue
  } else {
    total.volume = total.volume.plus(swapValue)
    total.fees = total.fees.plus(feeValue)
  }
  total.save()

  const yearId = new Date(timestamp.toI64() * 1000).getUTCFullYear()
  let yearly = Yearly.load(yearId.toString())
  if (!yearly) {
    yearly = new Yearly(yearId.toString())
    yearly.volume = swapValue
    yearly.fees = feeValue
  } else {
    yearly.volume = yearly.volume.plus(swapValue)
    yearly.fees = yearly.fees.plus(feeValue)
  }
  yearly.save()

  const dayId = timestamp.toI32() / SECONDS_IN_DAY
  let daily = Daily.load(dayId.toString())
  if (!daily) {
    daily = new Daily(dayId.toString())
    daily.date = timestamp.toI32()
    daily.volume = swapValue
    daily.fees = feeValue
  } else {
    daily.volume = daily.volume.plus(swapValue)
    daily.fees = daily.fees.plus(feeValue)
  }
  daily.save()
}
