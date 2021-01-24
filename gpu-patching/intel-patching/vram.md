# Patching VRAM

This section is mainly relevant for users who cannot unlock their BIOS to increase the allocated VRAM for their iGPU which results in a kernel panic in macOS. To work around this, we'll first want to identify the minimum amount of VRAM required for the framebuffer and then patch it to require less.

For this example, let's take a Haswell Lake Framebuffer that's commonly used on desktop Haswell iGPUs: `0x0D220003`(`0300220D` when hex swapped)

Now let's take a look at the corresponding information in [WhateverGreen's manual](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md)(note you'll need to click "Spoiler: Azul connectors")

```
ID: 0D220003, STOLEN: 32 MB, FBMEM: 19 MB, VRAM: 1536 MB, Flags: 0x00000402
TOTAL STOLEN: 52 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 116 MB, MAX OVERALL: 117 MB (123219968 bytes)
Camellia: CamelliaDisabled (0), Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000087 - ConnectorDP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000087 - ConnectorDP
[3] busId: 0x06, pipe: 8, type: 0x00000400, flags: 0x00000011 - ConnectorDP
01050900 00040000 87000000
02040A00 00040000 87000000
03060800 00040000 11000000
```

Here what matters is the first 2 lines:

```
ID: 0D220003, STOLEN: 32 MB, FBMEM: 19 MB, VRAM: 1536 MB, Flags: 0x00000402
TOTAL STOLEN: 52 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 116 MB, MAX OVERALL: 117 MB (123219968 bytes)
```

Here the main entries we care about:

| Entry | Value | Comment |
| :--- | :--- | :--- |
| STOLEN | 32MB | Memory reserved for the iGPU |
| FBMEM | 19MB | Memory reserved for the framebuffer |
| TOTAL CURSOR | 1 MB | Memory reserved for cursor |
| TOTAL STOLEN | 52 MB | Combination of the above |

Now let's say for example your motherboard only allocates 32MB for the iGPU, this will be too little for what the framebuffer expects and so will most likely kernel panic when it tries to write into an area of memory that does not exist.

That's where WhateverGreen's patching capabilities come in, here we're able to set the exact amount of iGPU memory the framebuffer expects with the following properties:

| Value | Comment |
| :--- | :--- |
| framebuffer-patch-enable | This enables WhateverGreen's patching capabilities |
| framebuffer-stolenmem | This sets the value used by `STOLEN` entry |
| framebuffer-fbmem | This sets the value used by `FBMEM` entry |

## Creating our patch

So to lower this VRAM requirement, we'll want to set `STOLEN` to 19MB and `FBMEM` to 9MB. This will get us underneath the 32MB limit.

To do this, we run the following commands to covert 9MB:

```md
# Convert 9MB Megabytes to Bytes
echo '9 * 1024 * 1024' | bc
 9437184

# Convert from decimal to hexadecimal
echo 'obase=16; ibase=10; 9437184' | bc
 900000

# Hexswap so it can be injected correctly
# ie. swap in pairs
900000 -> 90 00 00 -> 00 00 90

# Pad the value to 4 bytes with 00 at the end
00 00 90 00
```

And when we do this for both value, we get:

* 19MB = `00 00 30 01`
* 9MB = `00 00 90 00`

And when we punch it into our WhateverGreen properties:

| Key | Type | Value
| :--- | :--- | :--- |
| framebuffer-patch-enable | Data | 01000000 |
| framebuffer-stolenmem | Data | 00003001 |
| framebuffer-fbmem | Data | 00009000 |

* For `patch-enable`, 01000000 simply refers to being enabled

## Applying our patch

Now with our patch made, head into your config.plist then under `DeviceProperties -> Add -> PciRoot(0x0)/Pci(0x2,0x0)` and add the properties:

![](../../images/gpu-patching/vram.png)
