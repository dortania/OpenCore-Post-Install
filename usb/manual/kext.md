## Option 2: Creating our kext

Its the time you've all been waiting for, we finally get to create our USB map!

First off, we'll want to grab a sample USB map kext:

* [Sample-USB-Map.kext](https://github.com/dortania/OpenCore-Post-Install/blob/master/extra-files/Sample-USB-Map.kext.zip)

Next right click the .kext, and select `Show Package Contents`. then drill down to the info.plist:

| Show Contents | info.plist |
| :--- | :--- |
| ![](../../images/post-install/manual-md/show-contents.png) | ![](../../images/post-install/manual-md/info-plist.png) |

Now lets open ProperTree and look at this info.plist:

![](../../images/post-install/manual-md/info-plist-open.png)

Here we see a few sections, under `IOKitPersonalities`:

* RP05 - PXSX(1)
* RP07 - PXSX(2)
* XHCI - XHCI

Each entry here represents a USB controller, specifically the map for each controller. The names of the entry don't matter much however, it's more for book keeping so you know which entry to has which USB map.

Next lets head into the `RP05 - PXSX(1)` entry:

![](../../images/post-install/manual-md/rp05-entry.png)

Here we see a few more important properties:

| Property | Comment |
| :--- | :--- |
| IOPathMatch | The device macOS will choose to attach the map to |
| IOProviderClass | The USB driver macOS will choose to attach |
| model | The SMBIOS the USB map attaches too|
| IOProviderMergeProperties | The dictionary holding the actual port map |

### Determining the properties

Determining the value for each property is actually quite straight forward:

* [IOPathMatch](#iopathmatch)
* [IOProviderClass](#ioproviderclass)
* [model](#model)
* [IOProviderMergeProperties](#ioprovidermergeproperties)

#### IOPathMatch

Finding IOPathMatch is super easy, first find the USB controller you want to map and then select the Root HUB(so the PXSX child with the same name as the parent, don't worry it's less confusing when you look at the image):

![](../../images/post-install/manual-md/iopath-match.png)

Now with the PXSX entry selected, simply copy(Cmd+C) and paste it into our info.plist. Your property should look similar to the below:

```
IOService:/AppleACPIPlatformExpert/PC00@0/AppleACPIPCI/RP05@1C,4/IOPP/PXSX@0/PXSX@01000000
```

**Note**: Each USB Controller will have a unique IOPathMatch value, keep this in mind if you have multiple controllers of the same name. This Asus X299 board has 2 PXSX USB controllers, so each new USB map dictionary will have a unique entry for IOPathMatch.

#### IOProviderClass

Finding IOProviderClass is also easy, select the Root-hub once again and look for the CFBundleIdentifier value:

| IOReg | info.plist |
| :--- | :--- |
| ![](../../images/post-install/manual-md/ioproviderclass.png) | ![](../../images/post-install/manual-md/iorpoviderclass-plist.png) |

Now we can't take that value 1-1, instead we need to trim it to the Kext's short name being `AppleUSBXHCIPCI`(So we removed `com.apple.driver.usb.`)

#### model

If you've forgotten what SMBIOS you're using, you can simply check the top level device in IOReg:

| IOReg | info.plist |
| :--- | :--- |
| ![](../../images/post-install/manual-md/smbios.png) | ![](../../images/post-install/manual-md/smbios-plist.png) |

### IOProviderMergeProperties

Now lets open the IOProviderMergeProperties dictionary:

![](../../images/post-install/manual-md/ioprovidermerge.png)

Here we have a lot of data to work through:

| Property | Comment |
| :--- | :--- |
| name | The name of the USB port's dictionary |
| port-count | This is the largest port value you're injecting |
| UsbConnector | This is the type of USB port as mentioned in the ACPI 9.14 section |
| port | The physical location of your USB port in ACPI |
| Comment | An optional entry to help you keep track of all your ports |

And a reminder of all possible port types:

| Type | Info | Comments |
| :--- | :--- | :--- |
| 0 | USB 2.0 Type-A connector | This is what macOS will default all ports to when no map is present |
| 3 | USB 3.0 Type-A connector | 3.0, 3.1 and 3.2 ports share the same Type |
| 8 | Type C connector - USB 2.0-only | Mainly seen in phones
| 9 | Type C connector - USB 2.0 and USB 3.0 with Switch | Flipping the device **does not** change the ACPI port |
| 10 | Type C connector - USB 2.0 and USB 3.0 without Switch | Flipping the device **does** change the ACPI port. generally seen on 3.1/2 motherboard headers |
| 255 | Proprietary connector | For Internal USB ports like Bluetooth |

It should be coming full circle now, as you can see how our previous work with mapping out our ports works.

#### Name

The name property is actually the name of the USB port's dictionary, and is used solely for house keeping. Keep in mind every USB port you want to use needs to have its own unique USB port dictionary.

The name itself holds no value besides showing up in IOReg and so this can be whatever you like. To keep this sane, we use the name already given by our ACPI tables(in this case HS01) but the name can be any 4 character entry. However do not go over this 4 char limit, as unintended side effects can happen.

* Note: Those with AppleUSB20XHCIPort or AppleUSB30XHCIPort names for USB ports, you should choose a name easy to identify. On Intel, this is HSxx for 2.0 personalities and SSxx for 3.0 personalities

![](../../images/post-install/manual-md/name.png)

#### port

To find the `port` value, simply select your USB port in IOReg and look for the `port` entry:

| IOReg | info.plist |
| :--- | :--- |
| ![](../../images/post-install/manual-md/port.png) | ![](../../images/post-install/manual-md/port-plist.png) |

From here we get `<03 00 00 00>`, you can simply remove any spaces and add it to your USB map

#### port-count

The final value remaining, look back at your USB map and see which `port` entry is the largest:

![](../../images/post-install/manual-md/port-count.png)

Here we see the largest in PXSX(1) is `<04000000>`, do keep in mind that `port` uses hexadecimal if you get any letters in your USB map.

### Continuing on

Now that we've gone over how to map your USB ports for a specific controller, you should have enough understanding to map more controllers. The sample USB-Map.kext I provided has 3 USB controllers listed in it(PXSX-1, PXSX-2 and XHCI). Remember to edit accordingly and to remove any unnecessary maps.

## Cleaning up

Once your saved your USB map's info.plist, remember to add the kext to both your EFI/OC/Kexts and under you config.plist's Kernel -> Add(ProperTree's snapshot can do this for you)

Next, remove/disable:

* USBInjectAll.kext(if you're using it)
  * Reason for this is USBInjectAll actually breaks how Apple builds port maps. So while it's great for initial port mapping, it can break you final USB map
* Kernel -> Quirks -> XhciPortLimit -> False
  * Now that we're finally under the 15 port limit, we no longer need this hacky fix

Then reboot, and check IOReg one last time:

![](../../images/post-install/manual-md/finished.png)

Voila! As you can see, our USB map applied successfully!

The main properties to verify are:

* Correct UsbConnector property on your USB ports
* Comment applied(if injected)
* Unused ports were removed