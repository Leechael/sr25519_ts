import {describe, test, expect, beforeAll} from "vitest"

import {hexToU8a} from '@polkadot/util'
import * as utilCrypto from '@polkadot/util-crypto'

import {Keypair} from '../src/keypair'
import {sr25519Agree} from '../src/agreement'

describe('key agreement', async () => {
  beforeAll(async () => {
    await utilCrypto.cryptoWaitReady()
  })

  const self_seed = hexToU8a("98b3d305d5a5eace562387e47e59badd4d77e3f72cabfb10a60f8a197059f0a8")
  const other_seed = hexToU8a("9732eea001851ff862d949a1699c9971f3a26edbede2ad7922cbbe9a0701f366")
  const expected = hexToU8a("b03a0b198c34c16f35cae933d88b16341b4cef3e84e851f20e664c6a30527f4e")
  const self_pair = Keypair.FromMiniSecret(self_seed).ToBytes()
  const self_sk = self_pair.slice(0, 32)
  const self_pk = self_pair.slice(32, 64)
  const other_pair = Keypair.FromMiniSecret(other_seed).ToBytes()
  const other_sk = other_pair.slice(0, 32)
  const other_pk = other_pair.slice(32, 64)

  test('sr25519Agree will returns the same result as ext_sr_agree', () => {
    expect(sr25519Agree(self_pk, other_sk)).toEqual(expected)
    expect(sr25519Agree(other_pk, self_sk)).toEqual(expected)
  })
})
