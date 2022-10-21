const {
    description
} = require('../package')

module.exports = {
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: 'OpenCore Post-Install',
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: description,

    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
        ['meta', {
            name: 'theme-color',
            content: '#3eaf7c'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
        }],
        ["link", {
            rel: "'stylesheet",
            href: "/styles/website.css"
        }, ]
    ],
    base: '/OpenCore-Post-Install/',


    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    theme: 'vuepress-theme-succinct',
    globalUIComponents: [
        'ThemeManager'
    ],

    themeConfig: {
        lastUpdated: true,
        repo: 'https://github.com/dortania/OpenCore-Post-Install',
        editLinks: false,
        docsDir: 'OpenCore-Post-Install',
        editLinkText: '',
        logo: '/homepage.png',
        nav: [{
            text: 'Dortania Guides',
            items: [{
                    text: 'Home Site',
                    link: 'https://dortania.github.io/'
                },
                {
                    text: 'OpenCore Install Guide',
                    link: 'https://dortania.github.io/OpenCore-Install-Guide/'
                },
	            {
	                text: 'OpenCore Multiboot',
	                link: 'https://dortania.github.io/OpenCore-Multiboot/'
	            },
                {
                    text: 'Getting Started With ACPI',
                    link: 'https://dortania.github.io/Getting-Started-With-ACPI/'
                },
                {
                    text: 'GPU Buyers Guide',
                    link: 'https://dortania.github.io/GPU-Buyers-Guide/'
                },
                {
                    text: 'Wireless Buyers Guide',
                    link: 'https://dortania.github.io/Wireless-Buyers-Guide/'
                },
                {
                    text: 'Anti Buyers Guide',
                    link: 'https://dortania.github.io/Anti-Hackintosh-Buyers-Guide/'
                },
            ]
        }, ],
        sidebar: [{
                title: 'Introduction',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    '',
                ]

            },
            {
                title: 'Universal',
                collapsable: false,
                sidebarDepth: 2,
                children: [

                    ['/universal/audio', 'Fixing Audio'],
                    ['/universal/oc2hdd', 'Booting without USB'],
                    ['/universal/update', 'Updating OpenCore, kexts and macOS'],
                    ['/universal/drm', 'Fixing DRM'],
                    ['/universal/iservices', 'Fixing iServices'],
                    ['/universal/pm', 'Fixing Power Management'],
                    ['/universal/sleep', 'Fixing Sleep'],
                ]
            },
            {
                title: 'USB Fixes',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    ['/usb/', 'USB Mapping: Introduction'],
                    ['/usb/system-preparation', 'System Preparation'],
                    {
                        title: 'USB Mapping',
                        collapsable: true,
                        sidebarDepth: 2,
                        children: [
                            ['/usb/intel-mapping/intel', 'Intel USB mapping'],
                            ['/usb/manual/manual', 'Manual Mapping'],
                        ]
                    },
                    {
                        title: 'Miscellaneous Fixes',
                        collapsable: true,
                        sidebarDepth: 1,
                        children: [
                            ['/usb/misc/power', 'Fixing USB Power'],
                            ['/usb/misc/shutdown', 'Fixing Shutdown/Restart'],
                            ['/usb/misc/instant-wake', 'Fixing Instant Wake'],
                            ['/usb/misc/keyboard', 'Fixing Keyboard Wake Issues'],
                        ]
                    },
                ]
            },
            {
                title: 'Security',
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    ['/universal/security', 'Security and FileVault'],
                    {
                        title: '',
                        collapsable: false,
                        sidebarDepth: 2,
                        children: [
                            ['/universal/security/filevault', 'FileVault'],
                            ['/universal/security/vault', 'Vault'],
                            ['/universal/security/scanpolicy', 'ScanPolicy'],
							['/universal/security/password', 'OpenCore Menu Password'],
                            ['/universal/security/applesecureboot', 'Apple Secure Boot'],
                        ]
                    },
                ]
            },
            {
                title: 'Laptop Specifics',
                collapsable: false,
                children: [
                    ['/laptop-specific/battery', 'Fixing Battery Read-outs'],

                ]
            },
            {
                title: 'Cosmetics',
                collapsable: false,
                children: [
                    ['/cosmetic/verbose', 'Fixing Resolution and Verbose'],
                    ['/cosmetic/gui', 'Add GUI and Boot-chime'],
                    ['/universal/memory', 'Fixing MacPro7,1 Memory Errors'],
                ]
            },
            {
                title: 'Multiboot',
                collapsable: false,
                children: [
					['https://dortania.github.io/OpenCore-Multiboot/', 'OpenCore Multiboot'],
                    ['/multiboot/bootstrap', 'Setting up LauncherOption'],
                    ['/multiboot/bootcamp', 'Installing BootCamp'],
                ]
            },
            {
                title: 'Miscellaneous',
                collapsable: false,
                children: [
                    ['/misc/rtc', 'Fixing RTC'],
                    ['/misc/msr-lock', 'Fixing CFG Lock'],
                    ['/misc/nvram', 'Emulated NVRAM'],
                ]
            },
            {
                title: 'GPU Patching',
                collapsable: false,
                children: [
                    ['/gpu-patching/', 'In-depth GPU patching'],
		            {
		                title: 'Modern Intel iGPU',
		                collapsable: false,
		                children: [
		                    ['/gpu-patching/intel-patching/', 'Intro to iGPU patching'],
		                    ['/gpu-patching/intel-patching/vram', 'VRAM patching'],
							['/gpu-patching/intel-patching/connector', 'Connector-type patching'],
							['/gpu-patching/intel-patching/busid', 'BusID patching'],
		                ]
		            },
		            {
		                title: 'Legacy Intel iGPU',
		                collapsable: false,
		                children: [
		                    ['/gpu-patching/legacy-intel/', 'GMA Patching'],
		                ]
		            },
		            {
		                title: 'Legacy Nvidia',
		                collapsable: false,
		                children: [
		                    ['/gpu-patching/nvidia-patching/', 'Nvidia Patching'],
		                ]
                    },
                    {
                        title: 'Modern Nvidia',
                        collapsable: false,
                        children: [
                            ['/gpu-patching/modern-nvidia/', 'Nvidia Web Drivers']
                        ]
                    }
                ]
            },

        ],
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
        '@vuepress/plugin-back-to-top',
        'vuepress-plugin-smooth-scroll',
        ['vuepress-plugin-medium-zoom',
            {
                selector: "img",
                options: {
                    background: 'var(--bodyBgColor)'
                }
            }
        ],
    ]
}