# Apple Secure Boot

* Note: DmgLoading, SecureBootModel and ApECID require [OpenCore 0.6.1](https://github.com/acidanthera/OpenCorePkg/releases) or newer
* Note 2: macOS Big Sur requires OpenCore 0.6.3+ for proper Apple Secure Boot support

## What is Apple Secure Boot

* Information based off of [vit9696's thread](https://applelife.ru/posts/905541), [Apple's T2 docs](https://www.apple.com/euro/macbook-pro-13/docs/a/Apple_T2_Security_Chip_Overview.pdf) and [Osy's Secure Boot page](https://osy.gitbook.io/hac-mini-guide/details/secure-boot)

To best understand Apple Secure Boot, lets take a look at how the boot process works in Macs vs OpenCore in regards to security:

![](../../images/post-install/security-md/extension.png)

As we can see, there's several layers of trust incorporated into Apple Secure Boot:

* OpenCore will verify the boot.efi manifest (e.g. boot.efi.j137ap.im4m) to ensure that boot.efi was signed by Apple and can be used by this Secure Boot model.
  * For non-zero ApECID,  OpenCore will additionally verify the ECID value, written in the boot.efi manifest (e.g. boot.efi.j137ap.XXXXXXXX.im4m), to ensure that a compromised hard drive from a different machine with the same Secure Boot model cannot be used in your computer.

* boot.efi will verify the kernelcache to ensure it has not been tampered with
* apfs.kext and AppleImage4 ensure your System Volume's snapshot has not been tampered with(Only applicable with Big Sur+)

Not all of these verifications are required to boot, but they're all possible for those who want maximum security. Currently information regarding firmware-based Secure Boot is not covered however all Apple Secure Boot options are detailed below.

## DmgLoading

Quite a simple setting however important in regards to Apple Secure Boot. This setting allows you to set load policy with DMGs in OpenCore. By default we recommend using `Signed` however for best security  `Disabled` may be preferred.

Possible options for `Misc -> Security -> DmgLoading`:

| Value | Comment |
| :--- | :--- |
| Any      | Allows all DMGs to load in OpenCore, however this option will cause a boot failure if Apple Secure Boot is enabled |
| Signed   | Allows only Apple-signed DMGs like macOS installers to load |
| Disabled | Disables all external DMG loading, however internal recovery is still allowed with this option |

## SecureBootModel

SecureBootModel is used set the Apple Secure Boot hardware model and policy, allowing us to enable Apple's Secure Boot with any SMBIOS even if the original SMBIOS did not support it(ie. no T2 present on pre-2017 SMBIOS). Enabling SecureBootModel is the equivalent of ["Medium Security"](https://support.apple.com/HT208330), for Full Security please see [ApECID](#apecid)

Currently the following options for `Misc -> Security -> SecureBootModel` are supported:

| Value     | SMBIOS                                  | Minimum macOS Version |
| :---      | :---                                    | :---                  |
| Disabled  | No model, Secure Boot will be disabled. | N/A                   |
| Default   | Currently set to j137, iMacPro1,1       | 10.13.2 (17C2111)     |
| j137      | iMacPro1,1 (December 2017)              | 10.13.2 (17C2111)     |
| j680      | MacBookPro15,1 (July 2018)              | 10.13.6 (17G2112)     |
| j132      | MacBookPro15,2 (July 2018)              | 10.13.6 (17G2112)     |
| j174      | Macmini8,1 (October 2018)               | 10.14 (18A2063)       |
| j140k     | MacBookAir8,1 (October 2018)            | 10.14.1 (18B2084)     |
| j780      | MacBookPro15,3 (May 2019)               | 10.14.5 (18F132)      |
| j213      | MacBookPro15,4 (July 2019)              | 10.14.5 (18F2058)     |
| j140a     | MacBookAir8,2 (July 2019)               | 10.14.5 (18F2058)     |
| j152f     | MacBookPro16,1 (November 2019)          | 10.15.1 (19B2093)     |
| j160      | MacPro7,1 (December 2019)               | 10.15.1 (19B88)       |
| j230k     | MacBookAir9,1 (March 2020)              | 10.15.3 (19D2064)     |
| j214k     | MacBookPro16,2 (May 2020)               | 10.15.4 (19E2269)     |
| j223      | MacBookPro16,3 (May 2020)               | 10.15.4 (19E2265)     |
| j215      | MacBookPro16,4 (June 2020)              | 10.15.5 (19F96)       |
| j185      | iMac20,1 (August 2020)                  | 10.15.6 (19G2005)     |
| j185f     | iMac20,2 (August 2020)                  | 10.15.6 (19G2005)     |
| x86legacy | Non-T2 Macs in 11.0(Recommended for VMs)| 11.0.0                |

### Special Notes with SecureBootModel

* Generally `Default` is more than adequate to use however if you plan to have use this with ApECID for full security, we recommend setting a proper value(ie. closest to your SMBIOS or versions of macOS you plan to boot) since the `Default` value is likely to be updated in the future.
  * `x86legacy` is not required for normal Mac models without T2's, any of the above values are supported.
* The list of cached drivers may be different, resulting in the need to change the list of Added or Forced kernel drivers.
  * ie. IO80211Family cannot be injected in this case, as it is already present in the kernelcache
* Unsigned and several signed kernel drivers cannot be used
  * This includes Nvidia's Web Drivers in 10.13
* System volume alterations on operating systems with sealing, like macOS 11, may result in the operating system being unbootable.
  * If you plan to disable macOS's APFS snapshots, please remember to disable SecureBootModel as well
* Certain boot errors are more likely to be triggered with Secure Boot enabled that were previously not required
  * Commonly seen with certain APTIO IV systems where they may not require IgnoreInvalidFlexRatio and HashServices initially however Secure Boot does.
* On older CPUs (ie. before Sandy Bridge) enabling Apple Secure Boot might cause slightly slower loading by up to 1 second
* Operating systems released before Apple Secure Boot landed (ie. macOS 10.12 or earlier) will still boot until UEFI Secure Boot is enabled. This is so,
  * This is due to Apple Secure Boot assuming they are incompatible and will be handled by the firmware just like Microsoft Windows is
* Virtual Machines will want to use `x86legacy` for Secure Boot support
  * Note using any other model will require `ForceSecureBootScheme` enabled

::: details Troubleshooting

Due to an annoying bug on Apple's end, certain systems may be missing the secure boot files themselves on the drive. Because of this, you may get issues such as:

```
OCB: LoadImage failed - Security Violation
```

To resolve, run the following in macOS:

```bash
# First, find your Preboot volume
diskutil list

# From the below list, we can see our Preboot volume is disk5s2
/dev/disk5 (synthesized):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      APFS Container Scheme -                      +255.7 GB   disk5
                                 Physical Store disk4s2
   1:                APFS Volume ⁨Big Sur HD - Data⁩       122.5 GB   disk5s1
   2:                APFS Volume ⁨Preboot⁩                 309.4 MB   disk5s2
   3:                APFS Volume ⁨Recovery⁩                887.8 MB   disk5s3
   4:                APFS Volume ⁨VM⁩                      1.1 MB     disk5s4
   5:                APFS Volume ⁨Big Sur HD⁩              16.2 GB    disk5s5
   6:              APFS Snapshot ⁨com.apple.os.update-...⁩ 16.2 GB    disk5s5s
# Now mount the Preboot volume
diskutil mount disk5s2

# CD into your Preboot volume
# Note the actual volume is under /System/Volumes/Preboot in macOS
# however in Recovery it's simply under /Volumes/Preboot
cd /System/Volumes/Preboot

# Grab your UUID
ls
 46923F6E-968E-46E9-AC6D-9E6141DF52FD
 CD844C38-1A25-48D5-9388-5D62AA46CFB8

# If multiple show up(ie. you dual boot multiple versions of macOS), you will
# need to determine which UUID is correct.
# Easiest way to determine is printing the value of .disk_label.contentDetails
# of each volume.
cat ./46923F6E-968E-46E9-AC6D-9E6141DF52FD/System/Library/CoreServices/.disk_label.contentDetails
 Big Sur HD%

cat ./CD844C38-1A25-48D5-9388-5D62AA46CFB8/System/Library/CoreServices/.disk_label.contentDetails
 Catalina HD%

# Next lets copy over the secure boot files, recovery will need different commands

# Example commands for inside macOS
# Replace CD844C38-1A25-48D5-9388-5D62AA46CFB8 with your UUID value
cd ~
sudo cp -a /usr/standalone/i386/. /System/Volumes/Preboot/CD844C38-1A25-48D5-9388-5D62AA46CFB8/System/Library/CoreServices

# Example commands for Recovery
# Replace Macintosh\ HD and CD844C38-1A25-48D5-9388-5D62AA46CFB8 with
# your System Volume's name and Preboot's UUID
cp -a /Volumes/Macintosh\ HD/usr/standalone/i386/. /Volumes/Preboot/CD844C38-1A25-48D5-9388-5D62AA46CFB8/System/Library/CoreServices
```

Now you can enable SecureBootModel and reboot without issue! And since we're not editing the system volume itself we don't need to worry about disabling SIP or breaking macOS snapshots.

:::

## ApECID

ApECID is used as an Apple Enclave Identifier, what this means is it allows us to use  personalized Apple Secure Boot identifiers and achieve ["Full Security"](https://support.apple.com/HT208330) as per Apple's secure boot page(when paired with SecureBootModel).

To generate your own ApECID value, you'll want some form of cryptographically secure random number generator that will output a 64-bit integer. Below we provide an example that can be run if [Python 3](https://www.python.org/downloads/) is installed on your machine:

```py
python3 -c 'import secrets; print(secrets.randbits(64))'
```

With this unique 64-bit int, you can now enter it under Misc -> ApECID in your config.plist

However before setting ApECID, there's a few things we need to note:

* Fresh installs with ApECID set to a non-zero value will require a network connection at install time for verification
* SecureBootModel should have a defined value instead of `Default` to avoid issues if the value were to change in later OpenCore versions.
* Pre-existing installs will need to personalize the volume, for this you'll need to first reboot into recovery and run the following command(Replace `Macintosh HD` with your system's volume name):

```sh
# Run this command after setting your ApECID value
# You'll also need an active network connection in recovery to run this command
 bless bless --folder "/Volumes/Macintosh HD/System/Library/CoreServices" \
    --bootefi --personalize
```

And something to note when reinstalling macOS 10.15 or older is that you may receive "Unable to verify macOS" error message. To work around this issue, you'll want to allocate a dedicated RAM disk of 2 MBs for macOS personalization by entering the following commands in the macOS recovery terminal before starting the installation:

```sh
disk=$(hdiutil attach -nomount ram://4096)
diskutil erasevolume HFS+ SecureBoot $disk
diskutil unmount $disk
mkdir /var/tmp/OSPersonalizationTemp
diskutil mount -mountpoint /var/tmp/OSPersonalizationTemp $disk
```
