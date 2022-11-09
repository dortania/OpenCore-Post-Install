# Vault

**What is vaulting?**

Well vaulting is based around 2 things, vault.plist and vault.sig:

* vault.plist: a "snapshot" of your EFI
* vault.sig: validation of vault.plist

This can be seen as secure boot for OpenCore, so no one can modify it and get in without your permission.

The specifics of vaulting is that a 256 byte RSA-2048 signature of vault.plist will be shoved into our OpenCore.efi. This key can either be shoved into [OpenCoreVault.c](https://github.com/acidanthera/OpenCorePkg/blob/master/Platform/OpenCore/OpenCoreVault.c) before compiling or with `sign.command` if you already have OpenCore.efi compiled.

Do note that nvram.plist won't be vaulted so users with emulated NVRAM still have risk of someone adding/removing certain NVRAM variables

**Settings in your config.plist**:

* `Misc -> Security -> Vault`:
  * `Basic`: Requires just vault.plist to be present, mainly used for filesystem integrity verification
  * `Secure`: Requires both vault.plist and vault.sig, used for best security as vault.plist changes require a new signature
* `Booter -> ProtectSecureBoot:` `YES`
  * Needed with Insyde firmwares for fixing secure boot keys and reporting violations

**Setting up vault**:

Grab OpenCorePkg and open the `CreateVault` folder, inside we'll find the following:

* `create_vault.sh`
* `RsaTool`
* `sign.command`

The last one is what we care about: `sign.command`

So when we run this command, it'll look for the EFI folder located beside our Utilities folder, so we want to bring either our personal EFI into the OpenCorePkg folder or bring Utilities into our EFI folder:

![](../../images/post-install/security-md/sign.png)

Now we're ready to run `sign.command`:

![](../../images/post-install/security-md/sign-demo.png)

**Disabling Vault after setup**:

If you're doing heavy troubleshooting or have the need to disable Vault, the main things to change:

* Grab a new copy of OpenCore.efi
* `Misc -> Security -> Vault` set to Optional
* Remove `vault.plist` and `vault.sig`

**OpenCore Vault + UEFI Secure Boot**

Notes:

- These instructions can be read in the OpenCore configuration PDF (section 12.2 UEFFI Secure Boot), here they are explained in more detail.
- For UEFI Secure Boot and macOS read this [post](https://github.com/dortania/OpenCore-Post-Install/blob/c0e7f282975f7d6224878b71648c27ce0ed304e6/universal/security/uefisecureboot.md).

To have OpenCore vault and UEFI Secure Boot at the same time, it is necessary to follow an order when digitally signing drivers, tools and OpenCore.efi. If the user signs the files with the keys shoved in the firmware and then applies vault, the computer does not boot. It doesn't matter which of the 2 systems is applied first, after doing digital signature and vault (or in reverse order) OpenCore doesn't boot with a warning of OpenCore.efi corruption.

The key is in the order the files are signed, both with UEFI firmware personal keys and hashes created from vault.

This requires moving from macOS to Windows and viceversa a few times. In order not to have to switch from macOS to Windows so many times, you can install an Ubuntu virtual machine on macOS or build an Ubuntu boot USB memory stick.

The steps are:

1. On Ubuntu >> Sign all the installed drivers and tools with the private key. Do not sign tools that provide administrative access to the computer, such as UEFI Shell. Do not sign OpenCore.efi.
3. On macOS >> Add the signed files into the EFI folder and vault it.
4. On Ubuntu >> Sign the OpenCore.efi file which already has Vault applied.
5. Back in macOS >> Copy the EFI folder into the EFI partition.
6. Reboot >> Enable UEFI Secure Boot.

If everything has gone well, we see the OpenCore picker screen and we can boot macOS with vault and UEFI Secure Boot both applied.
