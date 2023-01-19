import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { User, Token, DailySwapVolume, FeePerDay, AstDailySnapshot } from "../generated/schema";
import { _ERC20 } from "../generated/SwapContract/_ERC20";
import { Transfer } from "../generated/AirswapToken/AirswapToken";

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


export function updateDailyTransferValue(event: Transfer, swapValue: BigInt): void {
    //the following uses integer division based on the number of seconds in a day to generate the id and date
    let dayId = event.block.timestamp.toI32() / 86400
    let dayStartTimestamp = dayId * 86400
  
    let dailyVolume = getDailyTransferValue(dayId.toString())
    //setup the dayStartTimeStamp if the entity is new
    if (dailyVolume.date == 0) {
        dailyVolume.date = dayStartTimestamp
    }
    dailyVolume.dailyTotalTransfer = dailyVolume.dailyTotalTransfer.plus(swapValue)
    dailyVolume.save()
}