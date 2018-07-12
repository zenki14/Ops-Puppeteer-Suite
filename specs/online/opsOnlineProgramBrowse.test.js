describe('Operations online program browse', () => {
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

	it('setting Automation_Branch context', async () => {
		await expect(page).toMatch('All locations ');
		await expect(page).toClick('a', { text: 'change' });
		await page.waitForSelector('button[id="set-locations"]');
		await expect(page).toClick('input[data-name="Automation_Branch"]');
		await expect(page).toClick('button[id="set-locations"]');
		await page.waitForSelector('.programsHome__locations-large-count');
		await expect(page).toMatch('Automation_Branch ');
	});

	it('should select a program category', async () => {
		await expect(page).toClick('a[data-ga-label="Automation_Regression"]');
		await page.waitForSelector('#results');
		const branchName = await page.evaluate(() => document.querySelector('.programResults__headline').innerHTML);
		expect(branchName).toBe('Automation_Regression');
	});

	it('should select an offering', async () => {
		await expect(page).toClick('a[data-ga-label="API Session 2017-12-07T16:52:16-06:00"]');
		await page.waitForSelector('input[data-ga-label="API Program 2017-12-07T16:52:16-06:00"]');
	});

	it('logging out', async () => {
		await expect(page).toClick('[data-toggle="dropdown"]');
		await expect(page).toClick('[href="/Online/Logout.aspx?cid=9991"]');
		await page.waitForSelector('a[href="/Online/Join.aspx?cid=9991"]');
	});
});
