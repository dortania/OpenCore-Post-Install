# Windows

## Troubleshooting

* [Windows installer creating EFI partion even if one already created by mac os](#windows-installer-creating-EFI-partion-even-if-one-already-created-by-mac-os)
* [Windows installer error: `No device drivers were found`](#windows-installer-error-no-device-drivers-were-found)
* [Booting Windows results in BlueScreen or Linux crashes](#booting-windows-results-in-bluescreen-or-Linux-crashes)
* [Booting Windows error: `OCB: StartImage failed - Already started`](#booting-windows-error-ocb-startimage-failed---already-started)

### Windows installer creating EFI partion even if one already created by mac os

This is probably due to a problem with gpt table created by mac. If you are installing from scratch then you may want to create your own FAT32 EFI partion. It must be 200MiB to support osx. You can create it for example with [gparted live usb](https://gparted.org/download.php). Also don't forget to set `esp` and `boot` flags for this partion.

### Windows installer error: `No device drivers were found`

This is probably due to usb3.0, try to use usb2.0 port. You also can download and provide usb3.0 drivers for Windows from your motherboard manufacturers.

### Booting Windows results in BlueScreen or Linux crashes

This is due to alignment issues, make sure `SyncRuntimePermissions` is enabled on firmwares supporting MATs. Check your logs whether your firmware supports Memory Attribute Tables(generally seen on 2018 firmwares and newer)

For Z390 and newer motherboards, you'll also want to enable `ProtectUefiServices` to ensure OpenCore's patches are applying correctly.

If your firmware is quite old(generally 2013 and older), you'll want to enable `ProtectMemoryRegions`.

Due to the variations of firmwares from vendor to vendor, you'll need to play around with the combination of these 3 quirks and see which works best.

Common Windows error code:

* `0xc000000d`

### Booting Windows error: `OCB: StartImage failed - Already started`

This is due to OpenCore getting confused when trying to boot Windows and accidentally thinking it's booting OpenCore. This can be avoided by either move Windows to it's own drive *or* adding a custom drive path under BlessOverride. See [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf) and [Can't find Windows/BootCamp drive in picker](#cant-find-windowsbootcamp-drive-in-picker) entry for more details.
