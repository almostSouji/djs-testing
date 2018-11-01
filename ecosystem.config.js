module.exports = {
	apps: [
		// stable
		{
			name: 'djs-stable',
			script: './stable/index.js',
		},
		// dev
		{
			name: 'djs-dev',
			script: './dev/index.js',
		},
		// master
		 {
			name: 'djs-master',
			script: './master/index.js',
		}
	]
};
