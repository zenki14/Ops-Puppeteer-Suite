describe('Basic', () => {
	beforeAll(async () => {
		await page.goto('https://staging-ops.daxko-qa.com/Online/9991/Programsv2/home.mvc');
	});

	it('should display the expected client on the page', async () => {
		const text = await page.evaluate(() => document.body.textContent);
		expect(text).toContain('Test Client1');
	});
});
