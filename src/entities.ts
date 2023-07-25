import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { User, Token, DailyVolume, DailyFees } from '../generated/schema'

export const BIGINT_ZERO = BigInt.zero()
export const BIGINT_TWO = BigInt.fromI32(2)
export const BIGINT_TEN_THOUSAND = BigInt.fromI32(10000)

export const BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO)
export const BIGDECIMAL_TWO = new BigDecimal(BIGINT_TWO)
export const BIGDECIMAL_TEN_THOUSAND = new BigDecimal(BIGINT_TEN_THOUSAND)

export function getUser(userAddress: string): User {
  let user = User.load(userAddress)
  if (user == null) {
    user = new User(userAddress)
    user.tokenBalance = BigInt.zero()
    user.totalTransfers = BigInt.fromI32(1)
    user.authorizeAddress = new Array<string>()
    user.save()
  }

  return user as User
}

export function getToken(tokenAddress: string): Token {
  let token = Token.load(tokenAddress)
  if (!token) {
    token = new Token(tokenAddress)
    token.isBlacklisted = false
    token.save()
  }
  return token as Token
}

export function getDailySwapVolume(dayId: string): DailyVolume {
  let volume = DailyVolume.load(dayId)
  if (!volume) {
    volume = new DailyVolume(dayId)
    volume.date = 0
    volume.amount = BigDecimal.fromString('0')
    volume.save()
  }
  return volume as DailyVolume
}

export function getDailyfeesCollected(dayId: string): DailyFees {
  let fees = DailyFees.load(dayId)
  if (!fees) {
    fees = new DailyFees(dayId)
    fees.date = 0
    fees.amount = BigDecimal.fromString('0')
    fees.save()
  }
  return fees as DailyFees
}
