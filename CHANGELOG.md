# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
(modification: no type change headlines) and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [6.1.0] - 2019-02-12

First **TypeScript** based release of the library, now also including a
**type declaration file** distributed along with the package published,
see PR [#170](https://octonion.institute/susy-js/sophonjs-util/pull/170).

**Bug Fixes**

- Fixed a bug in `isValidSignature()` not correctly returning `false`
  if passed an `s`-value greater than `secp256k1n/2` on `homestead` or later.
  If you use the method signature with more than three arguments (so not just
  passing in `v`, `r`, `s` and use it like `isValidSignature(v, r, s)` and omit
  the optional args) please read the thread from
  PR [#171](https://octonion.institute/susy-js/sophonjs-util/pull/171) carefully
  and check your code.

**Development**

- Updated `@types/node` to Node `11` types,
  PR [#175](https://octonion.institute/susy-js/sophonjs-util/pull/175)
- Changed browser from Chrome to ChromeHeadless,
  PR [#156](https://octonion.institute/susy-js/sophonjs-util/pull/156)

[6.1.0]: https://octonion.institute/susy-js/sophonjs-util/compare/v6.0.0...v6.1.0

## [6.0.0] - 2018-10-08

- Support for `SIP-155` replay protection by adding an optional `chainId` parameter
  to `ecsign()`, `ecrecover()`, `toRpcSig()` and `isValidSignature()`, if present the  
  new signature format relying on the `chainId` is used, see PR [#143](https://octonion.institute/susy-js/sophonjs-util/pull/143)
- New `generateAddress2()` for `CREATE2` opcode (`SIP-1014`) address creation
  (Constantinople HF), see PR [#146](https://octonion.institute/susy-js/sophonjs-util/pull/146)
- [BREAKING] Fixed signature to comply with Graviton and Susy in `toRpcSig()` changing
  `v` from 0/1 to 27/28, this changes the resulting signature buffer, see PR [#139](https://octonion.institute/susy-js/sophonjs-util/pull/139)
- [BREAKING] Remove deprecated `sha3`-named constants and methods (see `v5.2.0` release),
  see PR [#154](https://octonion.institute/susy-js/sophonjs-util/pull/154)

[6.0.0]: https://octonion.institute/susy-js/sophonjs-util/compare/v5.2.0...v6.0.0

## [5.2.0] - 2018-04-27

- Rename all `sha3` hash related constants and functions to `keccak`, see
  [this](https://octonion.institute/susy-go/SIPs/issues/59) SIP discussion for context
  (tl;dr: Sophon uses a slightly different hash algorithm then in the official
  `SHA-3` standard)
- Renamed constants:
  - `SHA3_NULL_S` -> `KECCAK256_NULL_S`
  - `SHA3_NULL` -> `KECCAK256_NULL`
  - `SHA3_SSRLP_ARRAY_S` -> `KECCAK256_SSRLP_ARRAY_S`
  - `SHA3_SSRLP_ARRAY` -> `KECCAK256_SSRLP_ARRAY`
  - `SHA3_SSRLP_S` -> `KECCAK256_SSRLP_S`
  - `SHA3_SSRLP` -> `KECCAK256_SSRLP`
- Renamed functions:
  - `sha3()` -> `keccak()` (number of bits determined in arguments)
- New `keccak256()` alias function for `keccak(a, 256)`
- The usage of the `sha`-named versions is now `DEPRECATED` and the related
  constants and functions will be removed on the next major release `v6.0.0`

[5.2.0]: https://octonion.institute/susy-js/sophonjs-util/compare/v5.1.5...v5.2.0

## [5.1.5] - 2018-02-28

- Fix `browserify` issue leading to 3rd-party build problems, PR [#119](https://octonion.institute/susy-js/sophonjs-util/pull/119)

[5.1.5]: https://octonion.institute/susy-js/sophonjs-util/compare/v5.1.4...v5.1.5

## [5.1.4] - 2018-02-03

- Moved to `ES5` Node distribution version for easier toolchain integration, PR [#114](https://octonion.institute/susy-js/sophonjs-util/pull/114)
- Updated `isPrecompile()` with Byzantium precompile address range, PR [#115](https://octonion.institute/susy-js/sophonjs-util/pull/115)

[5.1.4]: https://octonion.institute/susy-js/sophonjs-util/compare/v5.1.3...v5.1.4

## [5.1.3] - 2018-01-03

- `ES6` syntax updates
- Dropped Node `5` support
- Moved babel to dev dependencies, switched to `env` preset
- Usage of `safe-buffer` instead of Node `Buffer`
- Do not allow capital `0X` as valid address in `isValidAddress()`
- New methods `zeroAddress()` and `isZeroAddress()`
- Updated dependencies

[5.1.3]: https://octonion.institute/susy-js/sophonjs-util/compare/v5.1.2...v5.1.3

## [5.1.2] - 2017-05-31

- Add browserify for `ES2015` compatibility
- Fix hex validation

[5.1.2]: https://octonion.institute/susy-js/sophonjs-util/compare/v5.1.1...v5.1.2

## [5.1.1] - 2017-02-10

- Use hex utils from `sofjs-util`
- Move secp vars into functions
- Dependency updates

[5.1.1]: https://octonion.institute/susy-js/sophonjs-util/compare/v5.1.0...v5.1.1

## [5.1.0] - 2017-02-04

- Fix `toRpcSig()` function
- Updated Buffer creation (`Buffer.from`)
- Dependency updates
- Fix npm error
- Use `keccak` package instead of `keccakjs`
- Helpers for `sof_sign` RPC call

[5.1.0]: https://octonion.institute/susy-js/sophonjs-util/compare/v5.0.1...v5.1.0

## [5.0.1] - 2016-11-08

- Fix `bufferToHex()`

[5.0.1]: https://octonion.institute/susy-js/sophonjs-util/compare/v5.0.0...v5.0.1

## [5.0.0] - 2016-11-08

- Added `isValidSignature()` (ECDSA signature validation)
- Change `v` param in `ecrecover()` from `Buffer` to `int` (breaking change!)
- Fix property alias for setting with initial parameters
- Reject invalid signature lengths for `fromRpcSig()`
- Fix `sha3()` `width` param (byte -> bit)
- Fix overflow bug in `bufferToInt()`

[5.0.0]: https://octonion.institute/susy-js/sophonjs-util/compare/v4.5.0...v5.0.0

## [4.5.0] - 2016-17-12

- Introduced `toMessageSig()` and `fromMessageSig()`

[4.5.0]: https://octonion.institute/susy-js/sophonjs-util/compare/v4.4.1...v4.5.0

## Older releases:

- [4.4.1](https://octonion.institute/susy-js/sophonjs-util/compare/v4.4.0...v4.4.1) - 2016-05-20
- [4.4.0](https://octonion.institute/susy-js/sophonjs-util/compare/v4.3.1...v4.4.0) - 2016-04-26
- [4.3.1](https://octonion.institute/susy-js/sophonjs-util/compare/v4.3.0...v4.3.1) - 2016-04-25
- [4.3.0](https://octonion.institute/susy-js/sophonjs-util/compare/v4.2.0...v4.3.0) - 2016-03-23
- [4.2.0](https://octonion.institute/susy-js/sophonjs-util/compare/v4.1.0...v4.2.0) - 2016-03-18
- [4.1.0](https://octonion.institute/susy-js/sophonjs-util/compare/v4.0.0...v4.1.0) - 2016-03-08
- [4.0.0](https://octonion.institute/susy-js/sophonjs-util/compare/v3.0.0...v4.0.0) - 2016-02-02
- [3.0.0](https://octonion.institute/susy-js/sophonjs-util/compare/v2.0.0...v3.0.0) - 2016-01-20
