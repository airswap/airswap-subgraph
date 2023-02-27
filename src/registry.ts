import {
  AddTokens as AddTokensEvent,
  RemoveTokens as RemoveTokensEvent,
} from "../generated/Registry/Registry";
import { AddToken, RemoveToken } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

export function handleAddTokens(event: AddTokensEvent): void {
  const addNewToken = new AddToken(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  addNewToken.account = event.params.account;
  addNewToken.tokens = event.params.tokens.map<Bytes>(
    (tokens: Bytes) => tokens
  );

  addNewToken.blockNumber = event.block.number;
  addNewToken.blockTimestamp = event.block.timestamp;
  addNewToken.transactionHash = event.transaction.hash;

  addNewToken.save();
}

export function handleRemoveTokens(event: RemoveTokensEvent): void {
  const removeToken = new RemoveToken(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  removeToken.account = event.params.account;
  removeToken.tokens = event.params.tokens.map<Bytes>(
    (tokens: Bytes) => tokens
  );

  removeToken.blockNumber = event.block.number;
  removeToken.blockTimestamp = event.block.timestamp;
  removeToken.transactionHash = event.transaction.hash;

  removeToken.save();
}
