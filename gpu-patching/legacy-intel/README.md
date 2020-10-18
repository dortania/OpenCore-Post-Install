# Legacy Intel Setup

Covers support for the following GPU models:

* GMA 900 (10.4 and 10.5)
  * Partial support in 10.6 and 10.7, however acceleration issues are common
* GMA 950(10.4-10.7)
  * GMA 3150's can be spoofed for support, however proper acceleration is missing
* GMA X3100(10.5-10.7)
  * Note only mobile models(ie. 965 Express Chipset Family)
 
Please note this page is more of an info dump, we won't be going to too great of detail on setup though we plan to expand this page more for it. Information is based off of [Clover's InjectIntel](https://github.com/CloverHackyColor/CloverBootloader/blob/2961827dce9c0ab26345c00fb5a9c581f96c0d6b/rEFIt_UEFI/Platform/gma.cpp)

## Prerequisites

Unfortunately GMA support is a bit more complicated with PCs, and because of this we need to force a 32-Bit kernelspace as the 64-Bit GMA drivers are known for weird GPU corruption and sleep issues. To do this:

* Ensure all your kexts are either 32-Bit or FAT
  * Run `lipo -archs` on the kext's binary to verify
  * Common kexts are hosted here: [Legacy-Kexts](https://github.com/khronokernel/Legacy-Kexts)
* Ensure you're booting a 32-Bit kernel
  * Set `Kernel -> Scheme -> KernelArch` to `i386`

Now we can proceed to setup:

* [GMA 950 Setup](#gma-950-setup)
  * Supports GMA 900, 950 and 3150
* [GMA X3100 Setup](#gma-x3100-setup)
  * Only supports mobile GMA X3100
* [Troubleshooting](#troubleshooting)
  * [Dell Laptops](#dell-laptops)
  * [Kernel Panic after 30 seconds](#kernel-panic-after-30-seconds)

## GMA 950 setup

* Supported OSes: 10.4-10.7

This section is mainly relevant for GMA 900 and 950 users, and partial support for the GMA 3150 series. Note that GMA 900 are only properly supported in 10.4 and 10.5

Within AppleIntelGMA950.kext's Info.plist, the following Device IDs are supported:

```md
# Values pulled from OS X 10.7.0
0x2582 - GMA 900 - Grantsdale - 945GM/GMS/940GML
0x2592 - GMA 900 - Alviso     - 945G            
0x2772 - GMA 950 - Lakeport   - 915GM/GMS/910GML
0x27A2 - GMA 950 - Calistoga  - 82915G/GV/910GL 
```

If your iGPU is from one of the above families, but the device ID is not present you can easily add a fake device-id:

```md
# GMA 950(Calistoga) Fake ID
config.plist:
|-DeviceProperties
	|- Add
		|- PciRoot(0x0)/Pci(0x2,0x0)
			|- device-id | Data | A2270000
```

For a full list of supported GPU families, see below:
 

::: details GMA Device families

Following pulled from Clover's GMA.c:

```md
# Grantsdale
0x2582 - GMA 900 - 945GM/GMS/940GML
0x258A - GMA 900 - E7221
0x2782 - GMA 900 - 82915G

# Alviso
0x2592 - GMA 900 - 915GM/GMS/910GML
0x2792 - GMA 900 - 915GM/GMS/910GML

# Lakeport
0x2772 - GMA 950 - 915GM/GMS/910GML
0x2776 - GMA 950 - 915GM/GMS/910GML

# Calistoga
0x27A2 - GMA 950 - 82915G/GV/910GL
0x27A6 - GMA 950 - 945GM/GMS/GME, 943/940GML
0x27AE - GMA 950 - 945GSE
```

:::


### Property injection

To ensure proper acceleration with OpenCore, head to your config.plist then `DeviceProperties -> Add`. Create a new child called `PciRoot(0x0)/Pci(0x2,0x0)` and we'll be adding our needed properties:


Desktops need very little properties, and most of the time can boot without any:

* Desktop:

```
| model         | String | GMA 950  | // Mainly cosmetic
| AAPL,HasPanel | Data   | 00000000 |
```

* Laptop:

```
| model                     | String | GMA 950  | // Mainly cosmetic
| AAPL,HasPanel             |  Data  | 01000000 | 
| AAPL01,BacklightIntensity |  Data  | 3F000008 |
| AAPL01,BootDisplay        |  Data  | 01000000 |
| AAPL01,DataJustify        |  Data  | 01000000 |
| AAPL01,Refresh            |  Data  | 3B000000 |
| AAPL01,DualLink           |  Data  | 00       | 

* Set AAPL01,DualLink to 01 if your internal display is higher than 1366x768
```

For a full list of what Clover injects, see below:

::: details Clover's InjectIntel Properties

The below properties is what Clover will inject for GMA 900/950 series iGPUs:

```
built-in                  = 01      
AAPL,HasPanel             = 01000000
AAPL01,BacklightIntensity = 3F000008
AAPL01,BootDisplay        = 01000000
AAPL01,DataJustify        = 01000000
AAPL01,Dither             = 00000000
AAPL01,Interlace          = 00000000
AAPL01,Inverter           = 00000000
AAPL01,InverterCurrent    = 00000000
AAPL01,LinkFormat         = 00000000
AAPL01,LinkType           = 00000000
AAPL01,Pipe               = 01000000
AAPL01,Refresh            = 3B000000
AAPL01,Stretch            = 00000000
AAPL01,T1                 = 00000000
AAPL01,T2                 = 01000000
AAPL01,T3                 = C8000000
AAPL01,T4                 = C8010000
AAPL01,T5                 = 01000000
AAPL01,T6                 = 00000000
AAPL01,T7                 = 90100000
```

:::


For GMA 3150 users, you'll also want to add this patch:

::: details GMA 3150 Patch

Under Kernel -> Patch, add the following:

```
Comment    = GMA 3150 Cursor corruption fix
Enabled    = True
Identifier = com.apple.driver.AppleIntelIntegratedFramebuffer
Find       = 8b550883bab0000000017e36890424e832bbffff
Replace    = b800000002909090909090909090eb0400000000
MaxKernel  = 11.99.99
MinKernel  = 8.00.00
```

Source: [GMA.c](https://github.com/CloverHackyColor/CloverBootloader/blob/2961827dce9c0ab26345c00fb5a9c581f96c0d6b/rEFIt_UEFI/Platform/gma.cpp#L1735L1739)


:::

## GMA X3100 Setup

* Supported OSes: 10.5-10.7

Within AppleIntelGMAX3100.kext's Info.plist, the following Device IDs are supported:

```md
# Values pulled from OS X 10.7.0
0x2a02 - GMA X3100 - Crestline - GM965/GL960
```

If your iGPU is from the Crestline family, however the device ID is not present you can easily add a fake device-id:

```md
# GMA X3100(Crestline) Fake ID
config.plist:
|-DeviceProperties
	|- Add
		|- PciRoot(0x0)/Pci(0x2,0x0)
			|- device-id | Data | 022A0000
```

For a full list of supported GPU families, see below:
 

::: details GMA Device families

Following pulled from Clover's GMA.c:

```md
# Calistoga
0x2A02 - GMA X3100 - GM965/GL960
0x2A03 - GMA X3100 - GM965/GL960
0x2A12 - GMA X3100 - GME965/GLE960
0x2A13 - GMA X3100 - GME965/GLE960
```

:::

### Property injection

To ensure proper acceleration with OpenCore, head to your config.plist then `DeviceProperties -> Add`. Create a new child called `PciRoot(0x0)/Pci(0x2,0x0)` and we'll be adding our needed properties:

X3100 need very little properties, and most of the time can boot without any:

```
| model                     | String | GMA X3100 | // Mainly cosmetic
| AAPL,HasPanel             |  Data  | 01000000  |
| AAPL,SelfRefreshSupported |  Data  | 01000000  | // Optional
| AAPL,aux-power-connected  |  Data  | 01000000  | // Optional
| AAPL,backlight-control    |  Data  | 01000008  | // Optional
| AAPL01,BacklightIntensity |  Data  | 38000008  |
| AAPL01,BootDisplay        |  Data  | 01000000  |
| AAPL01,DataJustify        |  Data  | 01000000  |
| AAPL01,Refresh            |  Data  | 3D000000  |
| AAPL01,DualLink           |  Data  | 00        | 

* Set AAPL01,DualLink to 01 if your internal display is higher than 1366x768
```

For a full list of what Clover injects, see below:

::: details Clover's InjectIntel Properties

The below properties is what Clover will inject for GMA 900/950 series iGPUs:

```
built-in                       = 01      
AAPL,HasPanel                  = 01000000
AAPL,SelfRefreshSupported      = 01000000
AAPL,aux-power-connected       = 01000000
AAPL,backlight-control         = 01000008
AAPL00,blackscreen-preferences = 00000008
AAPL01,BootDisplay             = 01000000
AAPL01,BacklightIntensity      = 38000008
AAPL01,blackscreen-preferences = 00000000
AAPL01,DataJustify             = 01000000
AAPL01,Dither                  = 00000000
AAPL01,Interlace               = 00000000
AAPL01,Inverter                = 00000000
AAPL01,InverterCurrent         = 08520000    
AAPL01,LinkFormat              = 00000000
AAPL01,LinkType                = 00000000
AAPL01,Pipe                    = 01000000
AAPL01,Refresh                 = 3D000000
AAPL01,Stretch                 = 00000000
AAPL01,T1                      = 00000000
AAPL01,T2                      = 01000000
AAPL01,T3                      = C8000000
AAPL01,T4                      = C8010000
AAPL01,T5                      = 01000000
AAPL01,T6                      = 00000000
AAPL01,T7                      = 90100000
```

:::

## Troubleshooting

### Dell laptops

An annoying issues with Dell laptops using GMA iGPUs is that they commonly get blackscreen during boot. This is due to the `DVI` device in ACPI, so we'll need to patch it to play nicely in macOS.

Example SSDT:

```c
DefinitionBlock ("", "SSDT", 2, "DRTNIA", "SsdtDvi", 0x00001000)
{
    External (_SB_.PCI0.SBRG.GFX0.DVI_, DeviceObj)
	
    Scope (\_SB.PCI0.SBRG.GFX0.DVI)
    {
        Method (_STA, 0, NotSerialized)  // _STA: Status
        {
            If (_OSI ("Darwin"))
            {
                Return (0)
            }
            Else
            {
                Return (0x0F)
            }
        }
    }
```

### Kernel Panic after 30 seconds

Another odd issues with 10.6 and older is that the PciRoot's _UID value **must** be Zero else the kernel panic will happen. Example of bad UID entry:


```c
Device (PCI0)  {
	Name (_HID, EisaId ("PNP0A08")) // Use PNP0A08 to find your PciRoot
	Name (_CID, EisaId ("PNP0A03"))
	Name (_ADR, One)                
	Name (_UID, Zero)               // Needs to be patched to Zero
```