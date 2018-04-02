'use strict'

let HtmlWebpackPlugin = require('html-webpack-plugin')
let ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
let deepmerge = require('deepmerge')
let path = require('path')

module.exports = function (neutrino, settings = {}) {
	let manifest = require(path.resolve(process.cwd(), 'package.json'))
	let { name, version } = manifest
	let chunkOrder = ['runtime', 'polyfill']

	neutrino.config
		.plugin(settings.plugin || 'html')
			.use(HtmlWebpackPlugin, [deepmerge({
				title: `${name} ${version || ''}`,
				filename: `index.html`,
				template: path.resolve(__dirname, 'template.ejs'),
				inject: 'head',
				mobile: true,
				minify: {
					collapseWhitespace: true,
					preserveLineBreaks: true
				},
				chunksSortMode: function(chunkA, chunkB){
					let indexA = chunkOrder.indexOf(chunkA.names[0])
					let indexB = chunkOrder.indexOf(chunkB.names[0])
					if (indexA < 0) {
						return 1
					}
					if (indexB < 0) {
						return -1
					}
					return indexA - indexB
				}
			}, settings)])
			.end()
		.plugin('html-defer')
			.use(ScriptExtHtmlWebpackPlugin, [{
				defaultAttribute: 'defer'
			}])
			.end()
}