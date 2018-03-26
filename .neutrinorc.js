module.exports = {
	use: [
		['@neutrinojs/web', {
			html: {
				template: './src/index.html'
			},
			devServer: {
				open: false
			}
		}]
	]
}