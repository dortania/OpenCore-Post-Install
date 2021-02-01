# Using LauncherOption

* Note: With OpenCore 0.6.6, Bootstrap.efi has been replaced with LauncherOption. See here for more info on updating: [Updating BootStrap in 0.6.6](#updating-bootstrap-in-0-6-6)

With OpenCore 0.6.6 and newer, were are now able to launch OpenCore directly from our firmwares without BOOTx64.efi. This allows us to add OpenCore to our motherboard's boot menu and prevent issues where either Windows or Linux try to overwrite the BOOTx64.efi file which can happen when installing or updating Windows and breaks OpenCore's ability to boot.

## Prerequisites

![](../images/bootstrap-md/config.png)

* [OpenCore 0.6.6 or newer](https://github.com/acidanthera/OpenCorePkg/releases)
  * For 0.6.5 and older users upgrading, see here: [Updating BootStrap in 0.6.6](#updating-bootstrap-in-0-6-6)
* config.plist settings:
  * `Misc -> Boot -> LauncherOption -> Full`
    * Use `Short` for Insyde based firmwares, commonly found on laptops
  * UEFI -> Quirks -> RequestBootVarRouting -> True
* [OpenShell](https://github.com/acidanthera/OpenCorePkg/releases)
  * Bundled with OpenCore
  * Remember to add this to both EFI/OC/Tools and config.plist -> Misc -> Tools
  * This is mainly for troubleshooting

## Booting

During the first boot after the prerequisites have been met, it will create a new boot option in our BIOS(Boot9696) and future boots will update the entry making sure it's correct. This now allows us to either remove BOOTx64.efi or not worry about it when other OSes overwrite this file.

You are now successfully using LauncherOption.

## Troubleshooting

If no new boot option is created, you can follow these troubleshooting steps but first double-check the prerequisites were met. The following sections are a mini-guide in case LauncherOption doesn't work or you'd like to do it manually.

* [Verify LauncherOption entry was applied](#verify-launcheroption-entry-was-applied)
* [Removing LauncherOption entry from BIOS](#removing-launcheroption-entry-from-bios)

### Verify LauncherOption entry was applied

For those wanting to verify that the entry was applied in OpenCore, enable logging(see [OpenCore Debugging](https://dortania.github.io/OpenCore-Install-Guide/troubleshooting/debug.html)) and check for entries similar to these:

```
OCB: Have existing option 1, valid 1
OCB: Boot order has first option as the default option
```

### Removing LauncherOption entry from BIOS

Because the LauncherOption entry is a protected entry when resetting NVRAM, you'll need the following settings in your config.plist:

* `Misc -> Security -> AllowNvramReset -> True`
* `Misc -> Boot -> LauncherOption -> Disabled`

Once these are set, you can reboot into the OpenCore picker and select the `Reset NVRAM` entry.


## Updating BootStrap in 0.6.6

For those updating to 0.6.6, you may have noticed Bootstrap.efi has been removed from OpenCore. This is due to changes with how OpenCore works; specifically OpenCore is now a UEFI application instead of a driver. This means OpenCore.efi can be loaded directly and the reliance on Bootstrap.efi is no longer needed.

To update, simply update everything else in your OpenCore setup and ensure EFI/BOOT/BOOTx64.efi is still present. Then set `Misc -> Boot -> LauncherOption` to `Full` and reboot. First boot your firmware will need to use BOOTx64.efi, however after this OpenCore will set OpenCore.efi into your firmware boot options. For more information, see the [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf)

Conversion notes:

| 0.5.8 - 0.6.5 | 0.6.6+ | 
| :--- | :--- |
| Misc -> Security -> BootProtect | Misc -> Boot -> LauncherOption |
| Bootstrap | Full |
| BootstrapShort | Short |
