describe('Operations online landing page', () => {
	beforeAll(async () => {
		jest.setTimeout(10000);
		await page.goto('https://staging-ops.daxko-qa.com/Online/9991/Programsv2/home.mvc');
	});

	it('should display the client name on the page', async () => {
		await expect(page).toMatch('Test Client1');
	});

	it('should display the nav bar', async () => {
		const element = await expect(page).toMatchElement('a', { text: 'Sign Up' });
		const textContentProperty = await element.getProperty('textContent');
		const textContent = await textContentProperty.jsonValue();
		expect(textContent).toBe('Sign Up');
	});

	it('should display the programs search input', async () => {
		await page.waitForSelector('input[name="keywords"]');
	});

	it('should display the program keywords search button', async () => {
		await page.waitForSelector('button[data-ga-action="Submit"]');
	});
});
