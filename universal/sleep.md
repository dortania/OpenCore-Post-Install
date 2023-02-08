# Fixing Sleep

So to understand how to fix sleep issues in macOS, we need to first look at what contributes to sleep issues most of the time:

* Incorrectly managed devices(most commonly PCIe based devices)

The reason for this is when devices get an S3 call(or S0 for wake), the driver needs to power down the devices and put into a low state mode(vice versa when waking). Problems arise when such devices don't cooperate with the drivers and the main offenders of these issues are:

* USB Controllers and Devices
* GPUs
* Thunderbolt Controllers and Devices
* NICs(Both Ethernet and Wifi)
* NVMe Drives

And there are others that can cause sleep issues that aren't directly(or obviously) related to PCI/e:

* CPU Power Management
* Displays
* NVRAM
* RTC/System Clocks
* IRQ Conflicts
* Audio
* SMBus
* TSC

And something many people forget are over and under-clocks:

* CPUs
  * AVX often breaks iGPUs and hurt overall stability
* Bad RAM(Both overclocks and mismatched RAM)
  * Even bad/mismatched timings can cause serious issues
* Factory GPU Overclocks
  * OEMs commonly push a card a bit too far with their custom VBIOS
  * Generally these cards will have a physical switch, allowing you to choose a low power VBIOS

## Preparations

**In macOS**:

Before we get in too deep, we want first get our system ready:

```
sudo pmset autopoweroff 0
sudo pmset powernap 0
sudo pmset proximitywake 0
sudo pmset sleep 0
sudo pmset standby 0
sudo pmset tcpkeepalive 0
```

This will do 6 things for us:

1. Disables autopoweroff: This is a form of hibernation.
2. Disables powernap: Used to periodically wake the machine for network, and updates(but not the display).
3. Disables wake from iPhone/Watch: Specifically when your iPhone or Apple Watch come near, the machine will wake.
4. Disables macOS from sleeping automatically when the display is off. **This might fix sleep in some devices**.
5. Disables standby: Used as a time period between sleep and going into hibernation
6. Disables TCP Keep Alive mechanism to prevent wake ups every 2 hours

**In your config.plist**:

While minimal changes are needed, here are the ones we care about:

* `Misc -> Boot -> HibernateMode -> None`
  * We're gonna avoid the black magic that is S4 for this guide
* `NVRAM -> Add -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> boot-args`
  * `keepsyms=1` - Makes sure that if a kernel panic does happen during sleep, that we get all the important bits from it
  * `swd_panic=1` - Avoids issue where going to sleep results in a reboot, this should instead give us a kernel panic log

**In your BIOS**:

* Disable:
  * Wake on LAN
  * Trusted Platform Module
    * Note that if you're using BitLocker in Windows, disabling this will result in all your encryption keys being lost. If you're using BitLocker, either disable or note that it may be a cause for wake issues.
  * Wake on USB(Certain boards may actually require this on to wake, but most will get random wakeup calls with it)
* Enable:
  * Wake on Bluetooth(If using a Bluetooth device for waking like a keyboard, otherwise you can disable)
  
## Main culprits

