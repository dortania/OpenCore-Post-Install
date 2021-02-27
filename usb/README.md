# Why should you USB map

So the process of USB mapping is defining your ports to macOS and telling it what kind they are, the reasons we want to do this are:

* macOS is very bad at guessing what kind of ports you have
* Some ports may run below their rated speed(3.1 ports running at 2.0)
* Some ports may outright not work
* Bluetooth not working
* Certain services like Handoff may not work correctly
* Sleep may break
* Broken Hot-Plug
* Even data corruption from `XhciPortLimit`

So now that you know why you should USB map, we can now talk about technical info of USB mapping. This is a section you cannot skip, otherwise all info below will seem like a very broken Russian translation written by a very drunk slav.

So with USB, we need to understand not all ports are the same and that some ports are actually hiding other ports within them! What I mean by this is the following:

* A USB 3.0 port is actually seen as 2 ports to macOS: a USB 2.0 **and** USB 3.0
* This is also how USB can keep its backwards compatibility, as all USB 3.0 devices **must** support USB 2.0

Now let's look at a diagram of a USB port to better understand this:

![Image from usb3.com](../images/post-install/usb-md/usb-3.png)

As you can see, the bottom 4 pins are dedicated to USB 2.0 and when the extra 5 pins above are recognized the device will switch to a USB 3.0 mode.

Now with the basic understanding out of the way, we now have to talk about the dreadful 15 port limit.

## macOS and the 15 Port Limit

Now let me take you back in time to the late 2015's and the release of OS X 10.11, El Capitan. This was an update that established much of what both blesses us and pains us in the community like System Integrity Protection and the 15 port limit.

What the 15 port limit is in macOS(then called OS X) is a strict limit of only 15 possible ports per controller, this becomes an issue when we look at the chipset ports included on your motherboard:

* Z170 and newer Chipsets: 26 Ports in total

And you may not even have 26 actual ports, but they're still declared in your ACPI tables causing issues as macOS can't tell the difference between a real port and one your firmware writers forgot to remove.

> But why did Apple choose 15 ports as the limit?

Well this gets into a fun subset of computers, the hexadecimal counting system! How this differs from our decimal system is that there are a total of 15 values with the last one being `0xF`. This meant it was just cleaner to stop at 15 than to say expand the port limit to 255(0xFF), and in Apple's eyes it made little sense to have anything above 15 ports as no Macs they supported went over this limit. And if a Mac Pro user added a USB expansion card, it would get it's own 15 port limit.

And now when we take into account the quirk `XhciPortLimit`, you can see *why* data corruption can happen. As we're pushing past the 0xF limit and going into someone else's space. So avoid this quirk when possible.

* Note: While the name `XhciPortLimit` may seem that it's limiting the number of XHCI ports, it's in-fact patching the XHCI Port Limit to a higher value.

> What about USB hubs?

USB Hubs attached to one of your USB controller's ports have a different kind of port limit. In total, a single USB port can be split into 127 ports. This includes USB hubs attached to USB hubs

## Now with the backstory done, let's head to [System Preparations](./system-preparation.md)
