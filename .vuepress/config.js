const { description } = require('../package')

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
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
	["link", { rel:"'stylesheet", href: "/styles/website.css" }, ]
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
    nav: [
      {
        text: 'Dortania Guides',
        ariaLabel: 'Language Menu',
        items: [
            { text: 'Home Site', link: 'https://dortania.github.io/' },
			{ text: 'OpenCore Install Guide', link: 'https://dortania.github.io/OpenCore-Desktop-Guide/' },
            { text: 'GPU Buyers Guide', link: 'https://dortania.github.io/GPU-Buyers-Guide/' },
			{ text: 'Wireless Buyers Guide', link: 'https://dortania.github.io/Wireless-Buyers-Guide/' },
			{ text: 'Anti Buyers Guide', link: 'https://dortania.github.io/Anti-Hackintosh-Buyers-Guide/' },
          ]
      },
	  /*
      {
        text: 'Github',
        link: 'https://github.com/dortania/OpenCore-Desktop-Guide'
      }
	  */
    ],
    sidebar: [
        {
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
	      sidebarDepth: 1,
	      children: [
            ['/universal/security', 'Security and FileVault'],
			['/universal/audio', 'Fixing Audio'],
            ['/universal/oc2hdd', 'Booting without USB'],
			['/universal/update', 'Updating OpenCore, kexts and macOS'],
			['/universal/drm', 'Fixing DRM'],
            ['/universal/iservices', 'Fixing iServices'],
            ['/universal/pm', 'Fixing Power Management'],
			['/universal/sleep', 'Fixing Sleep'],
			['https://dortania.github.io/USB-Map-Guide/', 'Fixing USB'],
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
          ]
        },
        {
          title: 'Multiboot',
          collapsable: false,
          children: [
			['/multiboot/bootstrap', 'Setting up Bootstrap.efi'],
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
        
      ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
