// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class CancelDurationChange extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CancelDurationChange entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save CancelDurationChange entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("CancelDurationChange", id.toString(), this);
    }
  }

  static load(id: string): CancelDurationChange | null {
    return changetype<CancelDurationChange | null>(
      store.get("CancelDurationChange", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}

export class CompleteDurationChange extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("newDuration", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save CompleteDurationChange entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save CompleteDurationChange entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("CompleteDurationChange", id.toString(), this);
    }
  }

  static load(id: string): CompleteDurationChange | null {
    return changetype<CompleteDurationChange | null>(
      store.get("CompleteDurationChange", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get newDuration(): BigInt {
    let value = this.get("newDuration");
    return value!.toBigInt();
  }

  set newDuration(value: BigInt) {
    this.set("newDuration", Value.fromBigInt(value));
  }
}

export class OwnershipTransferred extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("previousOwner", Value.fromBytes(Bytes.empty()));
    this.set("newOwner", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OwnershipTransferred entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save OwnershipTransferred entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("OwnershipTransferred", id.toString(), this);
    }
  }

  static load(id: string): OwnershipTransferred | null {
    return changetype<OwnershipTransferred | null>(
      store.get("OwnershipTransferred", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get previousOwner(): Bytes {
    let value = this.get("previousOwner");
    return value!.toBytes();
  }

  set previousOwner(value: Bytes) {
    this.set("previousOwner", Value.fromBytes(value));
  }

  get newOwner(): Bytes {
    let value = this.get("newOwner");
    return value!.toBytes();
  }

  set newOwner(value: Bytes) {
    this.set("newOwner", Value.fromBytes(value));
  }
}

export class ProposeDelegate extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("delegate", Value.fromBytes(Bytes.empty()));
    this.set("account", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ProposeDelegate entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ProposeDelegate entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ProposeDelegate", id.toString(), this);
    }
  }

  static load(id: string): ProposeDelegate | null {
    return changetype<ProposeDelegate | null>(store.get("ProposeDelegate", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegate(): Bytes {
    let value = this.get("delegate");
    return value!.toBytes();
  }

  set delegate(value: Bytes) {
    this.set("delegate", Value.fromBytes(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }
}

export class ScheduleDurationChange extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("unlockTimestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save ScheduleDurationChange entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ScheduleDurationChange entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ScheduleDurationChange", id.toString(), this);
    }
  }

  static load(id: string): ScheduleDurationChange | null {
    return changetype<ScheduleDurationChange | null>(
      store.get("ScheduleDurationChange", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get unlockTimestamp(): BigInt {
    let value = this.get("unlockTimestamp");
    return value!.toBigInt();
  }

  set unlockTimestamp(value: BigInt) {
    this.set("unlockTimestamp", Value.fromBigInt(value));
  }
}

export class SetDelegate extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("delegate", Value.fromBytes(Bytes.empty()));
    this.set("account", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SetDelegate entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SetDelegate entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SetDelegate", id.toString(), this);
    }
  }

  static load(id: string): SetDelegate | null {
    return changetype<SetDelegate | null>(store.get("SetDelegate", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegate(): Bytes {
    let value = this.get("delegate");
    return value!.toBytes();
  }

  set delegate(value: Bytes) {
    this.set("delegate", Value.fromBytes(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }
}

export class Transfer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("from", Value.fromBytes(Bytes.empty()));
    this.set("to", Value.fromBytes(Bytes.empty()));
    this.set("tokens", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transfer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Transfer entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Transfer", id.toString(), this);
    }
  }

  static load(id: string): Transfer | null {
    return changetype<Transfer | null>(store.get("Transfer", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    return value!.toBytes();
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value!.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get tokens(): BigInt {
    let value = this.get("tokens");
    return value!.toBigInt();
  }

  set tokens(value: BigInt) {
    this.set("tokens", Value.fromBigInt(value));
  }
}

export class Authorize extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("signer", Value.fromBytes(Bytes.empty()));
    this.set("signerWallet", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Authorize entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Authorize entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Authorize", id.toString(), this);
    }
  }

  static load(id: string): Authorize | null {
    return changetype<Authorize | null>(store.get("Authorize", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get signer(): Bytes {
    let value = this.get("signer");
    return value!.toBytes();
  }

  set signer(value: Bytes) {
    this.set("signer", Value.fromBytes(value));
  }

  get signerWallet(): Bytes {
    let value = this.get("signerWallet");
    return value!.toBytes();
  }

  set signerWallet(value: Bytes) {
    this.set("signerWallet", Value.fromBytes(value));
  }
}

export class Cancel extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("nonce", Value.fromBigInt(BigInt.zero()));
    this.set("signerWallet", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Cancel entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Cancel entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Cancel", id.toString(), this);
    }
  }

  static load(id: string): Cancel | null {
    return changetype<Cancel | null>(store.get("Cancel", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nonce(): BigInt {
    let value = this.get("nonce");
    return value!.toBigInt();
  }

  set nonce(value: BigInt) {
    this.set("nonce", Value.fromBigInt(value));
  }

  get signerWallet(): Bytes {
    let value = this.get("signerWallet");
    return value!.toBytes();
  }

  set signerWallet(value: Bytes) {
    this.set("signerWallet", Value.fromBytes(value));
  }
}

export class Revoke extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("signer", Value.fromBytes(Bytes.empty()));
    this.set("signerWallet", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Revoke entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Revoke entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Revoke", id.toString(), this);
    }
  }

  static load(id: string): Revoke | null {
    return changetype<Revoke | null>(store.get("Revoke", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get signer(): Bytes {
    let value = this.get("signer");
    return value!.toBytes();
  }

  set signer(value: Bytes) {
    this.set("signer", Value.fromBytes(value));
  }

  get signerWallet(): Bytes {
    let value = this.get("signerWallet");
    return value!.toBytes();
  }

  set signerWallet(value: Bytes) {
    this.set("signerWallet", Value.fromBytes(value));
  }
}

export class SetProtocolFee extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("protocolFee", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SetProtocolFee entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SetProtocolFee entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SetProtocolFee", id.toString(), this);
    }
  }

  static load(id: string): SetProtocolFee | null {
    return changetype<SetProtocolFee | null>(store.get("SetProtocolFee", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get protocolFee(): BigInt {
    let value = this.get("protocolFee");
    return value!.toBigInt();
  }

  set protocolFee(value: BigInt) {
    this.set("protocolFee", Value.fromBigInt(value));
  }
}

export class SetProtocolFeeLight extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("protocolFeeLight", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SetProtocolFeeLight entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SetProtocolFeeLight entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SetProtocolFeeLight", id.toString(), this);
    }
  }

  static load(id: string): SetProtocolFeeLight | null {
    return changetype<SetProtocolFeeLight | null>(
      store.get("SetProtocolFeeLight", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get protocolFeeLight(): BigInt {
    let value = this.get("protocolFeeLight");
    return value!.toBigInt();
  }

  set protocolFeeLight(value: BigInt) {
    this.set("protocolFeeLight", Value.fromBigInt(value));
  }
}

export class SetProtocolFeeWallet extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("feeWallet", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SetProtocolFeeWallet entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SetProtocolFeeWallet entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SetProtocolFeeWallet", id.toString(), this);
    }
  }

  static load(id: string): SetProtocolFeeWallet | null {
    return changetype<SetProtocolFeeWallet | null>(
      store.get("SetProtocolFeeWallet", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get feeWallet(): Bytes {
    let value = this.get("feeWallet");
    return value!.toBytes();
  }

  set feeWallet(value: Bytes) {
    this.set("feeWallet", Value.fromBytes(value));
  }
}

export class SetRebateMax extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("rebateMax", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SetRebateMax entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SetRebateMax entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SetRebateMax", id.toString(), this);
    }
  }

  static load(id: string): SetRebateMax | null {
    return changetype<SetRebateMax | null>(store.get("SetRebateMax", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get rebateMax(): BigInt {
    let value = this.get("rebateMax");
    return value!.toBigInt();
  }

  set rebateMax(value: BigInt) {
    this.set("rebateMax", Value.fromBigInt(value));
  }
}

export class SetRebateScale extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("rebateScale", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SetRebateScale entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SetRebateScale entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SetRebateScale", id.toString(), this);
    }
  }

  static load(id: string): SetRebateScale | null {
    return changetype<SetRebateScale | null>(store.get("SetRebateScale", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get rebateScale(): BigInt {
    let value = this.get("rebateScale");
    return value!.toBigInt();
  }

  set rebateScale(value: BigInt) {
    this.set("rebateScale", Value.fromBigInt(value));
  }
}

export class SetStaking extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("staking", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SetStaking entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SetStaking entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SetStaking", id.toString(), this);
    }
  }

  static load(id: string): SetStaking | null {
    return changetype<SetStaking | null>(store.get("SetStaking", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get staking(): Bytes {
    let value = this.get("staking");
    return value!.toBytes();
  }

  set staking(value: Bytes) {
    this.set("staking", Value.fromBytes(value));
  }
}

export class Swap extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("nonce", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("signerWallet", Value.fromBytes(Bytes.empty()));
    this.set("signerToken", Value.fromBytes(Bytes.empty()));
    this.set("signerAmount", Value.fromBigInt(BigInt.zero()));
    this.set("protocolFee", Value.fromBigInt(BigInt.zero()));
    this.set("senderWallet", Value.fromBytes(Bytes.empty()));
    this.set("senderToken", Value.fromBytes(Bytes.empty()));
    this.set("senderAmount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Swap entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Swap entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Swap", id.toString(), this);
    }
  }

  static load(id: string): Swap | null {
    return changetype<Swap | null>(store.get("Swap", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nonce(): BigInt {
    let value = this.get("nonce");
    return value!.toBigInt();
  }

  set nonce(value: BigInt) {
    this.set("nonce", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get signerWallet(): Bytes {
    let value = this.get("signerWallet");
    return value!.toBytes();
  }

  set signerWallet(value: Bytes) {
    this.set("signerWallet", Value.fromBytes(value));
  }

  get signerToken(): Bytes {
    let value = this.get("signerToken");
    return value!.toBytes();
  }

  set signerToken(value: Bytes) {
    this.set("signerToken", Value.fromBytes(value));
  }

  get signerAmount(): BigInt {
    let value = this.get("signerAmount");
    return value!.toBigInt();
  }

  set signerAmount(value: BigInt) {
    this.set("signerAmount", Value.fromBigInt(value));
  }

  get protocolFee(): BigInt {
    let value = this.get("protocolFee");
    return value!.toBigInt();
  }

  set protocolFee(value: BigInt) {
    this.set("protocolFee", Value.fromBigInt(value));
  }

  get senderWallet(): Bytes {
    let value = this.get("senderWallet");
    return value!.toBytes();
  }

  set senderWallet(value: Bytes) {
    this.set("senderWallet", Value.fromBytes(value));
  }

  get senderToken(): Bytes {
    let value = this.get("senderToken");
    return value!.toBytes();
  }

  set senderToken(value: Bytes) {
    this.set("senderToken", Value.fromBytes(value));
  }

  get senderAmount(): BigInt {
    let value = this.get("senderAmount");
    return value!.toBigInt();
  }

  set senderAmount(value: BigInt) {
    this.set("senderAmount", Value.fromBigInt(value));
  }
}

export class WrappedSwapFor extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("senderWallet", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save WrappedSwapFor entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save WrappedSwapFor entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("WrappedSwapFor", id.toString(), this);
    }
  }

  static load(id: string): WrappedSwapFor | null {
    return changetype<WrappedSwapFor | null>(store.get("WrappedSwapFor", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get senderWallet(): Bytes {
    let value = this.get("senderWallet");
    return value!.toBytes();
  }

  set senderWallet(value: Bytes) {
    this.set("senderWallet", Value.fromBytes(value));
  }
}

export class DrainTo extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("tokens", Value.fromBytesArray(new Array(0)));
    this.set("dest", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DrainTo entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save DrainTo entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("DrainTo", id.toString(), this);
    }
  }

  static load(id: string): DrainTo | null {
    return changetype<DrainTo | null>(store.get("DrainTo", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tokens(): Array<Bytes> {
    let value = this.get("tokens");
    return value!.toBytesArray();
  }

  set tokens(value: Array<Bytes>) {
    this.set("tokens", Value.fromBytesArray(value));
  }

  get dest(): Bytes {
    let value = this.get("dest");
    return value!.toBytes();
  }

  set dest(value: Bytes) {
    this.set("dest", Value.fromBytes(value));
  }
}

export class SetMax extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("max", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SetMax entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SetMax entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SetMax", id.toString(), this);
    }
  }

  static load(id: string): SetMax | null {
    return changetype<SetMax | null>(store.get("SetMax", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get max(): BigInt {
    let value = this.get("max");
    return value!.toBigInt();
  }

  set max(value: BigInt) {
    this.set("max", Value.fromBigInt(value));
  }
}

export class SetScale extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("scale", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SetScale entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SetScale entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SetScale", id.toString(), this);
    }
  }

  static load(id: string): SetScale | null {
    return changetype<SetScale | null>(store.get("SetScale", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get scale(): BigInt {
    let value = this.get("scale");
    return value!.toBigInt();
  }

  set scale(value: BigInt) {
    this.set("scale", Value.fromBigInt(value));
  }
}

export class PoolClaim extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("nonce", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("expiry", Value.fromBigInt(BigInt.zero()));
    this.set("account", Value.fromBytes(Bytes.empty()));
    this.set("token", Value.fromBytes(Bytes.empty()));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("score", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PoolClaim entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save PoolClaim entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("PoolClaim", id.toString(), this);
    }
  }

  static load(id: string): PoolClaim | null {
    return changetype<PoolClaim | null>(store.get("PoolClaim", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nonce(): BigInt {
    let value = this.get("nonce");
    return value!.toBigInt();
  }

  set nonce(value: BigInt) {
    this.set("nonce", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get expiry(): BigInt {
    let value = this.get("expiry");
    return value!.toBigInt();
  }

  set expiry(value: BigInt) {
    this.set("expiry", Value.fromBigInt(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }

  get token(): Bytes {
    let value = this.get("token");
    return value!.toBytes();
  }

  set token(value: Bytes) {
    this.set("token", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get score(): BigInt {
    let value = this.get("score");
    return value!.toBigInt();
  }

  set score(value: BigInt) {
    this.set("score", Value.fromBigInt(value));
  }
}

export class ConvertAndTransfer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("triggerAccount", Value.fromBytes(Bytes.empty()));
    this.set("swapFromToken", Value.fromBytes(Bytes.empty()));
    this.set("swapToToken", Value.fromBytes(Bytes.empty()));
    this.set("amountTokenFrom", Value.fromBigInt(BigInt.zero()));
    this.set("amountTokenTo", Value.fromBigInt(BigInt.zero()));
    this.set("recievedAddresses", Value.fromBytesArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ConvertAndTransfer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ConvertAndTransfer entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ConvertAndTransfer", id.toString(), this);
    }
  }

  static load(id: string): ConvertAndTransfer | null {
    return changetype<ConvertAndTransfer | null>(
      store.get("ConvertAndTransfer", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get triggerAccount(): Bytes {
    let value = this.get("triggerAccount");
    return value!.toBytes();
  }

  set triggerAccount(value: Bytes) {
    this.set("triggerAccount", Value.fromBytes(value));
  }

  get swapFromToken(): Bytes {
    let value = this.get("swapFromToken");
    return value!.toBytes();
  }

  set swapFromToken(value: Bytes) {
    this.set("swapFromToken", Value.fromBytes(value));
  }

  get swapToToken(): Bytes {
    let value = this.get("swapToToken");
    return value!.toBytes();
  }

  set swapToToken(value: Bytes) {
    this.set("swapToToken", Value.fromBytes(value));
  }

  get amountTokenFrom(): BigInt {
    let value = this.get("amountTokenFrom");
    return value!.toBigInt();
  }

  set amountTokenFrom(value: BigInt) {
    this.set("amountTokenFrom", Value.fromBigInt(value));
  }

  get amountTokenTo(): BigInt {
    let value = this.get("amountTokenTo");
    return value!.toBigInt();
  }

  set amountTokenTo(value: BigInt) {
    this.set("amountTokenTo", Value.fromBigInt(value));
  }

  get recievedAddresses(): Array<Bytes> {
    let value = this.get("recievedAddresses");
    return value!.toBytesArray();
  }

  set recievedAddresses(value: Array<Bytes>) {
    this.set("recievedAddresses", Value.fromBytesArray(value));
  }
}

export class PayeeAdded extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("account", Value.fromBytes(Bytes.empty()));
    this.set("shares", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PayeeAdded entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save PayeeAdded entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("PayeeAdded", id.toString(), this);
    }
  }

  static load(id: string): PayeeAdded | null {
    return changetype<PayeeAdded | null>(store.get("PayeeAdded", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }

  get shares(): BigInt {
    let value = this.get("shares");
    return value!.toBigInt();
  }

  set shares(value: BigInt) {
    this.set("shares", Value.fromBigInt(value));
  }
}

export class PayeeRemoved extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("account", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PayeeRemoved entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save PayeeRemoved entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("PayeeRemoved", id.toString(), this);
    }
  }

  static load(id: string): PayeeRemoved | null {
    return changetype<PayeeRemoved | null>(store.get("PayeeRemoved", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }
}