# Using Bootstrap.efi

With OpenCore 0.5.8 and newer, the EFI/OC/Bootstrap folder contains Bootstrap.efi. This allows adding OpenCore to our motherboard's boot menu and prevent issues where either Windows or Linux try to overwrite the BOOTx64.efi file which can happen when installing or updating Windows and breaks OpenCore's ability to boot.

## Prerequisites

* [OpenCore 0.5.8 or newer](https://github.com/acidanthera/OpenCorePkg/releases)
  * Verify you have EFI/OC/Bootstrap/Bootstrap.efi
* config.plist settings:
  * Misc -> Security -> BootProtect -> Bootstrap
  * UEFI -> Quirks -> RequestBootVarRouting -> True
* [OpenShell](https://github.com/acidanthera/OpenCorePkg/releases)
  * Bundled with OpenCore
  * Remember to add this to both EFI/OC/Tools and config.plist -> Misc -> Tools
  * This is mainly for troubleshooting
  
## Booting

During the first boot after the prerequisites have been met, it will create a new boot option in our BIOS(Boot9696) and future boots will update the entry making sure it's correct. This now allows us to either remove BOOTx64.efi or not worry about it when other OSes overwrite this file.

You are now successfully using Bootstrap.

## Troubleshooting

If no new boot option is created, you can follow these troubleshooting steps but first double-check the prerequisites were met. The following sections are a mini-guide in case BootProtect doesn't work or you'd like to do it manually.

* [Verify Bootstrap entry was applied](#verify-bootstrap-entry-was-applied)
* [Removing Bootstrap entry from BIOS](#removing-bootstrap-entry-from-bios)

### Verify Bootstrap entry was applied

For those wanting to verify that the entry was applied in OpenCore, enable logging(see [OpenCore Debugging](https://dortania.github.io/OpenCore-Install-Guide/troubleshooting/debug.html)) and check for entries similar to these:

```
OCB: Have existing option 1, valid 1
OCB: Boot order has first option as the default option
```

### Removing Bootstrap entry from BIOS

Because the Bootstrap entry is a protected entry when resetting NVRAM, you'll need the following settings in your config.plist:

* Misc -> Security -> AllowNvramReset -> true
* Misc -> Security -> BootProtect -> None

Once these are set, you can reboot into the OpenCore picker and select the `Reset NVRAM` entry.
