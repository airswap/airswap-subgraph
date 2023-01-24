import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Transfer as TransferEvent } from "../generated/AirswapToken/AirswapToken";
import { getUser, updateDailyTransferValue } from "./EntityHelper";
import { TokenTransfer } from "../generated/schema";
import * as utils from "./prices/common/utils";
import { getUsdPricePerToken } from "./prices";

export function handleTransfer(event: TransferEvent): void {
  let entity = new TokenTransfer(event.transaction.hash.toHex());

  let fromUser = getUser(event.params._from.toHexString());
  let toUser = getUser(event.params._to.toHexString());

  fromUser.tokenBalance = fromUser.tokenBalance.minus(event.params._value);
  //   fromUser.tokenBalanceUSD = fromUser.tokenBalanceUSD.minus(tokenAmountUSD);
  fromUser.totalTransfers = fromUser.totalTransfers.plus(BigInt.fromI32(1));

  fromUser.save();

  toUser.tokenBalance = toUser.tokenBalance.plus(event.params._value);
  //   fromUser.tokenBalanceUSD = fromUser.tokenBalanceUSD.plus(tokenAmountUSD);
  toUser.totalTransfers = toUser.totalTransfers.plus(BigInt.fromI32(1));
  toUser.save();

  entity._from = fromUser.id;
  entity._to = toUser.id;
  entity._value = event.params._value;
  entity.save();
  updateDailyTransferValue(event, event.params._value);
}
