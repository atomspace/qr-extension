'use strict'

let path = require('path')
let isTruethy = require('./utils/is-truethy')
let ExtractTextPlugin = require('extract-text-webpack-plugin');
// let InertEntryPlugin = require('inert-entry-webpack-plugin')

module.exports = function (neutrino, manifest = {}) {
	let config = neutrino.config
	let src = neutrino.options.source
	// let testRun = (process.env.NODE_ENV === 'test')
	// let devRun = (process.env.NODE_ENV === 'development')

	let pages = {
		browser_action: manifest.browser_action && manifest.browser_action.default_popup,
		page_action: manifest.page_action && manifest.page_action.default_popup,
		options_ui: manifest.options_ui && manifest.options_ui.page,
		sidebar_action: manifest.sidebar_action && manifest.sidebar_action.default_panel,
		devtools_page: manifest.devtools_page
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

	if (manifest.content_scripts) {
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

	// ExtractTextPlugin
	// 	.extract({
	// 		loader: require.resolve('html-loader'),
	// 		options: {
	// 			attrs: ['img:src', 'script:src', 'link:href'],
	// 			interpolate: true
	// 		}
	// 	})
	// 	.forEach(({ loader, options }) => {
	// 		config.module.rule('pages')
	// 			.use(loader)
	// 				.loader(loader)
	// 				.options(options);
	// 	});

	config
		.entry('page')
			.add(path.resolve(src, 'page-popup.html'))
			.end()
		.module.rule('pages')
			.test(Object.keys(pages)
				.map(function(name){
					return pages[name]
				})
				.filter(isTruethy)
				.map(function(page){
					return path.resolve(src, page)
				})
			)
			.include
				.add(src)
				.end()
			.use('file')
				.loader(require.resolve('file-loader'))
				.options({
					name: "[name].[ext]"
				})
				.end()
			.use('extract')
				.loader(require.resolve('extract-loader'))
				.end()
			.use('html')
				.loader(require.resolve('html-loader'))
				.options({
					attrs: ['img:src', 'script:src', 'link:href'],
					interpolate: true
				})
				.end()
			.end().end()
		// .plugin('extract-pages')
		// 	.use(ExtractTextPlugin, ['index.html'])
		// 	.end()
		// .plugin('inert-entry')
		// 	.use(InertEntryPlugin)
		// 	.end()

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