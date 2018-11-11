module.exports = {
	apps: [
		// stable
		{
			name: 'djs-stable',
			script: './stable/index.js',
			cwd: "./stable"
		},
		// dev
		{
			name: 'djs-dev',
			script: './dev/index.js',
			cwd: "./dev"
		},
		// master
		{
			name: 'djs-master',
			script: './master/index.js',
			cwd: "./master"
		}
	]
};
