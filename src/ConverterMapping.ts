import {
  ConvertAndTransfer as ConvertAndTransferEvent,
  PayeeAdded as PayeeAddedEvent,
  PayeeRemoved as PayeeRemovedEvent
} from "../generated/Converter/Converter";
import {
  ConvertAndTransfer,
  PayeeAdded,
  PayeeRemoved
} from "../generated/schema";

export function handleConvertAndTransfer(event: ConvertAndTransferEvent): void {
  const id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  const entity = new ConvertAndTransfer(id);

  entity.triggerAccount = event.params.triggerAccount;
  entity.swapFromToken = event.params.swapFromToken;
  entity.swapToToken = event.params.swapToToken;
  entity.amountTokenFrom = event.params.amountTokenFrom;
  entity.amountTokenTo = event.params.amountTokenTo;
  entity.save();
}

export function handlePayeeAdded(event: PayeeAddedEvent): void {
  const entity = new PayeeAdded(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.account = event.params.account;
  entity.shares = event.params.shares;
  entity.save();
}

export function handlePayeeRemoved(event: PayeeRemovedEvent): void {
  const entity = new PayeeRemoved(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.account = event.params.account;
  entity.save();
}
