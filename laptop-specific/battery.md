# Battery Patching

While at the moment battery patching is not something covered in this guide, we'll at least point you to some helpful resources and add some useful notes for when using them in OpenCore.

## DSDT Patching

While custom DSDT injection should be avoided as to prevent issues with Windows and firmware updates, it can be quite helpful as a starting point since it's a bit easier to grasp and do yourself:

**[Rehabman's how to patch DSDT for working battery status](https://www.tonymacx86.com/threads/guide-how-to-patch-dsdt-for-working-battery-status.116102/)**

* Note: When re-injecting your DSDT, it should be the first in the list of ACPI -> Add in the config.plist. And also remember that the patched DSDT would also go into EFI/OC/ACPI

* Note 2: Avoid using the MaciASL and iASL provided by Rehabman, they have been long neglected and so highly recommended grabbing a newer variant from Acidanthera: [MaciASL](https://github.com/acidanthera/MaciASL/releases)

## Battery Hot-patching

Once you've finally gotten your DSDT patched and battery working in macOS, it's time to finally create our very own hot-patches. How these differ from regular DSDT patching is that it's done on the fly with the DSDT allowing for greater flexibility with firmware updates:

**[Rehabman's Guide to Using Clover to "hotpatch" ACPI](https://www.tonymacx86.com/threads/guide-using-clover-to-hotpatch-acpi.200137/)**

* Note: Specifically post #2 refers to battery hot-patching
