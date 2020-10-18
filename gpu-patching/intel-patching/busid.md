# Patching Bus IDs

This section is mainly relevant for those who cannot use certain display outputs regardless of the connector-type or SMBIOS patch, as Apple has hardcoded the output BusIDs in a way that doesn't match your hardware. To resolve, we'll be manually patching these bus IDs into supporting our hardware.

This page will be a bit more technical as we've assumed you've read through the previous pages and have a decent grasp of WhateverGreen.

## Parsing the framebuffer

To start, lets assume we're using a Z390 board with a UHD 630. This system is iGPU-only in macOS and has issues with using certain display-outs, and is using the `0x3E9B0007` framebuffer.

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


Now lets parse it down to the BudID information, as this is what we will be patching:

```
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - DP
[3] busId: 0x06, pipe: 8, type: 0x00000400, flags: 0x000003C7 - DP
01050900 00040000 C7030000
02040A00 00040000 C7030000
03060800 00040000 C7030000
```


Here we see that this framebuffer personality has 3 Bus IDs listed, lets try to break them down to be a bit more understandable. Lets take entry 1:

```
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
01050900 00040000 C7030000
```

| Bit | Name | Value |
| :--- | :--- | :--- |
| Bit 1 | Port | 01 |
| Bit 2 | Bus ID | 05 |
| Bit 3-4 | Pipe Number | 0900 |
| Bit 5-8 | Connector Type | 00040000 |
| Bit 9-12 | Flags | C7030000 |

Things to keep in mind:

* BusID is a unique value and cannot be used by multiple entries
* Connector-type values are the same as discussed in the [Connector-type patching page](./connector.md)

## Mapping the video ports

Here we have 2 sections:

* [Mapping within macOS]()
  * You can boot macOS and use at least 1 display
* [Mapping without macOS]()
  * Blackscreen on all displays
  
### Mapping within macOS


For this example, lets discuss a common patch for laptop Kaby lake users









## In-depth patching





ID: 01660004, STOLEN: 32 MB, FBMEM: 16 MB, VRAM: 1536 MB, Flags: 0x00000000
TOTAL STOLEN: 16 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 16 MB, MAX OVERALL: 17 MB (18354176 bytes)
Camellia: CamelliaUnsupported (255), Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 1, PipeCount: 3, PortCount: 1, FBMemoryCount: 1
[5] busId: 0x03, pipe: 0, type: 0x00000002, flags: 0x00000230 - ConnectorLVDS
05030000 02000000 30020000



