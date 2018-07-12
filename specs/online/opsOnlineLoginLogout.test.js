describe('Operations online login', () => {
	beforeAll(async () => {
		jest.setTimeout(10000);
		await page.goto('https://staging-ops.daxko-qa.com/Online/9991/Programsv2/home.mvc');
	});

	it('should display the client name on the page', async () => {
		await expect(page).toMatch('Test Client1');
	});

	it('clicking on the login button', async () => {
		await expect(page).toClick('a', { text: 'Login' });
		await page.waitForSelector('#lnkLoginSubmit');
		await expect(page).toMatch('I want to sign in to my account');
	});

	it('submiting username and password', async () => {
		await expect(page).toFill('input[name="email"]', 'automationsuite@daxko.com');
		await expect(page).toFill('input[id="txtPassword"]', 'Daxko123');
		await expect(page).toClick('a[id="lnkLoginSubmit"]');
		await page.waitForSelector('button[data-toggle="dropdown"]');
	});

	it('logging out', async () => {
		await expect(page).toClick('[data-toggle="dropdown"]');
		await expect(page).toClick('[href="/Online/Logout.aspx?cid=9991"]');
		await page.waitForSelector('a[href="/Online/Join.aspx?cid=9991"]');
	});
});
