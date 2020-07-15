# Keyboard Wake Issues

So an odd bug with Intel's 100 series chipsets and newer is that sometimes macOS requires a second keyboard press or some other wake event to power up the monitor as well, with some requiring a keypress+power button to wake. Well to fix this, we need to either:

* Disable Darkwake(not ideal, as background tasks will also turn on the display)
* Set `acpi-wake-type` to the USB Controller(Recommended)
* Create a fake ACPI Device

You can find a great write up on the whole situation and the fixes here: [USB Fix](https://osy.gitbook.io/hac-mini-guide/details/usb-fix).

It's an excellent read and highly recommend to truly understand *what* is exactly happening, and it's not like you've done enough reading already with this guide ;p

#### Method 1 - Add Wake Type Property (Recommended)

So the ideal method is to declare the XHCI Controller(This is our USB Controller) to be an ACPI wake device, as we don't have compatible ECs for macOS to handle proper wake calls.

To start,  we'll need to grab the PciRoot of our USB Controller(we'll use [gfxutil](https://github.com/acidanthera/gfxutil/releases), Generally the names would be XHC, XHC1 and XHCI)

![](../../images/post-install/usb-md/xhci-path.png)

Now with the PciRoot, open your config.plist and add a new entry under DeviceProperties -> Add, and add your PciRoot. Then create a child with the following attributes:

`acpi-wake-type | Data | <01>`

![](../../images/post-install/usb-md/deviceproperties.png)

#### Method 2 - Create a fake ACPI Device

This method creates a fake ACPI Device that will be associated with the GPE, then add the property of `acpi-wake-type` with USBWakeFixup.kext.

It's actually quite easy to setup, you'll need the following:

* [USBWakeFixup.kext](https://github.com/osy86/USBWakeFixup/releases)
  * Both under EFI/OC/Kexts and your config..plist
* [SSDT-USBW.dsl](https://github.com/osy86/USBWakeFixup/blob/master/SSDT-USBW.dsl)

To create the SSDT-USBW for your specific system, you're gonna need the ACPI path of your USB controller. If we look back above to the gfxutil example, we can see it also lists our ACPI path:

* `/PC00@0/XHCI@14` -> `\_SB.PC00.XHCI`

Now we can shove that into our SSDT:

![](../../images/post-install/usb-md/usbw.png)

Now with that done, you can compile and add it to your EFI and config.plist. See [Getting Started With ACPI](https://dortania.github.io/Getting-Started-With-ACPI/Manual/compile.html) for more info on compiling SSDTs
