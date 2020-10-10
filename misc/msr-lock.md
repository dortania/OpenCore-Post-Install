# Fixing CFG Lock



Do note that this guide is only for Intel users. AMD users don't have any type of CFG Lock

## What is CFG-Lock

CFG-Lock is a setting in your BIOS that allows for a specific register(in this case the MSR 0xE2) to be written to. By default, most motherboards lock this variable with many even hiding the option outright in the GUI. And why we care about it is that macOS actually wants to write to this variable, and not just one part of macOS. Instead both the Kernel(XNU) and AppleIntelPowerManagement want this register.

So to fix it we have 2 options:

1. Patch macOS to work with our hardware

* This creates instability and unnecessary patching for many
* The 2 patches we use for this:
  * `AppleCpuPmCfgLock` for AppleIntelPowerManagement.kext
  * `AppleXcpmCfgLock` for the Kernel(XNU)

2. Patch our firmware to support MSR E2 write

* Very much preferred, as avoids patching allowing for greater flexibility regarding stability and OS upgrades
  
Note: Penyrn based machines actually don't need to worry about unlocking this register

## Checking if your firmware supports CFG Lock unlocking

Before proceeding with the reading of this guide, first of all you'd need to check if your firmware supports CFG Lock unlocking.
To check it, you can proceed into two ways:

1. use the DEBUG version of OpenCore and check what the log says about CFG Lock
2. use a tool called `VerifyMsrE2` which will speed up the whole checking process

**for users who prefer using DEBUG release, please check `opencore-YYYY-MM-DD-hhmmss.txt` and search `OCCPU: EIST CFG Lock`. If you read `1` then proceed with the CFG Lock unlocking procedure** 

Personally we prefer using the first choice, but to avoid confusion we'll choose option 2.
Add the tool inside `EFI/OC/Tools` and `config.plist` then run `VerifyMsrE2.efi` and check if you read 

```
This firmware has LOCKED MSR 0xE2 register!
```

If you read

```
This firmware has UNLOCKED MSR 0xE2 register!
```

you don't need to do anything and you can disable `Kernel -> Quirks -> AppleCpuPmCfgLock` and `Kernel -> Quirks -> AppleXcpmCfgLock`.

## Disabling CFG Lock

So you've created the EFI folder but you can't still boot without unlocking before CFG Lock. In order to do this you'll need the following:

Inside your `EFI/OC/Tools folder` and `config.plist`:

* [Modified GRUB Shell](https://github.com/datasone/grub-mod-setup_var/releases)

And some apps to help us out:

* [UEFITool](https://github.com/LongSoft/UEFITool/releases) (Make sure it's UEFITool and not UEFIExtract)
* [Universal-IFR-Extractor](https://github.com/LongSoft/Universal-IFR-Extractor/releases)

And the final part, grabbing your BIOS from the vendors' website.

Now the fun part!



## Turning off CFG-Lock manually

**Please note that the only firmwares that can be directly opened by UEFITool are ASUS, MSI and ASRock. Other firmwares need a special procedure which we'll not directly cover into this guide. For Dell firmwares please refer to [dreamwhite's guide](https://github.com/dreamwhite/bios-extraction-guide/tree/master/Dell)**

1. Open your firmware with UEFITool and then find `CFG Lock` as a Unicode string. If nothing pops up then your firmware doesn't support `CFG Lock`, otherwise continue on.

![](../images/extras/msr-lock-md/uefi-tool.png)

1. You'll find that this string is found within a Setup folder, right-click and export as `Setup.bin` (or even `Setup.sct`)
2. Open your setup file with `ifrextract` and export as a .txt file with terminal:

   ```
   path/to/ifrextract path/to/Setup.bin path/to/Setup.txt
   ```

3. Open the text file and search for `CFG Lock, VarStoreInfo (VarOffset/VarName):` and note the offset right after it (ie: `0x5A4`)

![](../images/extras/msr-lock-md/cfg-find.png)

1. Run the Modified GRUB Shell and write the following command where `0x5A4` is replaced with the value you've previously extracted:

   ```
   setup_var 0x5A4
   ```

If you get an error such as `error: offset is out of range` run the following command:
   
   ```
   setup_var2 0x5A4
   ```
   Just as before, if you still get `error: offset is out of range` you'd need to use this command:
   
   ```
   setup_var_3 0x5A4
   ```
   If you don't get any type of error, write the command which doesn't lead to `error: offset is out of range` (e.g. `setup_var_3 0x5A4`) and write `0x00` after it:
   
   ```
   setup_var_3 0x5A4 0x00
   ```
   
At this point **turn off** the PC then start it again and you'll have `CFG Lock` unlocked.
Do note that variable offsets are unique not just to each motherboard but even to its firmware version. **Never try to use an offset without checking.**

And you're done! Now you'll have correct CPU power management

* **Note**: Every time you reset your BIOS you will need to flip this bit again, make sure to write it down with the BIOS version so you know which.

* **Note 2**: Some OEMs like Lenovo may have the variable set but cannot unlock it without physically modding the BIOS, for these situations you may need to use a tool like [RU](http://ruexe.blogspot.com/): [CFG LOCK/Unlocking - Alternative method](https://www.reddit.com/r/hackintosh/comments/hz2rtm/cfg_lockunlocking_alternative_method/)
