import {
  Authorize as AuthorizeEvent,
  Cancel as CancelEvent,
  Swap as SwapEvent
} from "../generated/SwapContract/SwapContract"
import {
  Cancel,
  Swap,
  SwapContract
} from "../generated/schema"
import { getUser, getToken } from "./EntityHelper"


export function handleAuthorize(event: AuthorizeEvent): void {
  let signer = getUser(event.params.signer.toHex())
  let signerWallet = getUser(event.params.signerWallet.toHex())

  let authorize = signer.authorizeAddress
  let currentIdx = authorize.indexOf(signerWallet.id)

   // only add if sender is not in the list
   if (currentIdx == -1) {
    authorize.push(signerWallet.id)
    signer.authorizeAddress = authorize
    signer.save()
  }
}

export function handleCancel(event: CancelEvent): void {
  let entity = new Cancel(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.nonce = event.params.nonce
  entity.signerWallet = event.params.signerWallet
  entity.save()
}



export function handleSwap(event: SwapEvent): void {
  let completedSwap = new Swap(event.params.signerWallet.toHex() + event.params.nonce.toString())

  let swapContract = SwapContract.load(event.address.toHex())
  if (!swapContract) {
    swapContract = new SwapContract(event.address.toHex())
    swapContract.save()
  }

  let signerWallet = getUser(event.params.signerWallet.toHex())
  let senderWallet = getUser(event.params.senderWallet.toHex())
  let signerToken = getToken(event.params.signerToken.toHex())
  let senderToken = getToken(event.params.senderToken.toHex())


  completedSwap.swap = swapContract.id
  completedSwap.block = event.block.number
  completedSwap.transactionHash = event.transaction.hash
  completedSwap.timestamp = event.block.timestamp
  completedSwap.from = event.transaction.from
  completedSwap.to = event.transaction.to
  completedSwap.value = event.transaction.value
  completedSwap.nonce = event.params.nonce
  completedSwap.expiry = event.params.timestamp

  completedSwap.signerWallet = signerWallet.id
  completedSwap.signerToken = signerToken.id
  completedSwap.signerAmount = event.params.signerAmount.toBigDecimal()
  completedSwap.protocolFee = event.params.protocolFee
  completedSwap.senderWallet = senderWallet.id
  completedSwap.senderToken = senderToken.id
  completedSwap.senderAmount = event.params.senderAmount.toBigDecimal()
  completedSwap.save()
}

// get pools
// get tokens
// get address
// clean up schema