* [USB](#fixing-usb)
* [GPUs](#fixing-gpus)
* [Thunderbolt](#fixing-thunderbolt)
* [NICs](#fixing-nics)
* [NVMe](#fixing-nvme)
* [CPU Power Management](#fixing-cpu-power-management)

### Fixing USB

This is the #1 cause of sleep issues on hacks, mainly because Apple's drivers are quite bad at guessing ports and the port limit patches have the ill-effect of creating instability.

* [USB Mapping](../usb/README.md)

This guide also includes some other fixes than just mapping:

* [Fixing USB Power](../usb/misc/power.md)
* [Fixing Shutdown/Restart](../usb/misc/shutdown.md)
* [GPRW/UPRW/LANC Instant Wake Patch](../usb/misc/instant-wake.md)
* [Keyboard Wake Issues](../usb/misc/keyboard.md)

**USB maps with macOS Catalina(10.15) and newer**: You may find that even with USB mapping, your sleep breaks. one possible solution is renaming the IOClass value from `AppleUSBMergeNub` to `AppleUSBHostMergeProperties`. See here for more info: [Changes in Catalina's USB IOClass](https://github.com/dortania/bugtracker/issues/15)

* Note: Some USB devices that do not have proper drivers in macOS can unfortunately result in sleep issues. For example, Corsair water coolers with USB addressable control can prevent the machine from sleeping correctly. For these situations, we recommend users disconnect these troublesome devices when debugging sleep issues.

### Fixing GPUs

With GPUs, it's fairly easy to know what might be causing issues. This being unsupported GPUs in macOS. By default, any GPU that doesn't have drivers already provided in the OS will run off very basic drivers known as VESA drivers. These provide minimal display output but also cause a big issue in that macOS doesn't actually know how to properly interact with these devices. To fix this, well need to either trick macOS into thinking it's a generic PCIe device(which it can better handle, ideal for desktops) or completely power off the card(on laptops, desktop dGPUs have issues powering down)

* See here for more info:
  * [Disabling desktop dGPUs](https://dortania.github.io/Getting-Started-With-ACPI/Desktops/desktop-disable)
  * [Disabling laptop dGPUs](https://dortania.github.io/Getting-Started-With-ACPI/Laptops/laptop-disable)

Special notes for iGPU users on 10.15.4 and newer:

* iGPU wake is partially broken due to numerous hacks apple uses in AppleGraphicsPowerManagement.kext with real Macs, to get around this you'll likely need `igfxonln=1` to force all displays online. Obviously test first to make sure you have this issue.
* AAPL,ig-platform-id `07009B3E` may fail for desktop Coffee Lake (UHD 630) users, you can try `00009B3E` instead. `0300923E` is also known to work sometimes.

Other iGPU notes:

* Some systems with iGPUs (e.g. Kaby Lake and Coffee Lake) may cause system instability in lower power states, and can sometimes manifest as NVMe kernel panics. To resolve, you can add `forceRenderStandby=0` to your boot-args to disable RC6 Render Standby. See here for more info: [IGP causes NVMe Kernel Panic CSTS=0xffffffff #1193](https://github.com/acidanthera/bugtracker/issues/1193)
* Certain Ice Lake laptops may also kernel panic on `Cannot allow DC9 without disallowing DC6` due to issues with transitioning states. A work around for this is using either `-noDC9` or `-nodisplaysleepDC6` in your boot-args

Special note for 4k Displays with AMD dGPUs:

* Some displays may fail to wake randomly, mainly caused by AGDC preferences. To fix, apply this to your dGPU in DeviceProperties:
  * `CFG,CFG_USE_AGDC | Data | 00`
  * You can find the PciRoot of your GPU with [gfxutil](https://github.com/acidanthera/gfxutil/releases)
    * `/path/to/gfxutil -f GFX0`

![](../images/post-install/sleep-md/agdc.png)

### Fixing Thunderbolt

Thunderbolt is a very tricky topic in the community, mainly due to the complexity of the situation. You really have just 2 paths to go down if you want Thunderbolt and sleep to work simultaneously:

* Disable Thunderbolt 3 in the BIOS
* Attempt to patch Thunderbolt 3:
  * [Thunderbolt 3 Fix](https://osy.gitbook.io/hac-mini-guide/details/thunderbolt-3-fix/)
  * [ThunderboltReset](https://github.com/osy86/ThunderboltReset)
  * [ThunderboltPkg](https://github.com/al3xtjames/ThunderboltPkg/blob/master/Docs/FAQ.md)

Note: Thunderbolt can be enabled without extra work *if* you're ok without sleep, and vice versa.

### Fixing NICs

NICs(network Interface Controllers) are fairly easy to fix with sleep, it's mainly the following:

* Disable `WakeOnLAN` in the BIOS
  * Most systems will enter a sleep/wake loop with this enabled
* Disable `Wake for network access` in macOS(SystemPreferences -> Power)
  * Seems to break on a lot of hacks
  
### Fixing NVMe

So macOS can be quite picky when it comes to NVMe drives, and there's also the issue that Apple's power management drivers are limited to Apple branded drives only. So the main things to do are:

* Make sure the NVMe is on the latest firmware(especially important for [970 Evo Plus drives](https://www.tonymacx86.com/threads/do-the-samsung-970-evo-plus-drives-work-new-firmware-available-2b2qexm7.270757/page-14#post-1960453))
* Use [NVMeFix.kext](https://github.com/acidanthera/NVMeFix/releases) to allow for proper NVMe power management

And avoid problematic drives, the main culprits:

* Samsung's PM981 and PM991 SSDs
* Micron's 2200S

If you however do have these drives in your system, it's best to disable them via an SSDT: [Disabling desktop dGPUs](https://dortania.github.io/Getting-Started-With-ACPI/Desktops/desktop-disable.html).
This guide is primarily for dGPU but works the exact same way with NVMe drives(as they're both just PCIe devices)
  
### Fixing CPU Power Management

**For Intel**:

To verify you have working CPU Power Management, see the [Fixing Power Management](../universal/pm.md) page.

Also note that incorrect power management data can result in wake issues, so verify that you're using the correct SMBIOS.

A common kernel panic from wake would be:

```
Sleep Wake failure in EFI
```

**For AMD**:

Fret not, for their is still hope for you as well! [AMDRyzenCPUPowerManagement.kext](https://github.com/trulyspinach/SMCAMDProcessor) can add power management to Ryzen based CPUs. Installation and usage is explained on the repo's README.md

## Other Culprits

* [Displays](#displays)
* [NVRAM](#nvram)
* [RTC](#rtc)
* [IRQ Conflicts](#irq-conflicts)
* [Audio](#audio)
* [SMBus](#smbus)
* [TSC](#tsc)

### Displays

So display issues are mainly for laptop lid detection, specifically:

* Incorrectly made SSDT-PNLF
* OS vs firmware lid wake
* Keyboard spams from lid waking it(On PS2 based keyboards)

The former is quite easy to fix, see here: [Backlight PNLF](https://dortania.github.io/Getting-Started-With-ACPI/)

For the middle, macOS's lid wake detection can bit a bit broken and you may need to outright disable it:

```sh
sudo pmset lidwake 0
```

And set `lidwake 1` to re-enable it.

The latter requires a bit more work. What we'll be doing is trying to nullify semi random key spams that happen on Skylake and newer based HPs though pop up in other OEMs as well. This will also assume that your keyboard is PS2 based and are running [VoodooPS2](https://github.com/acidanthera/VoodooPS2/releases).

To fix this, grab [SSDT-HP-FixLidSleep.dsl](https://github.com/acidanthera/VoodooPS2/blob/master/Docs/ACPI/SSDT-HP-FixLidSleep.dsl) and adapt the ACPI pathing to your keyboard(`_CID` value being `PNP0303`). Once this is done, compile and drop into both EFI/OC/ACPI and under config.plist -> ACPI -> Add.

For 99% of HP users, this will fix the random key spam. If not, see below threads:

* [RehabMan's brightness key guide](https://www.tonymacx86.com/threads/guide-patching-dsdt-ssdt-for-laptop-backlight-control.152659/)

### NVRAM

To verify you have working NVRAM, see the [Emulated NVRAM](../misc/nvram.md) page to verify you have working NVRAM. And if not, then patch accordingly.

### RTC

This is mainly relevant for Intel 300 series motherboards(Z3xx), specifically that there's 2 issues:

* Be default the RTC is disabled(instead using AWAC)
* The RTC is usually not compatible with macOS

To get around the first issue, see here: [Fixing AWAC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/awac.html)

For the second one, it's quite easy to tell you have RTC issues when you either shutdown or restart. Specifically you'll be greeted with a "BIOS Restarted in Safemode" error. To fix this, we'll need to prevent macOS from writing to the RTC regions causing these issues. There are a couple fixes:

* DisableRtcChecksum: Prevent writing to primary checksum (0x58-0x59), works with most boards
* `UEFI -> ProtoclOverride -> AppleRtcRam` + `NVRAM -> Add -> rtc-blacklist`
  * Blacklists certain regions at the firmware level, see [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf) for more info on how to set this up
* [RTCMemoryFixup](https://github.com/acidanthera/RTCMemoryFixup) + `rtcfx_exclude=`
  * Blacklists certain regions at the kernel level, see README for more info on how to setup

With some legacy boards, you may actually need to patch your RTC: [Z68 RTC](https://www.insanelymac.com/forum/topic/329624-need-cmos-reset-after-sleep-only-after-login/)

### IRQ Conflicts

IRQ issues usually occur during bootups but some may notice that IRQ calls can break with sleep, this fix is fairly easy:

* [SSDTTime](https://github.com/corpnewt/SSDTTime)
  * First dump your DSDT in Linux/Windows
  * then select `FixHPET` option

This will provide you with both SSDT-HPET.aml and `patches_OC.plist`, You will want to add the SSDT to EFI/OC/ACPI and add the ACPI patches into your config.plist from the patches_OC.plist

### Audio

Unmanaged or incorrectly managed audio devices can also cause issues, either disable unused audio devices  in your BIOS or verify they're working correctly here:

* [Fixing Audio](../universal/audio.md)

### SMBus

Main reason you'd care about SMBus is AppleSMBus can help properly manage both SMBus and PCI devices like with power states. Problem is the kext usually won't load by itself, so you'll need to actually create the SSDT-SMBS-MCHC.

See here on more info on how to make it: [Fixing SMBus support](https://dortania.github.io/Getting-Started-With-ACPI/Universal/smbus.html)

### TSC

The TSC(Time Stamp Counter) is responsible for making sure you're hardware is running at the correct speed, problem is some firmware(mainly HEDT/Server and Asus Laptops) will not write the TSC to all cores causing issues. To get around this, we have 3 options:

* [CpuTscSync](https://github.com/lvs1974/CpuTscSync/releases)
  * For troublesome laptops
* [VoodooTSCSync](https://bitbucket.org/RehabMan/VoodooTSCSync/downloads/)
  * For most HEDT hardware
* [TSCAdjustReset](https://github.com/interferenc/TSCAdjustReset)
  * For Skylake X/W/SP and Cascade Lake X/W/SP hardware
  
The former 2 are plug n play, while the latter will need some customizations:

* Open up the kext(ShowPackageContents in finder, `Contents -> Info.plist`) and change the Info.plist -> `IOKitPersonalities -> IOPropertyMatch -> IOCPUNumber` to the number of CPU threads you have starting from `0`(i9 7980xe 18 core would be `35` as it has 36 threads total)
* Compiled version can be found here: [TSCAdjustReset.kext](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/TSCAdjustReset.kext.zip)

![](../images/post-install/sleep-md/tsc.png)

The most common way to see the TSC issue:

Case 1    |  Case 2
:-------------------------:|:-------------------------:
![](../images/troubleshooting/troubleshooting-md/asus-tsc.png)  |  ![](../images/troubleshooting/troubleshooting-md/asus-tsc-2.png)
