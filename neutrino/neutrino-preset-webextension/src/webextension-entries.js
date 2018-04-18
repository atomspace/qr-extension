'use strict'

let path = require('path')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let isTruethy = require('./utils/is-truethy')

module.exports = function (neutrino, manifest = {}) {
	let config = neutrino.config
	let src = neutrino.options.source
	// let testRun = (process.env.NODE_ENV === 'test')
	// let devRun = (process.env.NODE_ENV === 'development')

	let mains = {
		background: manifest.background && manifest.background.scripts,
		content: manifest.content_scripts && manifest.content_scripts.reduce(function(scriptA, scriptB){
			return scriptB.js.concat(scriptA)
		}, [])
	}
	let pages = {
		browser_action: manifest.browser_action && manifest.browser_action.default_popup,
		page_action: manifest.page_action && manifest.page_action.default_popup,
		options_ui: manifest.options_ui && manifest.options_ui.page,
		sidebar_action: manifest.sidebar_action && manifest.sidebar_action.default_panel
	}


	neutrino.options.mains = {}

	if (manifest.background && manifest.background.scripts) {
		config.entry('background').merge(
			manifest.background.scripts.map(function(module){
				return path.resolve(src, module)
			})
		)
		manifest.background.scripts = ['background.js']
	}

	if ( manifest.content_scripts) {
		manifest.content_scripts = manifest.content_scripts.map(function(script, index){
			config.entry(`content-${index}`).merge(
				script.js.map(function(module){
					return path.resolve(src, module)
				})
			)
			script.js = [`content-${index}.js`]
			return script
		})
	}

	// Object.keys(mains).forEach(function(key) {
	// 	let entries = mains[key]
	// 	if (entries) {
	// 		entries.forEach(function(entry, index){
	// 			config.entry(`${key}-${index}`).add()
	// 		})	
	// 	}
	// })

	// Object.keys(pages).forEach(function(name) {
	// 	let page = pages[name]
	// 	if (page) {
	// 		let extractPlugin = new ExtractTextPlugin(page)

	// 		config
	// 			.entry(name)
	// 				.add(path.resolve(src, page))
	// 				.end()
	// 			.module.rule(`page-${name}`)
	// 				.test(path.resolve(src, page))
	// 				.use('extract')
	// 					.loader(extractPlugin.extract({
	// 						loader: require.resolve('html-loader'),
	// 						options: {
	// 							attrs: ['img:src', 'script:src', 'link:href'],
	// 							interpolate: false
	// 						}
	// 					}))
	// 					.end()
	// 				.end()
	// 			.end()
	// 			.plugin(`extract-${name}`)
	// 				.use(function(){ return extractPlugin })
	// 			.end()
	// 	}
	// })

	// config.module.rule('pages')
	// 	.test(Object.keys(pages)
	// 		.map(function(name){
	// 			return pages[name]
	// 		})
	// 		.filter(isTruethy)
	// 		.map(function(page){
	// 			return path.resolve(src, page)
	// 		})
	// 	)
	// 	.include
	// 		.add(src)
	// 		.end()
	// 	.use('file')
	// 		.loader(require.resolve('file-loader'))
	// 		.options({
	// 			name: "[name].[ext]"
	// 		})
	// 		.end()
	// 	.use('extract')
	// 		.loader(require.resolve('extract-loader'))
	// 		.end()
	// 	.use('html')
	// 		.loader(require.resolve('html-loader'))
	// 		.options({
	// 			attrs: ['img:src', 'script:src', 'link:href'],
	// 			interpolate: false
	// 		})
	// 		.end()


}