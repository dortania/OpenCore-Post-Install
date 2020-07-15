# Fixing Shutdown/Restart

So an odd quirk you may run into with macOS is that when you shutdown, your PC may instead restart itself. This is actually due to a missing S5 call that powers down the controller. Of course Windows and Linux implement hacks to get around this but macOS has no such fixes, instead we need to do the dirty work and fix their ACPI writing. Don't worry, this won't harm other OSes.

For this we need the following:

* [FixShutdown-USB-SSDT.dsl](https://github.com/dortania/USB-Map-Guide/blob/master/extra-files/FixShutdown-USB-SSDT.dsl)
* [_PTS to ZPTS Patch](https://github.com/dortania/USB-Map-Guide/blob/master/extra-files/FixShutdown-Patch.plist)
* USB Controller's ACPI Path

To find the USB Controller that needs fixing, search for `_PRW` in your DSDT and see what Device is mentioned within it, generally this will be something like `SB.PCI0.XHC`.

With the ACPI path, edit FixShutdown-USB-SSDT.dsl and compile it to a .aml file(Assembled). [MaciASL can help you with this](https://dortanian.github.io/Getting-Started-With-ACPI/Manual/compile.html)
