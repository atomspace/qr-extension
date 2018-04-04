'use strict'

let path = require('path')

let chunk = require('@neutrinojs/chunk')
let clean = require('@neutrinojs/clean')
let copy = require('@neutrinojs/copy')
let minify = require('@neutrinojs/minify')
let styleLoader = require('@neutrinojs/style-loader')
let fontLoader = require('@neutrinojs/font-loader')
let imageLoader = require('@neutrinojs/image-loader')
let htmlLoader = require('@neutrinojs/html-loader');
let env = require('@neutrinojs/env')
let deepmerge = require('deepmerge')
let arrify = require('arrify')
let hotReload = require('./hot-reload.js')
let babel = require('./babel.js')
let htmlTemplate = require('./html-template.js')
let webextensionManifest = require('./webextension-manifest.js')

module.exports = function (neutrino, settings = {}) {
	const NODE_MODULES = path.resolve(__dirname, '../node_modules')
	const PROJECT_NODE_MODULES = path.resolve(process.cwd(), 'node_modules')
	let config = neutrino.config
	let testRun = (process.env.NODE_ENV === 'test')
	let devRun = (process.env.NODE_ENV === 'development')
	let lintRule = config.module.rules.get('lint')
	let eslintLoader = lintRule && lintRule.uses.get('eslint')
	let staticDirPath = path.join(neutrino.options.source, 'static')
	let localesDirPath = path.join(neutrino.options.source, '_locales')
	let mains = {
		'background': path.resolve(neutrino.options.source, 'background'),
		'content': path.resolve(neutrino.options.source, 'content'),
		// 'browser-popup': path.resolve(neutrino.options.source, 'browser-popup'),
		'page-popup': path.resolve(neutrino.options.source, 'page-popup'),
		// 'options': path.resolve(neutrino.options.source, 'options')
	}
	let pages = [
		// 'browser-popup', 
		'page-popup', 
		// 'options'
	]

	function mergeWith(options = {}){
		return function(opts = {}){
			return deepmerge(opts, options)
		}
	}

	if (!settings.browsers) {
		settings.browsers = [
			'firefox >=45',
			'firefoxandroid >=48',
			'chrome >=17',
			'opera >=15',
			'edge >=14' //march 2016
		]
	}

	neutrino.options.mains = mains

	Object.keys(mains).forEach(function(key) {
		config.entry(key).add(mains[key])
	})

	config
		.devtool(devRun ? 'eval-source-map' : 'source-map')
		.target('web')
		.context(neutrino.options.root)
		.entry('polyfill')
			.add(require.resolve('./polyfills.js'))
			.end()
		.output
			.path(neutrino.options.output)
			.publicPath('./')
			.filename('[name].js')
			.chunkFilename('[name].[chunkhash].js')
			.end()
		.resolve.extensions
			.add('.js')
			.add('.json')
			.end().end()
		.resolve.alias
			// Make sure 2 versions of "core-js" always match in package.json and babel-polyfill/package.json
			.set('core-js', path.dirname(require.resolve('core-js')))
			.end().end()
		.resolve.modules
			.add('node_modules')
			.add(NODE_MODULES)
			.add(PROJECT_NODE_MODULES)
			.add(neutrino.options.node_modules)
			.end().end()
		.resolveLoader.modules
			.add(NODE_MODULES)
			.add(PROJECT_NODE_MODULES)
			.add(neutrino.options.node_modules)
			.end().end()
		.node
			.set('console', false)
			.set('global', true)
			.set('process', true)
			.set('Buffer', false)
			.set('__filename', 'mock')
			.set('__dirname', 'mock')
			.set('setImmediate', true)
			.set('fs', 'empty')
			.set('tls', 'empty')
			.end()

	neutrino.use(env)
	neutrino.use(htmlLoader);
	neutrino.use(babel, {
		include: [
			neutrino.options.source,
			neutrino.options.tests,
			require.resolve('./polyfills.js')
		],
		exclude: [
			staticDirPath
		],
		browsers: settings.browsers
	})
	pages.forEach(function(name, index) {
		neutrino.use(htmlTemplate, {
			plugin: `html-${index}`,
			filename: `${name}.html`,
			chunks: [name, 'runtime', 'polyfill']
		})
	})
	neutrino.use(styleLoader)
	neutrino.use(fontLoader)
	neutrino.use(imageLoader)
	neutrino.use(clean, { paths: [neutrino.options.output] })
	neutrino.use(webextensionManifest)
	neutrino.use(copy, {
		options: {
			pluginId: 'copy-static'
		},
		patterns: [{
			context: staticDirPath,
			from: '**/*',
			to: path.basename(staticDirPath)
		}]
	})
	neutrino.use(copy, {
		options: {
			pluginId: 'copy-locales'
		},
		patterns: [{
			context: localesDirPath,
			from: '**/*',
			to: path.basename(localesDirPath)
		}]
	})

	if (!testRun) {
		neutrino.use(chunk)
	}

	if (devRun) {
		// neutrino.use(hotReload, settings.server)
	}
	else {
		// neutrino.use(minify)
	}

	if (eslintLoader) {
		lintRule
			.pre()
		eslintLoader
			.tap(mergeWith({
				envs: ['browser', 'commonjs'],
				parserOptions: {
					ecmaFeatures: {
						experimentalObjectRestSpread: true
					}
				}
			}))
	}
}