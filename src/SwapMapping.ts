import {
  Authorize as AuthorizeEvent,
  Cancel as CancelEvent,
  Swap as SwapEvent
} from "../generated/SwapContract/SwapContract";
import { Cancel, Swap, SwapContract } from "../generated/schema";
import { getUser, getToken } from "./EntityHelper";
import { getUsdPricePerToken } from "../src/prices";
import * as utils from "./prices/common/utils";
import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { updateDailyFeesCollected, updateDailySwapVolume } from "./metrics";

export function handleAuthorize(event: AuthorizeEvent): void {
  const signer = getUser(event.params.signer.toHex());
  const signerWallet = getUser(event.params.signerWallet.toHex());

  const authorize = signer.authorizeAddress;
  const currentIdx = authorize.indexOf(signerWallet.id);

  // only add if sender is not in the list
  if (currentIdx == -1) {
    authorize.push(signerWallet.id);
    signer.authorizeAddress = authorize;
    signer.save();
  }
}

export function handleCancel(event: CancelEvent): void {
  const entity = new Cancel(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.nonce = event.params.nonce;
  entity.signerWallet = event.params.signerWallet;
  entity.save();
}

export function handleSwap(event: SwapEvent): void {
  const completedSwap = new Swap(
    event.params.signerWallet.toHex() + event.params.nonce.toString()
  );

  let swapContract = SwapContract.load(event.address.toHex());
  if (!swapContract) {
    swapContract = new SwapContract(event.address.toHex());
    swapContract.save();
  }

  const signerWallet = getUser(event.params.signerWallet.toHex());
  const senderWallet = getUser(event.params.senderWallet.toHex());
  const signerToken = getToken(event.params.signerToken.toHex());
  const senderToken = getToken(event.params.senderToken.toHex());

  const senderTokenPrice = getUsdPricePerToken(event.params.senderToken);
  const signerTokenPrice = getUsdPricePerToken(event.params.signerToken);

  const senderTokenAmount = event.params.senderAmount;
  const senderTokenDecimal = utils.getTokenDecimal(event.params.senderToken);

  const senderAmountUSD = senderTokenAmount
    .toBigDecimal()
    .div(senderTokenDecimal)
    .times(senderTokenPrice.usdPrice)
    .div(senderTokenPrice.decimalsBaseTen);

  const signerTokenAmount = event.params.signerAmount;
  const signerTokenDecimal = utils.getTokenDecimal(event.params.signerToken);

  const signerAmountUSD = signerTokenAmount
    .toBigDecimal()
    .div(signerTokenDecimal)
    .times(signerTokenPrice.usdPrice)
    .div(signerTokenPrice.decimalsBaseTen);

  const BIGINT_TWO = BigInt.fromI32(2);
  const BIGDECIMAL_TWO = new BigDecimal(BIGINT_TWO);

  const sumSwap = senderAmountUSD.plus(signerAmountUSD);
  const avgSwap = sumSwap.div(BIGDECIMAL_TWO);

  const BIGDECIMAL_10k = new BigDecimal(BigInt.fromI32(10000));

  const protocolFee = event.params.protocolFee;
  const fees = avgSwap.times(protocolFee.toBigDecimal()).div(BIGDECIMAL_10k);

  completedSwap.swap = swapContract.id;
  completedSwap.block = event.block.number;
  completedSwap.transactionHash = event.transaction.hash;
  completedSwap.timestamp = event.block.timestamp;
  completedSwap.from = event.transaction.from;
  completedSwap.to = event.transaction.to;
  completedSwap.value = event.transaction.value;
  completedSwap.nonce = event.params.nonce;
  completedSwap.expiry = event.params.timestamp;

  completedSwap.signerWallet = signerWallet.id;
  completedSwap.signerToken = signerToken.id;
  completedSwap.protocolFee = event.params.protocolFee;
  completedSwap.senderWallet = senderWallet.id;
  completedSwap.senderToken = senderToken.id;
  completedSwap.senderAmountUSD = senderAmountUSD;
  completedSwap.signerAmountUSD = signerAmountUSD;
  completedSwap.signerAmount = signerTokenAmount;
  completedSwap.senderAmount = senderTokenAmount;
  completedSwap.senderTokenDecimal = senderTokenDecimal;
  completedSwap.signerTokenDecimal = signerTokenDecimal;
  completedSwap.senderTokenPrice = senderTokenPrice.usdPrice;
  completedSwap.signerTokenPrice = signerTokenPrice.usdPrice;
  completedSwap.save();

  updateDailySwapVolume(event, avgSwap);
  updateDailyFeesCollected(event, fees);
}
