import {PublicKey, SecretKey} from "./signingContext"
import {Scalar, ScalarMul} from './scalar'

export function sr25519Agree(pubkey: Uint8Array, secret: Uint8Array): Uint8Array {
  const secretKey = SecretKey.FromMiniSecret(secret)
  const n = secretKey.ToPublicKey().ToBytes()
  const k = PublicKey.FromBytes(pubkey).ToRistrettoPoint()
  return new Uint8Array()
}
