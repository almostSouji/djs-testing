module.exports = {
	apps: [
		// stable
		{
			name: 'djs-stable',
			script: './src/stable/index.js',
			cwd: './src/stable'
		},
		// dev
		{
			name: 'djs-dev',
			script: './src/dev/index.js',
			cwd: './src/dev'
		},
		// master
		{
			name: 'djs-master',
			script: './src/master/index.js',
			cwd: './src/master'
		}
	]
};
