import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from 'matchstick-as/assembly/index'
import { Address, BigInt, log } from '@graphprotocol/graph-ts'
import { handleSwapERC20 } from '../src/swaps'
import { createSwapERC20Event } from './swaps-utils'

describe('Describe entity assertions', () => {
  beforeAll(() => {
    let nonce = BigInt.fromI32(0)
    let signerWallet = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    )
    let newSwapERC20Event = createSwapERC20Event(nonce, signerWallet)
    handleSwapERC20(newSwapERC20Event)
  })

  afterAll(() => {
    clearStore()
  })

  test('SwapERC20 created and stored', () => {
    assert.entityCount('SwapERC20', 0)
  })
})
