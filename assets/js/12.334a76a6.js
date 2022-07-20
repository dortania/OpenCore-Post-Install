(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{355:function(e,t,o){e.exports=o.p+"assets/img/usb-erase.1421d457.png"},356:function(e,t,o){e.exports=o.p+"assets/img/usb-folder.03d89774.png"},357:function(e,t,o){e.exports=o.p+"assets/img/usb-folder-highlight.319b4d56.png"},358:function(e,t,o){e.exports=o.p+"assets/img/oc-config-compare.935f00cb.png"},359:function(e,t,o){e.exports=o.p+"assets/img/ocvalidate.7ccba5d5.png"},458:function(e,t,o){"use strict";o.r(t);var r=o(10),a=Object(r.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"updating-opencore-and-macos"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#updating-opencore-and-macos"}},[e._v("#")]),e._v(" Updating OpenCore and macOS")]),e._v(" "),t("h2",{attrs:{id:"updating-opencore"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#updating-opencore"}},[e._v("#")]),e._v(" Updating OpenCore")]),e._v(" "),t("p",[e._v("So the main things to note with updating OpenCore:")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("Releases"),t("OutboundLink")],1),e._v(" happen the first Monday of every month")]),e._v(" "),t("li",[e._v("The "),t("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Differences/Differences.pdf",target:"_blank",rel:"noopener noreferrer"}},[e._v("Differences.pdf"),t("OutboundLink")],1),e._v(" will tell you all the things added and removed from this version of OpenCore compared to the previous release")]),e._v(" "),t("li",[e._v("The OpenCore Install Guide will have a note in the "),t("a",{attrs:{href:"https://dortania.github.io/OpenCore-Install-Guide/",target:"_blank",rel:"noopener noreferrer"}},[e._v("header"),t("OutboundLink")],1),e._v(" about what release version it supports")])]),e._v(" "),t("blockquote",[t("p",[e._v("So how do I update?")])]),e._v(" "),t("p",[e._v("So the process goes as follows:")]),e._v(" "),t("h3",{attrs:{id:"_1-download-the-latest-release-of-opencore"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-download-the-latest-release-of-opencore"}},[e._v("#")]),e._v(" 1. "),t("strong",[e._v("Download the latest release of OpenCore")])]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("OpenCorePkg"),t("OutboundLink")],1)])]),e._v(" "),t("h3",{attrs:{id:"_2-mount-your-efi"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-mount-your-efi"}},[e._v("#")]),e._v(" 2. "),t("strong",[e._v("Mount your EFI")])]),e._v(" "),t("ul",[t("li",[t("p",[e._v("So first, lets mount your hard drive's EFI and make a copy somewhere safe with "),t("a",{attrs:{href:"https://github.com/corpnewt/MountEFI",target:"_blank",rel:"noopener noreferrer"}},[e._v("MountEFI"),t("OutboundLink")],1),e._v(". We won't be updating the drive's EFI at first, instead we'll be grabbing a spare USB to be our crash dummy. This allows us to keep a working copy of OpenCore in case our update goes south")])]),e._v(" "),t("li",[t("p",[e._v("For the USB, it must be formatted as GUID. Reason for this is that GUID will automatically create an EFI partition, though this will be hidden by default so you'll need to mount it with MountEFI.")])])]),e._v(" "),t("p",[t("img",{attrs:{src:o(355),alt:""}})]),e._v(" "),t("ul",[t("li",[e._v("Now you can place your OpenCore EFI on the USB")])]),e._v(" "),t("p",[t("img",{attrs:{src:o(356),alt:""}})]),e._v(" "),t("h3",{attrs:{id:"_3-replace-the-opencore-files-with-the-ones-you-just-downloaded"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-replace-the-opencore-files-with-the-ones-you-just-downloaded"}},[e._v("#")]),e._v(" 3. "),t("strong",[e._v("Replace the OpenCore files with the ones you just downloaded")])]),e._v(" "),t("ul",[t("li",[t("p",[e._v("The important ones to update:")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("EFI/BOOT/BOOTx64.efi")])]),e._v(" "),t("li",[t("code",[e._v("EFI/OC/OpenCore.efi")])]),e._v(" "),t("li",[t("code",[e._v("EFI/OC/Drivers/OpenRuntime.efi")]),e._v("("),t("strong",[e._v("Don't forget this one, OpenCore will not boot with mismatched versions")]),e._v(")")])])]),e._v(" "),t("li",[t("p",[e._v("You can also update other drivers you have if present, these are just the ones that "),t("strong",[e._v("must")]),e._v(" be updated in order to boot correctly")])])]),e._v(" "),t("p",[t("img",{attrs:{src:o(357),alt:""}})]),e._v(" "),t("h3",{attrs:{id:"_4-compare-your-config-plist-to-that-of-the-new-sample-plist"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-compare-your-config-plist-to-that-of-the-new-sample-plist"}},[e._v("#")]),e._v(" 4. "),t("strong",[e._v("Compare your config.plist to that of the new Sample.plist")])]),e._v(" "),t("ul",[t("li",[t("p",[e._v("With this, there's a couple ways to do this:")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://github.com/corpnewt/OCConfigCompare",target:"_blank",rel:"noopener noreferrer"}},[e._v("OCConfigCompare"),t("OutboundLink")],1),e._v(" to compare between the sample.plist and your config.plist")]),e._v(" "),t("li",[t("code",[e._v("diff (file input 1) (file input 2)")]),e._v(" in terminal")]),e._v(" "),t("li",[t("a",{attrs:{href:"https://github.com/yousseb/meld/releases/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Meld Merge"),t("OutboundLink")],1),e._v(", "),t("a",{attrs:{href:"https://winmerge.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("WinMerge"),t("OutboundLink")],1),e._v(", or your other favorite comparison software")]),e._v(" "),t("li",[e._v("Make a new config based off reading the updated OpenCore Install Guide")])])])]),e._v(" "),t("p",[t("img",{attrs:{src:o(358),alt:""}})]),e._v(" "),t("ul",[t("li",[e._v("Once you've made the adjustments, to make sure that you config is compliant with the newest release of OpenCore, you can use the OpenCore Utility ocvalidate: this tool will help ensure your config.plist is matching the OpenCore specification of the matching build.\n"),t("ul",[t("li",[e._v("Please note, that "),t("code",[e._v("ocvalidate")]),e._v(" must match the used OpenCore release and may not be able to detect all configuration flaws present in the file. We recommend to double check your setting with the OpenCore Guide on what to set everything to, otherwise read the "),t("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Differences/Differences.pdf",target:"_blank",rel:"noopener noreferrer"}},[e._v("Differences.pdf"),t("OutboundLink")],1),e._v("  for more in-depth documentation on changes.")]),e._v(" "),t("li",[e._v("To run "),t("code",[e._v("ocvalidate")]),e._v(", "),t("code",[e._v("cd")]),e._v(" into OpenCore's "),t("code",[e._v("Utilties/ocvalidate/")]),e._v(" and run "),t("code",[e._v("./ocvalidate <insert_config.plist>")]),e._v(". Note you may need to run "),t("code",[e._v("chmod +x ocvalidate")]),e._v(" for it to execute.")]),e._v(" "),t("li",[e._v("In addition, update ProperTree and perform an OC Snapshot (Ctrl/Cmd+R) to ensure that the config entries for your SSDTs, drivers, kexts, etc. are compliant with the format OpenCore expects.")])])])]),e._v(" "),t("p",[t("img",{attrs:{src:o(359),alt:""}})]),e._v(" "),t("h3",{attrs:{id:"_5-boot"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-boot"}},[e._v("#")]),e._v(" 5. "),t("strong",[e._v("Boot!")])]),e._v(" "),t("ul",[t("li",[e._v("Once everything's working with the dummy USB, you can mount the EFI and move it over to the hard drive's EFI partition. Remember to keep a copy of your old EFI in cases where OpenCore is acting funny down the road")])]),e._v(" "),t("h2",{attrs:{id:"updating-kexts"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#updating-kexts"}},[e._v("#")]),e._v(" Updating Kexts")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("Updating Kexts is a similar process to updating OpenCore, make a copy of everything and update on a dummy USB in case there's issues")])]),e._v(" "),t("li",[t("p",[e._v("The easiest way to update your kexts is via 2 tools:")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://github.com/corpnewt/Lilu-and-Friends",target:"_blank",rel:"noopener noreferrer"}},[e._v("Lilu and Friends"),t("OutboundLink")],1),e._v(" to download and compile the kexts")]),e._v(" "),t("li",[t("a",{attrs:{href:"https://github.com/corpnewt/KextExtractor",target:"_blank",rel:"noopener noreferrer"}},[e._v("Kext Extractor"),t("OutboundLink")],1),e._v(" to merge them into your EFI")])])])]),e._v(" "),t("h2",{attrs:{id:"updating-macos"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#updating-macos"}},[e._v("#")]),e._v(" Updating macOS")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("So this is probably one of the most challenging parts, maintaining your system through OS updates. The main things to keep in mind:")]),e._v(" "),t("ul",[t("li",[e._v("With OS updates, make sure everything has been updated and you have some form of recovery like TimeMachine or an older macOS installer with a known good EFI on it")]),e._v(" "),t("li",[e._v("Do a bit of google-fu to see if others are having issues with the newest update")])])]),e._v(" "),t("li",[t("p",[e._v("I've also provided a bit more of a detailed map of what's changed in macOS versions, see below:")])])]),e._v(" "),t("p",[t("strong",[e._v("macOS Catalina")]),e._v(":")]),e._v(" "),t("ul",[t("li",[e._v("10.15.0\n"),t("ul",[t("li",[t("a",{attrs:{href:"https://dortania.github.io/Getting-Started-With-ACPI/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Requires proper EC"),t("OutboundLink")],1)]),e._v(" "),t("li",[e._v("Dual socket and most AMD CPUs need "),t("a",{attrs:{href:"https://github.com/acidanthera/bugtracker/files/3703498/AppleMCEReporterDisabler.kext.zip",target:"_blank",rel:"noopener noreferrer"}},[e._v("AppleMCEReporterDisabler.kext"),t("OutboundLink")],1)]),e._v(" "),t("li",[e._v("MacPro5,1 support has been dropped")])])]),e._v(" "),t("li",[e._v("10.15.1\n"),t("ul",[t("li",[e._v("Requires WhateverGreen 1.3.4+")]),e._v(" "),t("li",[e._v("Broke DRM for many GPUs(see "),t("a",{attrs:{href:"https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.Chart.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("DRM Chart"),t("OutboundLink")],1),e._v(")")]),e._v(" "),t("li",[e._v("Requires all previous fixes")])])]),e._v(" "),t("li",[e._v("10.15.2\n"),t("ul",[t("li",[e._v("Fixes Navi support in the installer")]),e._v(" "),t("li",[e._v("Requires all previous fixes")])])]),e._v(" "),t("li",[e._v("10.15.3\n"),t("ul",[t("li",[e._v("No change")]),e._v(" "),t("li",[e._v("Requires all previous fixes")])])]),e._v(" "),t("li",[e._v("10.15.4\n"),t("ul",[t("li",[t("a",{attrs:{href:"https://github.com/AMD-OSX/AMD_Vanilla",target:"_blank",rel:"noopener noreferrer"}},[e._v("AMD CPU users need to update "),t("code",[e._v("cpuid_set_cpufamily")]),e._v(" patch"),t("OutboundLink")],1)]),e._v(" "),t("li",[e._v("Fixes DRM on many Ellesmere based Polaris GPUs")]),e._v(" "),t("li",[e._v("Requires all previous fixes(excluding "),t("code",[e._v("shikigva=80")]),e._v(" for Polaris DRM for most users)")])])]),e._v(" "),t("li",[e._v("10.15.5\n"),t("ul",[t("li",[e._v("UHD 630's framebuffer broke for many, if you receive black screen you may need to swap from "),t("code",[e._v("07009B3E")]),e._v(" to "),t("code",[e._v("00009B3E")])]),e._v(" "),t("li",[e._v("Comet Lake S no longer requires a CPU ID spoof")])])]),e._v(" "),t("li",[e._v("10.15.6\n"),t("ul",[t("li",[e._v("No change")]),e._v(" "),t("li",[e._v("Requires all previous fixes for 10.15.5")])])]),e._v(" "),t("li",[e._v("10.15.7\n"),t("ul",[t("li",[e._v("No change")]),e._v(" "),t("li",[e._v("Requires all previous fixes for 10.15.5")])])])]),e._v(" "),t("p",[t("strong",[e._v("macOS Big Sur")]),e._v(":")]),e._v(" "),t("ul",[t("li",[e._v("11.0.1\n"),t("ul",[t("li",[e._v("See here: "),t("a",{attrs:{href:"https://dortania.github.io/OpenCore-Install-Guide/extras/big-sur/",target:"_blank",rel:"noopener noreferrer"}},[e._v("OpenCore and macOS 11: Big Sur"),t("OutboundLink")],1)])])])]),e._v(" "),t("p",[t("strong",[e._v("macOS Monterey")]),e._v(":")]),e._v(" "),t("ul",[t("li",[e._v("12.0.1\n"),t("ul",[t("li",[e._v("See here: "),t("a",{attrs:{href:"https://dortania.github.io/OpenCore-Install-Guide/extras/monterey.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("OpenCore and macOS 12: Monterey"),t("OutboundLink")],1)])])])])])}),[],!1,null,null,null);t.default=a.exports}}]);