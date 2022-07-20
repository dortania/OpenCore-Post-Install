(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{293:function(e,t,o){e.exports=o.p+"assets/img/nvram.c97ef040.png"},440:function(e,t,o){"use strict";o.r(t);var a=o(10),n=Object(a.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"emulated-nvram"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#emulated-nvram"}},[e._v("#")]),e._v(" Emulated NVRAM")]),e._v(" "),t("p",[e._v("So this section is for those who don't have native NVRAM, the most common hardware to have incompatible native NVRAM with macOS are X99 and some X299 series chipsets:")]),e._v(" "),t("ul",[t("li",[e._v("X99")]),e._v(" "),t("li",[e._v("X299")])]),e._v(" "),t("p",[e._v("For B360, B365, H310, H370, Z390 users, make sure you have "),t("a",{attrs:{href:"https://dortania.github.io/Getting-Started-With-ACPI/",target:"_blank",rel:"noopener noreferrer"}},[e._v("SSDT-PMC"),t("OutboundLink")],1),e._v(" both under EFI/OC/ACPI and config.plist -> ACPI -> Add. For more info on making and compiling SSDTs, please see "),t("a",{attrs:{href:"https://dortania.github.io/Getting-Started-With-ACPI/",target:"_blank",rel:"noopener noreferrer"}},[t("strong",[e._v("Getting started with ACPI")]),t("OutboundLink")],1)]),e._v(" "),t("p",[t("strong",[e._v("Note")]),e._v(": 10th gen CPUs do not need this SSDT")]),e._v(" "),t("h2",{attrs:{id:"cleaning-out-the-clover-gunk"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#cleaning-out-the-clover-gunk"}},[e._v("#")]),e._v(" Cleaning out the Clover gunk")]),e._v(" "),t("p",[e._v("So some may not have noticed but Clover may have installed RC scripts into macOS for proper NVRAM emulation. This is an issue as it conflicts with OpenCore's method of emulation.")]),e._v(" "),t("p",[e._v("Files to delete:")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("/Volumes/EFI/EFI/CLOVER/drivers64UEFI/EmuVariableUefi-64.efi")])]),e._v(" "),t("li",[t("code",[e._v("/Volumes/EFI/nvram.plist")])]),e._v(" "),t("li",[t("code",[e._v("/etc/rc.clover.lib")])]),e._v(" "),t("li",[t("code",[e._v("/etc/rc.boot.d/10.save_and_rotate_boot_log.local")])]),e._v(" "),t("li",[t("code",[e._v("/etc/rc.boot.d/20.mount_ESP.local")])]),e._v(" "),t("li",[t("code",[e._v("/etc/rc.boot.d/70.disable_sleep_proxy_client.local.disabled")])]),e._v(" "),t("li",[t("code",[e._v("/etc/rc.shutdown.d/80.save_nvram_plist.local​")])])]),e._v(" "),t("p",[e._v("If folders are empty then delete them as well:")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("/etc/rc.boot.d")])]),e._v(" "),t("li",[t("code",[e._v("/etc/rc.shutdown.d​")])])]),e._v(" "),t("h2",{attrs:{id:"verifying-if-you-have-working-nvram"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#verifying-if-you-have-working-nvram"}},[e._v("#")]),e._v(" Verifying if you have working NVRAM")]),e._v(" "),t("p",[e._v("To start, open the terminal and run the following one line at a time:")]),e._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" -s\nnvram -c\nnvram "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("myvar")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("test\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("exit")]),e._v("\n")])])]),t("p",[e._v("Now reboot and run this:")]),e._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[e._v("nvram -p "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("grep")]),e._v(" -i myvar\n")])])]),t("p",[e._v("If nothing returns then your NVRAM is not working. If a line containing "),t("code",[e._v("myvar test")]),e._v(" returns, your NVRAM is working.")]),e._v(" "),t("p",[e._v("Note: "),t("code",[e._v("nvram -c")]),e._v(" requires SIP to be off, an alternative is to wipe NVRAM at the boot menu. Reminder you'll need "),t("code",[e._v("Misc -> Security -> AllowNvramReset -> YES")])]),e._v(" "),t("h2",{attrs:{id:"enabling-emulated-nvram-with-a-nvram-plist"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#enabling-emulated-nvram-with-a-nvram-plist"}},[e._v("#")]),e._v(" Enabling emulated NVRAM (with a nvram.plist)")]),e._v(" "),t("p",[e._v("To enable emulated NVRAM, you'll need 3 things set:")]),e._v(" "),t("p",[t("img",{attrs:{src:o(293),alt:""}})]),e._v(" "),t("p",[e._v("Within your config.plist:")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("Booter")]),e._v(":\n"),t("ul",[t("li",[t("code",[e._v("DisableVariableWrite")]),e._v(": set to "),t("code",[e._v("NO")])])])]),e._v(" "),t("li",[t("strong",[e._v("Misc -> Security")]),e._v(":\n"),t("ul",[t("li",[t("code",[e._v("ExposeSensitiveData")]),e._v(": set to "),t("code",[e._v("0x3")])])])]),e._v(" "),t("li",[t("strong",[e._v("NVRAM")]),e._v(":\n"),t("ul",[t("li",[t("code",[e._v("LegacyEnable")]),e._v(": set to "),t("code",[e._v("YES")])]),e._v(" "),t("li",[t("code",[e._v("LegacyOverwrite")]),e._v(" set to "),t("code",[e._v("YES")])]),e._v(" "),t("li",[t("code",[e._v("LegacySchema")]),e._v(": NVRAM variables set(OpenCore compares these to the variables present in nvram.plist)")]),e._v(" "),t("li",[t("code",[e._v("WriteFlash")]),e._v(": set to "),t("code",[e._v("YES")])])])])]),e._v(" "),t("p",[e._v("And within your EFI:")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("OpenRuntime.efi")]),e._v(" driver(this is needed for proper sleep, shutdown and other services to work correctly")])]),e._v(" "),t("p",[e._v("Now grab the "),t("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("'LogoutHook.command'"),t("OutboundLink")],1),e._v("(Inside "),t("code",[e._v("/Utilities/LogoutHook/")]),e._v(") and place it somewhere safe (e.g. within your user directory, as shown below):")]),e._v(" "),t("p",[t("code",[e._v("/Users/$(whoami)/LogoutHook/LogoutHook.command")])]),e._v(" "),t("p",[e._v("Open up terminal and run the following:")]),e._v(" "),t("p",[t("code",[e._v("sudo defaults write com.apple.loginwindow LogoutHook /Users/$(whoami)/LogoutHook/LogoutHook.command")])]),e._v(" "),t("p",[e._v("And voila! You have emulated NVRAM!")]),e._v(" "),t("p",[e._v("Do keep in mind this requires the "),t("code",[e._v("nvram")]),e._v(" command to support the "),t("code",[e._v("-x")]),e._v(" flag for this to work correctly which is unavailable on macOS 10.12 and below. If you are installing macOS 10.12 or earlier, you need to copy "),t("code",[e._v("nvram.mojave")]),e._v(" into the same folder as "),t("code",[e._v("LogoutHook.command")]),e._v(", which fixes this by invoking it instead of the system "),t("code",[e._v("nvram")]),e._v(" command.")]),e._v(" "),t("p",[e._v("Something else to note is that macOS is only able to read nvram.plist but it won't be able to write to nvram.plist unless running the shutdown process. This means running the test above won't work")])])}),[],!1,null,null,null);t.default=n.exports}}]);