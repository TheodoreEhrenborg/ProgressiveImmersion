const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = (env, argv) => [
	{
		entry: path.resolve(__dirname, 'src', 'background_scripts', 'main.js'),
		devtool: (argv.mode === 'development') ? 'inline-source-map' : false,
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: path.join('background_scripts', 'main.js'),
			clean: true,
		},
		resolve: {
			fallback: {
				'net': false,
				'tls': false,
				'fs': false,
			}
		},
		plugins: [
			new NodePolyfillPlugin(),
			new CopyPlugin({
				patterns: [
					path.resolve(__dirname, 'src', 'manifest.json'),
					{
						context: path.resolve(__dirname, 'src'),
						from:  'images/*.png',
					}, {
						from: path.resolve(__dirname, 'src', 'popup'),
						to: path.resolve(__dirname, 'build', 'popup'),
					}, {
						from: path.resolve(__dirname, 'src', 'content_scripts'),
						to: path.resolve(__dirname, 'build', 'content_scripts'),
					}
				]
			})
		],
		devServer: {
			hot: false,
			port: 8000,
			allowedHosts: 'auto',
			static: path.resolve(__dirname, 'build'),
			watchFiles: 'src/**/*',
			client: {
				progress: true
			},
			devMiddleware: {
				writeToDisk: true
			}
		}
	},
];