# Keyboard Wake Issues

So an odd bug with Intel's 100 series chipsets and newer is that sometimes macOS requires a second keyboard press or some other wake event to power up the monitor as well, with some requiring a keypress+power button to wake. Well to fix this, we need to either:

* [Set `acpi-wake-type` to the USB Controller(Recommended)](#method-1-add-wake-type-property-recommended)
* [Create a fake ACPI Device](#method-2-create-a-fake-acpi-device)
* [Disable darkwake(not ideal, as background tasks will also turn on the display)](#method-3-configuring-darkwake)

You can find a great write up on the whole situation and the fixes here: [USB Fix](https://osy.gitbook.io/hac-mini-guide/details/usb-fix).

It's an excellent read and highly recommend to truly understand *what* is exactly happening, and it's not like you've done enough reading already with this guide ;p

## Method 1 - Add Wake Type Property (Recommended)

So the ideal method is to declare the XHCI Controller (this is our USB Controller) to be an ACPI wake device, as we don't have compatible ECs for macOS to handle proper wake calls.

To start, we'll need to grab the PciRoot of our USB Controller (we'll use [gfxutil](https://github.com/acidanthera/gfxutil/releases), Generally the names would be XHC, XHC1 and XHCI)

![](../../images/post-install/usb-md/xhci-path.png)

Now with the PciRoot, open your config.plist and add a new entry under DeviceProperties -> Add, and add your PciRoot. Then create a child with the following attributes:

`acpi-wake-type | Data | <01>`

![](../../images/post-install/usb-md/deviceproperties.png)

## Method 2 - Create a fake ACPI Device

This method creates a fake ACPI Device that will be associated with the GPE, then add the property of `acpi-wake-type` with USBWakeFixup.kext.

It's actually quite easy to setup, you'll need the following:

* [USBWakeFixup.kext](https://github.com/osy86/USBWakeFixup/releases)
  * Both under EFI/OC/Kexts and your config.plist
* [SSDT-USBW.dsl](https://github.com/osy86/USBWakeFixup/blob/master/SSDT-USBW.dsl)

To create the SSDT-USBW for your specific system, you're gonna need the ACPI path of your USB controller. If we look back above to the gfxutil example, we can see it also lists our ACPI path:

* `/PC00@0/XHCI@14` -> `\_SB.PC00.XHCI`

Now we can shove that into our SSDT:

![](../../images/post-install/usb-md/usbw.png)

Now with that done, you can compile and add it to your EFI and config.plist. See [Getting Started With ACPI](https://dortania.github.io/Getting-Started-With-ACPI/Manual/compile.html) for more info on compiling SSDTs

## Method 3 - Configuring darkwake

Before we get deep into configuring darkwake, it would be best to explain what darkwake is. A great in-depth thread by holyfield can be found here: [DarkWake on macOS Catalina](https://www.insanelymac.com/forum/topic/342002-darkwake-on-macos-catalina-boot-args-darkwake8-darkwake10-are-obsolete/)

In its simplest form, you can think of darkwake as "partial wake", where only certain parts of your hardware are lit up for maintenance tasks while others remain asleep (ie. Display). Reason we may care about this is that darkwake can add extra steps to the wake process like keyboard press, but outright disabling it can make our hack wake randomly. So ideally we'd go through the below table to find an ideal value.

Now lets take a look at [IOPMrootDomain's source code](https://opensource.apple.com/source/xnu/xnu-6153.81.5/iokit/Kernel/IOPMrootDomain.cpp.auto.html):

```cpp
// gDarkWakeFlags
enum {
    kDarkWakeFlagHIDTickleEarly      = 0x01, // hid tickle before gfx suppression
    kDarkWakeFlagHIDTickleLate       = 0x02, // hid tickle after gfx suppression
    kDarkWakeFlagHIDTickleNone       = 0x03, // hid tickle is not posted
    kDarkWakeFlagHIDTickleMask       = 0x03,
    kDarkWakeFlagAlarmIsDark         = 0x0100,
    kDarkWakeFlagGraphicsPowerState1 = 0x0200,
    kDarkWakeFlagAudioNotSuppressed  = 0x0400
};
```

Now lets go through each bit:

| Bit | Name | Comment |
| :--- | :--- | :--- |
| 0 | N/A | Supposedly disables darkwake |
| 1 | HID Tickle Early | Helps with wake from lid, may require pwr-button press to wake in addition |
| 2 | HID Tickle Late | Helps single keypress wake but disables auto-sleep |
| 3 | HID Tickle None | Default darkwake value if none is set|
| 3 | HID Tickle Mask | To be paired with other |
| 256 | Alarm Is Dark | To be explored |
| 512 | Graphics Power State 1 | Enables wranglerTickled to wake fully from hibernation and RTC |
| 1024 | Audio Not Suppressed | Supposedly helps with audio disappearing after wake |

* Note that HID = Human-interface devices (Keyboards, mice, pointing devices, etc)

To apply the above table to your system, it's as simple as grabbing calculator, adding up your desired darkwake values and then applying the final value to your boot-args. However we recommend trying 1 at a time rather than merging all at once, unless you know what you're doing (though you likely wouldn't be reading this guide).

For this example, lets try and combine `kDarkWakeFlagHIDTickleLate` and `kDarkWakeFlagGraphicsPowerState1`:

* `2`= kDarkWakeFlagHIDTickleLate
* `512`= kDarkWakeFlagGraphicsPowerState1

So our final value would be `darkwake=514`, which we can next place into boot-args:

```
NVRAM
|---Add
  |---7C436110-AB2A-4BBB-A880-FE41995C9F82
    |---boot-args | String | darkwake=514
```

The below is more for clarification for users who are already using darkwake or are looking into it, specifically clarifying what values no longer work:

* `darkwake=8`: This hasn't been in the kernel since [Mavericks](https://opensource.apple.com/source/xnu/xnu-2422.115.4/iokit/Kernel/IOPMrootDomain.cpp.auto.html)
  * Correct boot-arg would be `darkwake=0`
* `darkwake=10`: This hasn't been in the kernel since [Mavericks](https://opensource.apple.com/source/xnu/xnu-2422.115.4/iokit/Kernel/IOPMrootDomain.cpp.auto.html)
  * Correct boot-arg would be `darkwake=2`
