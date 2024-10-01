import { newMockEvent } from 'matchstick-as'
import { ethereum, Address, BigInt } from '@graphprotocol/graph-ts'
import { SwapERC20 } from '../generated/SwapERC20Contract/SwapERC20Contract'

export function createSwapERC20Event(
  nonce: BigInt,
  signerWallet: Address
): SwapERC20 {
  let swapErc20Event = changetype<SwapERC20>(newMockEvent())

  swapErc20Event.parameters = new Array()

  swapErc20Event.parameters.push(
    new ethereum.EventParam('nonce', ethereum.Value.fromUnsignedBigInt(nonce))
  )
  swapErc20Event.parameters.push(
    new ethereum.EventParam(
      'signerWallet',
      ethereum.Value.fromAddress(signerWallet)
    )
  )

  return swapErc20Event
}
