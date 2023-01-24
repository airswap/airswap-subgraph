import { WrappedSwapFor as WrappedSwapForEvent } from "../generated/WrapperContract/WrapperContract";
import { WrappedSwapFor } from "../generated/schema";

export function handleWrappedSwapFor(event: WrappedSwapForEvent): void {
  let entity = new WrappedSwapFor(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.senderWallet = event.params.senderWallet;
  entity.save();
}
