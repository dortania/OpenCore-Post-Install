# Updating OpenCore and macOS

## Updating OpenCore

So the main things to note with updating OpenCore:

* [Releases](https://github.com/acidanthera/OpenCorePkg/releases) happen the first Monday of every month
* The [Differences.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Differences/Differences.pdf) will tell you all the things added and removed from this version of OpenCore compared to the previous release
* The OpenCore Install Guide will have a note in the [header](https://dortania.github.io/OpenCore-Install-Guide/) about what release version it supports

> So how do I update?

So the process goes as follows:

### 1. **Download the latest release of OpenCore**

* [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases)

### 2. **Mount your EFI**

* So first, lets mount your hard drive's EFI and make a copy somewhere safe with [MountEFI](https://github.com/corpnewt/MountEFI). We won't be updating the drive's EFI at first, instead we'll be grabbing a spare USB to be our crash dummy. This allows us to keep a working copy of OpenCore in case our update goes south

* For the USB, it must be formatted as GUID. Reason for this is that GUID will automatically create an EFI partition, though this will be hidden by default so you'll need to mount it with MountEFI.

 ![](../images/post-install/update-md/usb-erase.png)

* Now you can place your OpenCore EFI on the USB

 ![](../images/post-install/update-md/usb-folder.png)

### 3. **Replace the OpenCore files with the ones you just downloaded**

* The important ones to update:

  * `EFI/BOOT/BOOTx64.efi`
  * `EFI/OC/OpenCore.efi`
  * `EFI/OC/Drivers/OpenRuntime.efi`(**Don't forget this one, OpenCore will not boot with mismatched versions**)

* You can also update other drivers you have if present, these are just the ones that **must** be updated in order to boot correctly

![](../images/post-install/update-md/usb-folder-highlight.png)

### 4. **Compare your config.plist to that of the new Sample.plist**

* With this, there's a couple ways to do this:

  * [OCConfigCompare](https://github.com/corpnewt/OCConfigCompare) to compare between the sample.plist and your config.plist
  * `diff (file input 1) (file input 2)` in terminal
  * [Meld Merge](https://github.com/yousseb/meld/releases/), [WinMerge](https://winmerge.org/), or your other favorite comparison software
  * Make a new config based off reading the updated OpenCore Install Guide

![](../images/post-install/update-md/oc-config-compare.png)

* Once you've made the adjustments, to make sure that you config is compliant with the newest release of OpenCore, you can use the OpenCore Utility ocvalidate: this tool will help ensure your config.plist is matching the OpenCore specification of the matching build.
  * Please note, that `ocvalidate` must match the used OpenCore release and may not be able to detect all configuration flaws present in the file. We recommend to double check your setting with the OpenCore Guide on what to set everything to, otherwise read the [Differences.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Differences/Differences.pdf)  for more in-depth documentation on changes.
  * To run `ocvalidate`, `cd` into OpenCore's `Utilties/ocvalidate/` and run `./ocvalidate <insert_config.plist>`. Note you may need to run `chmod +x ocvalidate` for it to execute.
  * In addition, update ProperTree and perform an OC Snapshot (Ctrl/Cmd+R) to ensure that the config entries for your SSDTs, drivers, kexts, etc. are compliant with the format OpenCore expects.

![](../images/post-install/update-md/ocvalidate.png)

### 5. **Boot!**

* Once everything's working with the dummy USB, you can mount the EFI and move it over to the hard drive's EFI partition. Remember to keep a copy of your old EFI in cases where OpenCore is acting funny down the road

## Updating Kexts

* Updating Kexts is a similar process to updating OpenCore, make a copy of everything and update on a dummy USB in case there's issues

* The easiest way to update your kexts is via 2 tools:

  * [Lilu and Friends](https://github.com/corpnewt/Lilu-and-Friends) to download and compile the kexts
  * [Kext Extractor](https://github.com/corpnewt/KextExtractor) to merge them into your EFI

## Updating macOS

* So this is probably one of the most challenging parts, maintaining your system through OS updates. The main things to keep in mind:
  * With OS updates, make sure everything has been updated and you have some form of recovery like TimeMachine or an older macOS installer with a known good EFI on it
  * Do a bit of google-fu to see if others are having issues with the newest update

* I've also provided a bit more of a detailed map of what's changed in macOS versions, see below:

**macOS Catalina**:

* 10.15.0
  * [Requires proper EC](https://dortania.github.io/Getting-Started-With-ACPI/)
  * Dual socket and most AMD CPUs need [AppleMCEReporterDisabler.kext](https://github.com/acidanthera/bugtracker/files/3703498/AppleMCEReporterDisabler.kext.zip)
  * MacPro5,1 support has been dropped
* 10.15.1
  * Requires WhateverGreen 1.3.4+
  * Broke DRM for many GPUs(see [DRM Chart](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.Chart.md))
  * Requires all previous fixes
* 10.15.2
  * Fixes Navi support in the installer
  * Requires all previous fixes
* 10.15.3
  * No change
  * Requires all previous fixes
* 10.15.4
  * [AMD CPU users need to update `cpuid_set_cpufamily` patch](https://github.com/AMD-OSX/AMD_Vanilla)
  * Fixes DRM on many Ellesmere based Polaris GPUs
  * Requires all previous fixes(excluding `shikigva=80` for Polaris DRM for most users)
* 10.15.5
  * UHD 630's framebuffer broke for many, if you receive black screen you may need to swap from `07009B3E` to `00009B3E`
  * Comet Lake S no longer requires a CPU ID spoof
* 10.15.6
  * No change
  * Requires all previous fixes for 10.15.5
* 10.15.7
  * No change
  * Requires all previous fixes for 10.15.5
  
**macOS Big Sur**:

* 11.0.1
  * See here: [OpenCore and macOS 11: Big Sur](https://dortania.github.io/OpenCore-Install-Guide/extras/big-sur/)

**macOS Monterey**:

* 12.0.1
  * See here: [OpenCore and macOS 12: Monterey](https://dortania.github.io/OpenCore-Install-Guide/extras/monterey.html)
