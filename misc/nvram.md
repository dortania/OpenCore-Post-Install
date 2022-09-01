# Emulated NVRAM

::: danger

This is not up to date for OpenCore 0.8.3!

:::

So this section is for those who don't have native NVRAM, the most common hardware to have incompatible native NVRAM with macOS are X99 and some X299 series chipsets:

* X99
* X299

For B360, B365, H310, H370, and Z390 users, make sure you have [SSDT-PMC](https://dortania.github.io/Getting-Started-With-ACPI/) both under EFI/OC/ACPI and config.plist -> ACPI -> Add. For more info on making and compiling SSDTs, please see [**Getting started with ACPI**](https://dortania.github.io/Getting-Started-With-ACPI/)

## Cleaning out the Clover gunk

So some may not have noticed but Clover may have installed RC scripts into macOS for proper NVRAM emulation. This is an issue as it conflicts with OpenCore's method of emulation.

Files to delete:

* `/Volumes/EFI/EFI/CLOVER/drivers64UEFI/EmuVariableUefi-64.efi`
* `/Volumes/EFI/nvram.plist`
* `/etc/rc.clover.lib`
* `/etc/rc.boot.d/10.save_and_rotate_boot_log.local`
* `/etc/rc.boot.d/20.mount_ESP.local`
* `/etc/rc.boot.d/70.disable_sleep_proxy_client.local.disabled`
* `/etc/rc.shutdown.d/80.save_nvram_plist.local​`

If folders are empty then delete them as well:

* `/etc/rc.boot.d`
* `/etc/rc.shutdown.d​`

## Verifying if you have working NVRAM

To start, open the terminal and run the following command, which sets a variable named `test` in your NVRAM to the current date and time:

```sh
sudo nvram myvar="$(date)"
```

Now reboot and run this:

```sh
nvram myvar
```

If nothing returns then your NVRAM is not working. If a line containing `myvar` and then the current date, your NVRAM is working.

## Emulating NVRAM (with a `nvram.plist`)

If you don't have native NVRAM, don't fret. We can set up emulated NVRAM by using a script to save the NVRAM contents to a plist during the shutdown process, which will then be loaded by OpenCore at the next startup.

To enable emulated NVRAM, you'll need the following set:

Within your config.plist:

* **Booter -> Quirks**:
  * `DisableVariableWrite`: set to `NO`
* **Misc -> Security**:
  * `ExposeSensitiveData`: set to at least `0x1`
* **NVRAM**:
  * `LegacyOverwrite` set to `YES`
  * `LegacySchema`: NVRAM variables set (OpenCore compares these to the variables present in `nvram.plist`)
  * `WriteFlash`: set to `YES`

And within your EFI:

* `OpenVariableRuntimeDxe.efi` driver (with `LoadEarly` set to `YES`, and placed _before_ OpenRuntime)
* `OpenRuntime.efi` driver (with `LoadEarly` set to `YES`) (this is needed for proper sleep, shutdown and other services to work correctly)

Make sure to snapshot after to make sure the drivers are listed in your config.plist. Afterwards, make sure that both `OpenVariableRuntimeDxe.efi` and `OpenRuntime.efi` have `LoadEarly` set to `YES`, and that `OpenVariableRuntimeDxe.efi` is placed _before_ `OpenRuntime.efi` in your config .

Now grab the [LogoutHook folder](https://github.com/acidanthera/OpenCorePkg/releases) (inside `Utilities`) and place it somewhere safe (e.g. within your user directory, as shown below):

`/Users/$(whoami)/LogoutHook/`

Open up terminal and run the following (one at a time):

```bash
cd /Users/$(whoami)/LogoutHook/
./Launchd.command install 
```

And voila! You have emulated NVRAM!
