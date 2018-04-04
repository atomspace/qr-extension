let path = require('path')
let GenerateJsonPlugin = require('generate-json-webpack-plugin')
let deepmerge = require('deepmerge')
let safeRequire = require('./utils/safe-require.js')
let normalizeManifest = require('./utils/normalize-manifest')

module.exports = function (neutrino) {
	const MANIFEST_NAME = 'manifest.json'
	let npmManifest = neutrino.options.packageJson
	let extensionManifest = normalizeManifest(
		safeRequire(neutrino.options.source + '/manifest.json')
	) || {}
	let manifest = {
		manifest_version: 2,
		version: npmManifest.version,
		name: npmManifest.name,
		description: npmManifest.description,
		author: npmManifest.author,
		homepage_url: npmManifest.homepage,

		background: extensionManifest.background ? {
			scripts: ['runtime.js', 'polyfill.js']
		} : undefined,

		content_scripts: extensionManifest.content_scripts ? [
			{
				matches: ['<all_urls>'],
				js: ['runtime.js', 'polyfill.js'],
				all_frames: true
			}
		] : undefined,

		browser_action: extensionManifest.browser_action ? {
			browser_style: false,
			default_icon: {
				'16': extensionManifest.icons[16],
				'32': extensionManifest.icons[32],
				'64': extensionManifest.icons[64]
			},
			default_title: extensionManifest.name || npmManifest.name,
			// 'default_popup': 'popup/geo.html'
		} : undefined,

		page_action: extensionManifest.page_action ?  {
			browser_style: false,
			default_icon: {
				'19': extensionManifest.icons[19],
				'38': extensionManifest.icons[38]
			},
			default_title: extensionManifest.name || npmManifest.name,
			// 'default_popup': 'page-popup.html'
		} : undefined,

		// options_ui: {
		// 	page: 'options/options.html'
		// },

		sidebar_action: extensionManifest.sidebar_action ? {
			'default_icon': {
				'16': extensionManifest.icons[16],
				'32': extensionManifest.icons[32],
				'64': extensionManifest.icons[64]
			},
			default_title: extensionManifest.name || npmManifest.name,
			// 'default_panel': 'sidebar/sidebar.html'
		} : undefined,

		// icons: {
		// 	'16': 'static/icons/icon.svg',
		// 	'24': 'static/icons/icon.svg',
		// 	'32': 'static/icons/icon.svg',
		// 	'48': 'static/icons/icon.svg',
		// 	'64': 'static/icons/icon.svg',
		// 	'128': 'static/icons/icon.svg'
		// },
		content_security_policy: 'script-src \'self\'; object-src \'self\'',
		web_accessible_resources: ['static/**/*'],
		// omnibox: {
		// 	keyword: (extensionManifest.name || npmManifest.name)
		// }
	}

	neutrino.config
		.plugin('webextension-manifest')
		.use(GenerateJsonPlugin, [
			MANIFEST_NAME,
			deepmerge(manifest, extensionManifest),
			null,
			3
		])
		.end()
}
