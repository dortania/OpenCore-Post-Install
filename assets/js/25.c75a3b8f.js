(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{421:function(t,e,o){"use strict";o.r(e);var i=o(25),s=Object(i.a)({},(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[o("h1",{attrs:{id:"opencore-post-install"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#opencore-post-install"}},[t._v("#")]),t._v(" OpenCore Post-Install")]),t._v(" "),o("p",[t._v("Welcome to the OpenCore Post-Install guide! Please note that if you have not installed macOS yet, we recommend you follow one of our install guides:")]),t._v(" "),o("ul",[o("li",[o("a",{attrs:{href:"https://dortania.github.io/OpenCore-Desktop-Guide/",target:"_blank",rel:"noopener noreferrer"}},[t._v("OpenCore Desktop Guide"),o("OutboundLink")],1)]),t._v(" "),o("li",[o("a",{attrs:{href:"https://dortania.github.io/vanilla-laptop-guide/",target:"_blank",rel:"noopener noreferrer"}},[t._v("OpenCore Laptop Guide"),o("OutboundLink")],1)])]),t._v(" "),o("p",[t._v("And while the info here can be applied to both OpenCore and Clover, we primarily focus on OpenCore installations. So you will need to research a bit more if you run into any issues.")]),t._v(" "),o("h2",{attrs:{id:"how-to-follow-this-guide"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#how-to-follow-this-guide"}},[t._v("#")]),t._v(" How to follow this guide")]),t._v(" "),o("p",[t._v("To start, not every section in this guide must be complete. It's up to each user whether they feel they want to add the finishing touches or resolve certain issues")]),t._v(" "),o("p",[t._v("This guide is split into 4 parts:")]),t._v(" "),o("ul",[o("li",[o("a",{attrs:{href:"#universal"}},[t._v("Universal")]),t._v(" "),o("ul",[o("li",[t._v("All users are recommended to follow")])])]),t._v(" "),o("li",[o("a",{attrs:{href:"#laptop-specifics"}},[t._v("Laptop Specifics")]),t._v(" "),o("ul",[o("li",[t._v("Laptop users are recommended to follow in addition to the above")])])]),t._v(" "),o("li",[o("a",{attrs:{href:"#cosmetics"}},[t._v("Cosmetics")]),t._v(" "),o("ul",[o("li",[t._v("Cosmetics like OpenCore GUI and removing verbose screen output during boot")])])]),t._v(" "),o("li",[o("a",{attrs:{href:"#multiboot"}},[t._v("Multiboot")]),t._v(" "),o("ul",[o("li",[t._v("Recommendations for users who are multi-booting")])])]),t._v(" "),o("li",[o("a",{attrs:{href:"#miscellaneous"}},[t._v("Miscellaneous")]),t._v(" "),o("ul",[o("li",[t._v("Other misc fixes, not all users will require these fixes")])])])]),t._v(" "),o("h3",{attrs:{id:"universal"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#universal"}},[t._v("#")]),t._v(" Universal")]),t._v(" "),o("ul",[o("li",[o("RouterLink",{attrs:{to:"/universal/security.html"}},[t._v("Security and FileVault")]),t._v(" "),o("ul",[o("li",[t._v("For those who care about security and privacy.")])])],1),t._v(" "),o("li",[o("RouterLink",{attrs:{to:"/universal/audio.html"}},[t._v("Fixing Audio")]),t._v(" "),o("ul",[o("li",[t._v("For those needing help resolving audio issues.")])])],1),t._v(" "),o("li",[o("RouterLink",{attrs:{to:"/universal/oc2hdd.html"}},[t._v("Booting without USB")]),t._v(" "),o("ul",[o("li",[t._v("Allowing you to boot OpenCore without the USB installed.")])])],1),t._v(" "),o("li",[o("RouterLink",{attrs:{to:"/universal/update.html"}},[t._v("Updating OpenCore, kexts and macOS")]),t._v(" "),o("ul",[o("li",[t._v("How to update your kexts, OpenCore and even macOS safely.")])])],1),t._v(" "),o("li",[o("RouterLink",{attrs:{to:"/universal/drm.html"}},[t._v("Fixing DRM")]),t._v(" "),o("ul",[o("li",[t._v("For those with DRM issues like Netflix playback.")])])],1),t._v(" "),o("li",[o("RouterLink",{attrs:{to:"/universal/iservices.html"}},[t._v("Fixing iServices")]),t._v(" "),o("ul",[o("li",[t._v("Help to fix misc iServices issues like iMessage.")])])],1),t._v(" "),o("li",[o("RouterLink",{attrs:{to:"/universal/pm.html"}},[t._v("Fixing Power Management")]),t._v(" "),o("ul",[o("li",[t._v("Fixes and helps improve both hardware idle and boosting states.")])])],1),t._v(" "),o("li",[o("RouterLink",{attrs:{to:"/universal/sleep.html"}},[t._v("Fixing Sleep")]),t._v(" "),o("ul",[o("li",[t._v("Numerous places to check for when fixing sleep.")])])],1),t._v(" "),o("li",[o("a",{attrs:{href:"https://dortania.github.io/USB-Map-Guide/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Fixing USB"),o("OutboundLink")],1),t._v(" "),o("ul",[o("li",[t._v("Fixes for USB issues like missing ports and helping with sleep.")])])])]),t._v(" "),o("h3",{attrs:{id:"laptop-specifics"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#laptop-specifics"}},[t._v("#")]),t._v(" Laptop Specifics")]),t._v(" "),o("ul",[o("li",[o("RouterLink",{attrs:{to:"/laptop-specific/battery.html"}},[t._v("Fixing Battery Read-outs")]),t._v(" "),o("ul",[o("li",[t._v("If your battery isn't supported out of the box with SMCBatteryManager.")])])],1)]),t._v(" "),o("h3",{attrs:{id:"cosmetics"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#cosmetics"}},[t._v("#")]),t._v(" Cosmetics")]),t._v(" "),o("ul",[o("li",[o("RouterLink",{attrs:{to:"/cosmetic/gui.html"}},[t._v("Add GUI and Boot-chime")]),t._v(" "),o("ul",[o("li",[t._v("Add a fancy GUI to OpenCore and even a boot chime!")])])],1),t._v(" "),o("li",[o("RouterLink",{attrs:{to:"/cosmetic/verbose.html"}},[t._v("Fixing Resolution and Verbose")]),t._v(" "),o("ul",[o("li",[t._v("Helps fix the resolution of OpenCore, and allows you to get that sweet Apple logo while booting!")])])],1)]),t._v(" "),o("h3",{attrs:{id:"multiboot"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#multiboot"}},[t._v("#")]),t._v(" Multiboot")]),t._v(" "),o("ul",[o("li",[o("RouterLink",{attrs:{to:"/multiboot/bootstrap.html"}},[t._v("Setting up Bootstrap.efi")]),t._v(" "),o("ul",[o("li",[t._v("Ensures Windows doesn't remove OpenCore from our system.")])])],1),t._v(" "),o("li",[o("RouterLink",{attrs:{to:"/multiboot/bootcamp.html"}},[t._v("Installing BootCamp")]),t._v(" "),o("ul",[o("li",[t._v("Allows us to install Bootcamp for easy boot switching.")])])],1)]),t._v(" "),o("h3",{attrs:{id:"miscellaneous"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#miscellaneous"}},[t._v("#")]),t._v(" Miscellaneous")]),t._v(" "),o("ul",[o("li",[o("RouterLink",{attrs:{to:"/misc/rtc.html"}},[t._v("Fixing RTC")]),t._v(" "),o("ul",[o("li",[t._v("Helps resolve RTC/CMOS/safe-mode reboot issues.")])])],1),t._v(" "),o("li",[o("RouterLink",{attrs:{to:"/misc/msr-lock.html"}},[t._v("Fixing CFG Lock")]),t._v(" "),o("ul",[o("li",[t._v("Allows use to remove some kernel patches for better stability")])])],1),t._v(" "),o("li",[o("RouterLink",{attrs:{to:"/misc/nvram.html"}},[t._v("Emulated NVRAM")]),t._v(" "),o("ul",[o("li",[t._v("For users who have broken NVRAm, or need to test it.")])])],1)]),t._v(" "),o("p",[t._v("https://dortania.github.io/OpenCore-Post-Install/")])])}),[],!1,null,null,null);e.default=s.exports}}]);