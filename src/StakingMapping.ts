import {
  CompleteDurationChange as CompleteDurationChangeEvent,
  ProposeDelegate as ProposeDelegateEvent,
  SetDelegate as SetDelegateEvent,
  Transfer as TransferEvent,
} from "../generated/StakingContract/StakingContract";
import {
  CompleteDurationChange,
  ProposeDelegate,
  SetDelegate,
  Transfer,
} from "../generated/schema";

export function handleCompleteDurationChange(
  event: CompleteDurationChangeEvent
): void {
  let entity = new CompleteDurationChange(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.newDuration = event.params.newDuration;
  entity.save();
}

export function handleProposeDelegate(event: ProposeDelegateEvent): void {
  let entity = new ProposeDelegate(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.delegate = event.params.delegate;
  entity.account = event.params.account;
  entity.save();
}

export function handleSetDelegate(event: SetDelegateEvent): void {
  let entity = new SetDelegate(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.delegate = event.params.delegate;
  entity.account = event.params.account;
  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokens = event.params.tokens;
  entity.save();
}
