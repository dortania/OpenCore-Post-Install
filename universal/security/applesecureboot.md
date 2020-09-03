# Apple Secure Boot

* Note: DmgLoading, SecureBootModel and ApECID require [OpenCore 0.6.1](https://github.com/acidanthera/OpenCorePkg/releases) or newer


## DmgLoading

Quite a simple setting however important in regards to Apple Secure Boot. This setting allows you to set load policy with DMGs in OpenCore. By default we recommend using `Signed` however for best security  `Disabled` may be preferred.

Possible options for `Misc -> Security -> DmgLoading`:

| Value | Comment |
| :--- | :--- |
| Any      | Allows all DMGs to load in OpenCore, however this option will cause a boot failure Apple Secure Boot is enabled |
| Signed   | Allows only Apple-signed DMGs like macOS installers to load |
| Disabled | Disables all external DMG loading, however internal recovery is still allowed with this option |

## SecureBootModel

SecureBootModel is used set the Apple Secure Boot hardware model and policy, allowing us to enable Apple's Secure Boot with any SMBIOS even if the original SMBIOS did not support it(ie. no T2 present on pre-2017 SMBIOS). Enabling SecureBootModel is the equivalent of ["Medium Security"](https://support.apple.com/HT208330), for Full Security please see [ApECID](#apecid)

Currently the following options for `Misc -> Security -> SecureBootModel` are supported:

| Value    | SMBIOS                                  | Minimum macOS Version |
| :---     | :---                                    | :---                  |
| Disabled | No model, Secure Boot will be disabled. | N/A                   |
| Default  | Currently set to j137, iMacPro1,1       | 10.13.2 (17C2111)     |
| j137     | iMacPro1,1 (December 2017)              | 10.13.2 (17C2111)     |
| j680     | MacBookPro15,1 (July 2018)              | 10.13.6 (17G2112)     |
| j132     | MacBookPro15,2 (July 2018)              | 10.13.6 (17G2112)     |
| j174     | Macmini8,1 (October 2018)               | 10.14 (18A2063)       |
| j140k    | MacBookAir8,1 (October 2018)            | 10.14.1 (18B2084)     |
| j780     | MacBookPro15,3 (May 2019)               | 10.14.5 (18F132)      |
| j213     | MacBookPro15,4 (July 2019)              | 10.14.5 (18F2058)     |
| j140a    | MacBookAir8,2 (July 2019)               | 10.14.5 (18F2058)     |
| j152f    | MacBookPro16,1 (November 2019)          | 10.15.1 (19B2093)     |
| j160     | MacPro7,1 (December 2019)               | 10.15.1 (19B88)       |
| j230k    | MacBookAir9,1 (March 2020)              | 10.15.3 (19D2064)     |
| j214k    | MacBookPro16,2 (May 2020)               | 10.15.4 (19E2269)     |
| j223     | MacBookPro16,3 (May 2020)               | 10.15.4 (19E2265)     |
| j215     | MacBookPro16,4 (June 2020)              | 10.15.5 (19F96)       |
| j185     | iMac20,1 (August 2020)                  | 10.15.6 (19G2005)     |
| j185f    | iMac20,2 (August 2020)                  | 10.15.6 (19G2005)     |

### Special Notes with SecureBootModel

* Generally `Default` is more than adequate to use however if you plan to have use this with ApECID for full security, we recommend setting a proper value(ie. closest to your SMBIOS or versions of macOS you plan to boot) since the `Default` value is likely to be updated in the future.
* The list of cached drivers may be different, resulting in the need to change the list of Added or Forced kernel drivers. 
  * ie. IO80211Family cannot be injected in this case.
* Unsigned and several signed kernel drivers cannot be used
  * This includes Nvidia's Web Drivers in 10.13
* System volume alterations on operating systems with sealing, like macOS 11, may result in the operating system being unbootable. 
  * If you plan to disable macOS's APFS snapshots, please remember to disable SecureBootModel as well
* Certain boot errors are more likely to be triggered with Secure Boot enabled that were previously not required
  * Commonly seen with certain APTIO IV systems where they may not require IgnoreInvalidFlexRatio and HashServices initially however Secure Boot does.
* On older CPUs (ie. before Sandy Bridge) enabling Apple Secure Boot might cause slightly slower loading by up to 1 second
* Operating systems released before Apple Secure Boot landed (ie. macOS 10.12 or earlier) will still boot until UEFI Secure Boot is enabled. This is so, 
  * This is due to Apple Secure Boot assuming they are incompatible and will be handled by the firmware just like Microsoft Windows is

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
* Pre-existing installs will need to use bless, for this you'll need to first reboot into recovery and run the following command(Replace Macintosh HD with your system's volume name):


```sh
bless bless --folder "/Volumes/Macintosh HD/System/Library/CoreServices" \ --bootefi --personalize
```

And something to note when reinstalling the OS is that you may receive "Unable to verify macOS" error message. To work around his issue, you'll want to allocate a dedicated RAM disk of 2 MBs for macOS personalization by entering the following commands in the macOS recovery terminal before starting the installation:

```sh
disk=$(hdiutil attach -nomount ram://4096) 
diskutil erasevolume HFS+ SecureBoot $disk 
diskutil unmount $disk 
mkdir /var/tmp/OSPersonalizationTemp 
diskutil mount -mountpoint /var/tmp/OSPersonalizationTemp $disk
```