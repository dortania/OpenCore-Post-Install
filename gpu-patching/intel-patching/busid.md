# Patching Bus IDs

This section is mainly relevant for those who cannot use certain display outputs regardless of the connector-type or SMBIOS patch, as Apple has hardcoded the output BusIDs in a way that doesn't match your hardware. To resolve, we'll be manually patching these bus IDs into supporting our hardware.

This page will be a bit more technical as we've assumed you've read through the previous pages and have a decent grasp of WhateverGreen.

* [Patching the display type](./connector.md)
* [Patching the VRAM requirement of macOS](./vram.md)

## Parsing the framebuffer

To start, let's assume we're using a Z390 board with a UHD 630. This system is iGPU-only in macOS and has issues with using certain display-outs, and is using the `0x3E9B0007` framebuffer.

When we look at this framebuffer from [WhateverGreen's manual](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md), we see the following:

```
ID: 3E9B0007, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00801302
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel UHD Graphics 630
Model Name(s):
Camelia: Disabled
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - DP
[3] busId: 0x06, pipe: 8, type: 0x00000400, flags: 0x000003C7 - DP
01050900 00040000 C7030000
02040A00 00040000 C7030000
03060800 00040000 C7030000
```

Now let's parse it down to the BusID information, as this is what we will be patching:

```
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - DP
[3] busId: 0x06, pipe: 8, type: 0x00000400, flags: 0x000003C7 - DP
01050900 00040000 C7030000
02040A00 00040000 C7030000
03060800 00040000 C7030000
```

Here we see that this framebuffer personality has 3 Bus IDs listed, let's try to break them down to be a bit more understandable. Let's take entry 1:

```
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
01050900 00040000 C7030000
```

| Bit | Name | Value |
| :--- | :--- | :--- |
| Bit 1 | Port | `01` |
| Bit 2 | Bus ID | `05` |
| Bit 3-4 | Pipe Number | `0900` |
| Bit 5-8 | Connector Type | `00040000` |
| Bit 9-12 | Flags | `C7030000` |

Things to keep in mind:

* BusID is a unique value and cannot be used by multiple entries
* Connector-type values are the same as discussed in the [Connector-type patching page](./connector.md)
* Only certain BusID's are permitted based on the connector type
  * For DisplayPort `0x02`,`0x04`,`0x05` and `0x06` are allowed and should work on any motherboard. These values apply to VGA as well
  * For HDMI `0x01`,`0x02`,`0x04` and `0x06` are allowed, however some motherboards may only accept one or two of these values. These value apply to DVI as well

## Mapping the video ports

Here we have 2 sections:

* [Mapping within macOS](#mapping-withinb-macos)
  * You can boot macOS and use at least 1 display
* [Mapping without macOS](#mapping-without-macos)
  * Blackscreen on all displays
  
### Mapping within macOS

Mapping videos in macOS is fairly easy, as we can assume that one of our ports is mapped correctly in the framebuffer.

For this example, we'll explain the common [HDMI-hotplug fix for Kaby lake users](https://dortania.github.io/OpenCore-Install-Guide/config-laptop.plist/kaby-lake.html#deviceproperties). To start, lets look at the `0x591B0000` framebuffer:

```
ID: 591B0000, STOLEN: 38 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x0000130B
TOTAL STOLEN: 39 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 136 MB, MAX OVERALL: 137 MB (144191488 bytes)
Model name: Intel HD Graphics KBL CRB
Camellia: CamelliaDisabled (0), Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - ConnectorLVDS
[2] busId: 0x04, pipe: 10, type: 0x00000800, flags: 0x00000187 - ConnectorHDMI
[3] busId: 0x06, pipe: 10, type: 0x00000400, flags: 0x00000187 - ConnectorDP
00000800 02000000 98000000
02040A00 00080000 87010000
03060A00 00040000 87010000
```

Here we see that entry 2 is the HDMI port however on a real Kaby lake laptop it's very common for hot plug to kernel panic the machine. This is due to the bus ID and port not aligning perfectly with the hardware.

To resolve, we'll want to patch it to something more appropriate(ie. `0204` to `0105`, these have been tested to work properly)

There are 2 ways to patch:

* [Replace the entire entry](#replace-the-entire-entry)
* [Replace sections of the entry](#replace-sectons-of-the-entry)

#### Replace the entire entry

To replace the entire entry, we'll first want to locate our entry and ensure it's enumerated correctly. This is because Apple's has entries starting at 0 and progresses through that:

* con0
* con1
* con2

So since entry 2 is the second in the list, we'll want to use con1:

* framebuffer-con2-enable

Next lets make the patch, we know that port needs to be patched to `01` and BusID changed to `05`:

* <code>**0105**0A00 00080000 87010000</code>

And finally, we're given the following patches:

```
framebuffer-patch-enable | Data | `01000000`
framebuffer-con2-enable  | Data | `01000000`
framebuffer-con2-alldata | Data | `01050A00 00080000 87010000`
```

#### Replace sections of the entry

To replace sections of the entry, we'll first want to locate our entry and ensure it's enumerated correctly. This is because Apple's has entries starting at 0 and progresses through that:

* `con0`
* `con1`
* `con2`

So since entry 2 is the second in the list, we'll want to use con1:

* `framebuffer-con1-enable`

Next lets make the patch, we know that port needs to be patched to 01 and BusID changed to 05:

* framebuffer-con2-index = `01`
* framebuffer-con2-busid = `05`

And finally, we get these patches:

```
framebuffer-patch-enable | Data | `01000000`
framebuffer-con2-enable  | Data | `01000000`
framebuffer-con2-index   | Data | `01`
framebuffer-con2-busid   | Data | `05`
```

### Mapping without macOS

Mapping your display outs is fairly simple, *however* is quite time consuming as you need to try every BusID value until you get an output.

For this example, we'll use the 0x3E9B0007 framebuffer again.

```
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - DP
[3] busId: 0x06, pipe: 8, type: 0x00000400, flags: 0x000003C7 - DP
01050900 00040000 C7030000
02040A00 00040000 C7030000
03060800 00040000 C7030000
```

To start, we'll be trying to go through entry 1's BusIDs in hope we find working value.

##### 1. Here plug in your HDMI display

##### 2. Set Port 1 to the HDMI connector type

* <code>01xx0900 **00080000** C7030000</code>

::: details Supported Connector Types

Common connector types supported in macOS

```
<02 00 00 00>        LVDS and eDP      - Laptop displays
<10 00 00 00>        VGA               - Unsupported in 10.8 and newer
<00 04 00 00>        DisplayPort       - USB-C display-out are DP internally
<01 00 00 00>        DUMMY             - Used when there is no physical port
<00 08 00 00>        HDMI
<80 00 00 00>        S-Video
<04 00 00 00>        DVI (Dual Link)
<00 02 00 00>        DVI (Single Link)
```

Reminder that VGA on Skylake and newer are actually DisplayPort internally, so use that connector type instead.

:::

##### 3. Disable ports 2 and 3 with busid=00

* <code>02**00**0A00 00040000 C7030000</code>
* <code>03**00**0800 00040000 C7030000</code>

##### 4. Walk through busids for Port 1 if the previous didn't work. The maximum busid on most platforms generally 0x06

* <code>01**01**0900 00080000 C7030000</code>
* <code>01**02**0900 00080000 C7030000</code>
* <code>01**03**0900 00080000 C7030000</code>
* etc

If you still get no output, set port 1's busid to 00 and start going through busids for port 2 and so on

* port 1 = <code>01000900 00040000 C7030000</code>
* port 2 = <code>02**xx**0A00 00080000 C7030000</code>
* port 3 = <code>03000800 00040000 C7030000</code>

#### Adding to your config.plist

You'll now want to add the following patches to `DeviceProperteies -> Add -> PciRoot(0x0)/Pci(0x2,0x0)`:

```
framebuffer-patch-enable | Data | `01000000`
framebuffer-con0-enable  | Data | `01000000`
framebuffer-con1-enable  | Data | `01000000`
framebuffer-con2-enable  | Data | `01000000`
framebuffer-con0-alldata | Data | port 1 (ie. `01010900 00080000 C7030000`)
framebuffer-con1-alldata | Data | port 2 (ie. `02000A00 00040000 C7030000`)
framebuffer-con2-alldata | Data | port 3 (ie. `03000800 00040000 C7030000`)
```

Note that:

* port 1 would be labeled as `con0`
* port 1's BusID is set to `01`
* port 2 and 3's BusID are set to `00`, disabling them

When done, you should get something similar:

![](../../images/gpu-patching/path-done.png)

And as mentioned before, if this combo doesn't work, increment port 1's BusID and if that doesn't work disable port 1's busID and try port 2 and so forth.


