import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import {
  User,
  Token,
  DailySwapVolume,
  FeePerDay,
  AstDailySnapshot,
} from "../generated/schema";
import { _ERC20 } from "../generated/SwapContract/_ERC20";
import { Transfer } from "../generated/AirswapToken/AirswapToken";

export const SWAP_ADDRESS = "0x522D6F36c95A1b6509A14272C17747BbB582F2A6";

export const BIGINT_ZERO = BigInt.fromI32(0);
export const BIGINT_TWO = BigInt.fromI32(2);
export const BIGINT_TEN_THOUSAND = BigInt.fromI32(10000);

export const BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);
export const BIGDECIMAL_TWO = new BigDecimal(BIGINT_TWO);
export const BIGDECIMAL_TEN_THOUSAND = new BigDecimal(BIGINT_TEN_THOUSAND);

export function getUser(userAddress: string): User {
  let user = User.load(userAddress);

  if (user == null) {
    user = new User(userAddress);
    user.tokenBalance = BigInt.fromI32(0);
    // user.tokenBalanceUSD = BigDecimal.fromString('0');
    user.totalTransfers = BigInt.fromI32(1);
    user.authorizeAddress = new Array<string>();
    user.save();
  }

  return user as User;
}

export function getToken(tokenAddress: string): Token {
  let token = Token.load(tokenAddress);
  // handle new creation of Token if it doesn't exist
  if (!token) {
    token = new Token(tokenAddress);
    token.isBlacklisted = false;
    token.save();
  }
  return token as Token;
}

export function getDailySwapVolume(dayId: string): DailySwapVolume {
  let volume = DailySwapVolume.load(dayId);
  if (!volume) {
    volume = new DailySwapVolume(dayId);
    volume.date = 0;
    volume.amount = BigDecimal.fromString("0");
    volume.save();
  }
  return volume as DailySwapVolume;
}

export function getDailyfeesCollected(dayId: string): FeePerDay {
  let fees = FeePerDay.load(dayId);
  if (!fees) {
    fees = new FeePerDay(dayId);
    fees.date = 0;
    fees.amount = BigDecimal.fromString("0");
    fees.save();
  }
  return fees as FeePerDay;
}

export function getDailyTransferValue(dayId: string): AstDailySnapshot {
  let value = AstDailySnapshot.load(dayId);
  if (!value) {
    value = new AstDailySnapshot(dayId);
    value.date = 0;
    value.dailyTotalTransfer = BigInt.fromString("0");
    value.save();
  }
  return value as AstDailySnapshot;
}

export function updateDailyTransferValue(
  event: Transfer,
  swapValue: BigInt
): void {
  //the following uses integer division based on the number of seconds in a day to generate the id and date
  const dayId = event.block.timestamp.toI32() / 86400;
  const dayStartTimestamp = dayId * 86400;

  const dailyVolume = getDailyTransferValue(dayId.toString());
  //setup the dayStartTimeStamp if the entity is new
  if (dailyVolume.date == 0) {
    dailyVolume.date = dayStartTimestamp;
  }
  dailyVolume.dailyTotalTransfer =
    dailyVolume.dailyTotalTransfer.plus(swapValue);
  dailyVolume.save();
}
