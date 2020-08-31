# UEFI Secure Boot

This section related to UEFI based Secure Boot, and should be your last stop on your security adventures. You'll first want to complete the following sections:

* [**FileVault**](./filevault)(Optional)
* [**Vault**](./vault)
* [**ScanPolicy**](./scanpolicy)(Optional however highly recommended)
* [**Apple Secure Boot**](./applesecureboot)
* [**Bootstrap**](../../multiboot/bootstrap.md)

Once you've completed these sections, you can finally start here.

## config.plist look over

Just some helpful reminders on what settings we recommend:


### Booter

#### Quirks

* **ProtectSecureBoot**: `YES`
  * Mainly recommended for MacPro5,1 systems or firmwares based off Insyde due to defragmentation.

### Kernel

#### Force

* Ensure you do not require any drivers under `Force` for booting, this is due to the secure boot variant of the macOS kernel not always having the same drivers present

### Misc

#### Security

* **ApECID**: Non-zero value
  * This is optional, `0` can be used as well if you wish

* **BootProtect**: `Bootstrap`
  * Ensures Windows or other boot-loaders do not overwrite BOOTx64.efi. See here for more info: [Using Bootstrap.efi](../../multiboot/bootstrap.md)

* **DmgLoading**: `Disabled` or `Signed`
  * `Any` will fail to boot with Apple Secure Boot enabled
  
* **SecureBootModel**: `Default` or any non-Disabled value
  * Required if you plan to boot macOS with UEFI Secure Boot enabled

### UEFI

#### APFS

* **MinDate**: `0`
  * Ensures only valid copies of apfs.efi are loaded

* **MinVersion**: `0`
  * Ensures only valid copies of apfs.efi are loaded 

## Signing

TBA

* Sign all OpenCore binaries
  * OpenCore.efi
  * Bootstrap.efi
  * BOOTx64.efi
  * OpenRuntime.efi
* Sign all other tools and drivers
  * HfsPlus.efi
* Sign 3rd party boot loaders that are not Apple or Windows
  * ie. Linux

## Adding keys

TBA
