let path = require('path')
let CopyPlugin = require('copy-webpack-plugin')

module.exports = function (neutrino) {
	const MANIFEST_NAME = 'manifest.json'
	let patterns = [{
		context: neutrino.options.source,
		from: MANIFEST_NAME,
		to: MANIFEST_NAME,
		toType: 'file',
		cache: false
	}]
	let options = {
		debug: neutrino.options.debug,
		copyUnmodified: false
	}

	neutrino.config
		.plugin('webextension-manifest')
			.use(CopyPlugin, [patterns, options])
			.end()
}
