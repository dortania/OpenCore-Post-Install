# Battery Status

While previously you may have had to create DSDT patches/SSDT hot-patches in order to get working battery status in macOS, you longer have to thanks to the [ECEnabler](https://github.com/1Revenger1/ECEnabler/releases/latest) kext. In the extraordinary case that you still have to create DSDT patches/SSDT hot-patches (e.g. for dual batteries), we have left the previous resources linked below.

* If battery status is not working even with ECEnabler, make sure you have the [SMCBatteryManager](https://github.com/Acidanthera/VirtualSMC/releases/latest) VirtualSMC plugin enabled in your OpenCore configuration.

* Please note that certain devices, such as the Surface 3, Surface Pro 5, Surface Book 2, and Surface Laptop (and all subsequent Surface devices), use proprietary Embedded Controllers (or other similar hardware) instead of standard ACPI battery devices and OperationRegion fields, and thus without device-specific kexts, battery status cannot be patched to work.

::: details Battery Patching Resources
# Battery Patching
## DSDT Patching

While custom DSDT injection should be avoided as to prevent issues with Windows and firmware updates, it can be quite helpful as a starting point since it's a bit easier to grasp and do yourself:

**[Rehabman's how to patch DSDT for working battery status](https://www.tonymacx86.com/threads/guide-how-to-patch-dsdt-for-working-battery-status.116102/)**

* Note: When re-injecting your DSDT, it should be the first in the list of ACPI -> Add in the config.plist. And also remember that the patched DSDT would also go into EFI/OC/ACPI

* Note 2: Avoid using the MaciASL and iASL provided by Rehabman, they have been long neglected and so highly recommended grabbing a newer variant from Acidanthera: [MaciASL](https://github.com/acidanthera/MaciASL/releases)

## Battery Hot-patching

Once you've finally gotten your DSDT patched and battery working in macOS, it's time to finally create our very own hot-patches. How these differ from regular DSDT patching is that it's done on the fly with the DSDT allowing for greater flexibility with firmware updates:

**[Rehabman's Guide to Using Clover to "hotpatch" ACPI](https://www.tonymacx86.com/threads/guide-using-clover-to-hotpatch-acpi.200137/)**

* Note: Specifically post #2 refers to battery hot-patching

## Dual Battery

Acidanthera has a guide on how to handle laptops with dual-batteries: [Link](https://github.com/acidanthera/VirtualSMC/blob/master/Docs/Dual%20Battery%20Support.md)

:::