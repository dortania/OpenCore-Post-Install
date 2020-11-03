# FileVault

FileVault is macOS's builtin drive encryption, and with OpenCore support for it has been drastically improved compared to the legacy Clover drivers.

To start, you'll need the following .efi drivers:

* OpenRuntime.efi
  * [OpenUsbKbDxe.efi](https://github.com/acidanthera/OpenCorePkg/releases) for DuetPkg users(systems without UEFI support)

**Do not use VirtualSMC.efi with OpenCore, its already baked inside**. You do however require VirtualSMC.kext still

Setting in your config.plist:

* Misc -> Boot
  * `PollAppleHotKeys` set to YES(While not needed can be helpful)
* Misc -> Security
  * `AuthRestart` set to YES(Enables Authenticated restart for FileVault 2 so password is not required on reboot. Can be considered a security risk so optional)
* NVRAM -> Add -> 4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14
  * `UIScale` set to `02` for high resolution small displays
* UEFI -> Input
  * `KeySupport` set to YES(Only when using OpenCore's builtin input, users of OpenUsbKbDxe should avoid)
* UEFI -> Output
  * `ProvideConsoleGop` to YES
* UEFI -> ProtocolOverrides
  * `FirmwareVolume` set to YES
  * `HashServices` set to YES for Broadwell and older(this includes X99), this is needed for systems with broken SHA-1 hashing
* UEFI -> Quirks
  * `RequestBootVarRouting` set to YES
  * `ExitBootServicesDelay` set to `3000`-`5000` if you receive `Still waiting for root device` on Aptio IV firmwares(Broadwell and older)

With all this, you can proceed to enable FileVault like on a normal mac under `System Preferences -> Security & Privacy -> FileVault`

For UI issues, see [Fixing Resolution and Verbose](../../cosmetic/verbose.md)
