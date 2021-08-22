# Battery Status

With [ECEnabler.kext](https://github.com/1Revenger1/ECEnabler/releases/latest), ACPI patching is no longer required for working battery percentage. If you would like battery functionality beyond charge percentage (e.g. cycle count, or temperature/other supplemental data) or have dual batteries, you still will need to create ACPI patches - see the resources below.

* If battery status is not working even with ECEnabler, make sure you have the [SMCBatteryManager](https://github.com/Acidanthera/VirtualSMC/releases/latest) VirtualSMC plugin enabled in your OpenCore configuration.

* Certain devices, such as the Surface 3, Surface Pro 5, Surface Book 2, and Surface Laptop (and all subsequent Surface devices), use proprietary Embedded Controllers (or other similar hardware) instead of standard ACPI battery devices and OperationRegion fields, and thus without device-specific kexts, battery status cannot work.

::: details Battery Patching Resources

* Note: If you are using the ECEnabler kext, you do not need to split EC fields as shown in the guides below. This means that you can use the field names in your DSDT directly instead of through utility methods (e.g. `B1B2`, `B1B4`, `RE1B`, and `RECB`).

## Dual Battery

Because macOS does not properly support systems with dual batteries, you have to merge the two batteries in ACPI.

Refer to the VirtualSMC documentation for information on how to handle dual-battery laptops: [Link](https://github.com/acidanthera/VirtualSMC/blob/master/Docs/Dual%20Battery%20Support.md)

## Cycle Count

Some laptop vendors, such as HP, already supply cycle count information. However, their firmwares either do not implement or expose it within the `_BIX` method. In the past, Rehabman's ACPIBatteryManager employed a hack to support cycle counts on firmwares which do not have a `_BIX` method, however with SMCBatteryManager this is no longer supported.

Refer to the VirtualSMC documentation for information on how to transition from the ACPIBatteryManager cycle count hack to a proper `_BIX` method implementation: [Link](https://github.com/acidanthera/VirtualSMC/blob/master/Docs/Transition%20from%20zprood%27s%20cycle%20count%20hack.md)

The documentation may also prove useful for those implementing cycle count for the first time rather than transitioning from the ACPIBatteryManager cycle count hack.

## Battery Information Supplement

Although many laptops supply supplemental battery information (e.g. manufacture date and battery temperature) in their EC fields, the traditional `_BIF`, `_BIX`, and `_BST` ACPI methods do not support providing this information. Thus, SMCBatteryManager supports two ACPI methods, `CBIS` and `CBSS` to provide this information to macOS.

Refer to the VirtualSMC documentation for information on how to implement these methods: [Link](https://github.com/acidanthera/VirtualSMC/blob/master/Docs/Battery%20Information%20Supplement.md)

:::

::: details Legacy Patching Resources

## DSDT Patching

While custom DSDT injection should be avoided as to prevent issues with Windows and firmware updates, it can be quite helpful as a starting point since it's a bit easier to grasp and do yourself:

**[Rehabman's how to patch DSDT for working battery status](https://www.tonymacx86.com/threads/guide-how-to-patch-dsdt-for-working-battery-status.116102/)**

* Note: When re-injecting your DSDT, it should be the first in the list of ACPI -> Add in the config.plist. And also remember that the patched DSDT would also go into EFI/OC/ACPI

* Note 2: Avoid using the MaciASL and iASL provided by Rehabman, they have been long neglected and so highly recommended grabbing a newer variant from Acidanthera: [MaciASL](https://github.com/acidanthera/MaciASL/releases)

## Battery Hot-patching

Once you've finally gotten your DSDT patched and battery working in macOS, it's time to finally create our very own hot-patches. How these differ from regular DSDT patching is that it's done on the fly with the DSDT allowing for greater flexibility with firmware updates:

**[Rehabman's Guide to Using Clover to "hotpatch" ACPI](https://www.tonymacx86.com/threads/guide-using-clover-to-hotpatch-acpi.200137/)**

* Note: Specifically post #2 refers to battery hot-patching

:::
