module.exports = {
	launch: {
		headless: process.env.CI === 'true' || false
	},
	server: {
		command: 'node server',
		port: 4444,
		launchTimeout: 10000
	}
};
