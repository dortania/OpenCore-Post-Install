# OpenCore Post-Install

Welcome to the OpenCore Post-Install guide! Please note that if you have not installed macOS yet, we recommend you follow one of our install guides:

* [OpenCore Desktop Guide](https://dortania.github.io/OpenCore-Install-Guide/)
* [OpenCore Laptop Guide](https://dortania.github.io/vanilla-laptop-guide/)

And while the info here can be applied to both OpenCore and Clover, we primarily focus on OpenCore installations. So you will need to research a bit more if you run into any issues.



## How to follow this guide


To start, not every section in this guide must be complete. It's up to each user whether they feel they want to add the finishing touches or resolve certain issues

This guide is split into 4 parts:

* [Universal](#universal)
  * All users are recommended to follow
* [USB Fixes](#usb-fixes)
  * All users are recommended to follow as well
* [Laptop Specifics](#laptop-specifics)
  * Laptop users are recommended to follow in addition to the above
* [Cosmetics](#cosmetics)
  * Cosmetics like OpenCore GUI and removing verbose screen output during boot
* [Multiboot](#multiboot)
  * Recommendations for users who are multi-booting
* [Miscellaneous](#miscellaneous)
  * Other misc fixes, not all users will require these fixes

### Universal

* [Security and FileVault](/universal/security.md)
  * For those who care about security and privacy.
* [Fixing Audio](/universal/audio.md)
  * For those needing help resolving audio issues.
* [Booting without USB](/universal/oc2hdd.md)
  * Allowing you to boot OpenCore without the USB installed.
* [Updating OpenCore, kexts and macOS](/universal/update.md)
  * How to update your kexts, OpenCore and even macOS safely.
* [Fixing DRM](/universal/drm.md)
  * For those with DRM issues like Netflix playback.
* [Fixing iServices](/universal/iservices.md)
  * Help to fix misc iServices issues like iMessage.
* [Fixing Power Management](/universal/pm.md)
  * Fixes and helps improve both hardware idle and boosting states.
* [Fixing Sleep](/universal/sleep.md)
  * Numerous places to check for when fixing sleep.
* [Fixing USB](/usb/README.md)
  * Fixes for USB issues like missing ports and helping with sleep.

### USB Fixes

* [USB Mapping: Introduction](/usb/README.md)
  * Starting point for correcting your USB

### Laptop Specifics

* [Fixing Battery Read-outs](/laptop-specific/battery.md)
  * If your battery isn't supported out of the box with SMCBatteryManager.

### Cosmetics

* [Add GUI and Boot-chime](/cosmetic/gui.md)
  * Add a fancy GUI to OpenCore and even a boot chime!
* [Fixing Resolution and Verbose](/cosmetic/verbose.md)
  * Helps fix the resolution of OpenCore, and allows you to get that sweet Apple logo while booting!

### Multiboot 

* [Setting up Bootstrap.efi](/multiboot/bootstrap.md)
  * Ensures Windows doesn't remove OpenCore from our system.
* [Installing BootCamp](/multiboot/bootcamp.md)
  * Allows us to install Bootcamp for easy boot switching.

### Miscellaneous

* [Fixing RTC](/misc/rtc.md)
  * Helps resolve RTC/CMOS/safe-mode reboot issues.
* [Fixing CFG Lock](/misc/msr-lock.md)
  * Allows use to remove some kernel patches for better stability
* [Emulated NVRAM](/misc/nvram.md)
  * For users who have broken NVRAm, or need to test it.

 https://dortania.github.io/OpenCore-Post-Install/
