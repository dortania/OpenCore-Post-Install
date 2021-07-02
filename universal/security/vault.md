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

If you're doing heavy troubleshooting of need to disable Vault, the main things to change:

* Grab a new copy of OpenCore.efi
* `Misc -> Security -> Vault` set to Optional
* Remove `vault.plist` and `vault.sig`
