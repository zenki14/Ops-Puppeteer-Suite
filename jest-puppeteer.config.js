module.exports = {
	launch: {
		headless: process.env.CI === 'false',
		devtools: true
	},
	server: {
		command: 'node server',
		port: 4444,
		launchTimeout: 10000
	}
};
