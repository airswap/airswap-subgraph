import { BigDecimal } from "@graphprotocol/graph-ts";
import { User, Token, DailySwapVolume, FeePerDay } from "../generated/schema"
import { _ERC20 } from "../generated/SwapContract/_ERC20"
import * as constants from "../src/prices/common/constants";

export function getUser(userAddress: string): User {
  let user = User.load(userAddress)
  // handle new creation of User if they don't exist
  if (!user) {
    user = new User(userAddress)
    user.authorizeAddress = new Array<string>()
    user.save()
  }
  return user as User
}

export function getToken(tokenAddress: string): Token {
  let token = Token.load(tokenAddress)
  // handle new creation of Token if it doesn't exist
  if (!token) {
    token = new Token(tokenAddress)
    token.isBlacklisted = false
    token.save()
  }
  return token as Token
}



export function getDailySwapVolume(dayId: string): DailySwapVolume {
  let volume = DailySwapVolume.load(dayId)
  if (!volume) {
    volume = new DailySwapVolume(dayId)
    volume.date = 0
    volume.amount = BigDecimal.fromString('0')
    volume.save()
  }
  return volume as DailySwapVolume
}


export function getDailyfeesCollected(dayId: string): FeePerDay {
  let fees = FeePerDay.load(dayId)
  if (!fees) {
    fees = new FeePerDay(dayId)
    fees.date = 0
    fees.amount = BigDecimal.fromString('0')
    fees.save()
  }
  return fees as FeePerDay
}
