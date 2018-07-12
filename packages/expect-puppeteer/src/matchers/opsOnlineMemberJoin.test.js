import faker from 'faker';

const user = {
	email: faker.internet.email(),
	password: 'Daxko123',
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	phone: faker.phone.phoneNumberFormat(0),
	address: faker.address.streetAddress(),
	city: faker.address.city(),
	zip: faker.address.zipCode('35210')
};

describe('Online Member Join', () => {
	beforeAll(async () => {
		jest.setTimeout(10000);
		await page.goto('https://staging-ops.daxko-qa.com/Online/9991/Programsv2/home.mvc');
	});

	it('should display the client name on the page', async () => {
		await expect(page).toMatch('Test Client1');
	});

	it('should display the nav bar', async () => {
		const element = await expect(page).toMatchElement('a[href="/Online/Join.aspx?cid=9991"]');
		const textContentProperty = await element.getProperty('textContent');
		const textContent = await textContentProperty.jsonValue();
		expect(textContent).toBe('Sign Up');
	});

	it('clicking the Sign Up button', async () => {
		await page.waitForSelector('a', { text: 'Sign Up' });
		await expect(page).toClick('a[href="/Online/Join.aspx?cid=9991"]');
		await page.waitForSelector('button[id="next-link"]');
		const pathname = await page.evaluate(() => document.location.pathname);
		expect(pathname).toBe('/Online/9991/MembershipV2/RateQuestions.mvc');
	});

	it('setting a Location', async () => {
		await page.select('select[data-ga-action="Branch"]', '653');
		const element = await expect(page).toMatchElement('option[value="653"]');
		const textContentProperty = await element.getProperty('textContent');
		const textContent = await textContentProperty.jsonValue();
		expect(textContent.includes('Automation_Branch'));
		await expect(page).toClick('button[id="next-link"]');
		await page.waitForSelector('.chooseMembership__location-name');
		const branchName = await page.evaluate(
			() => document.querySelector('.chooseMembership__location-name').innerHTML
		);
		expect(branchName).toBe('Automation_Branch');
	});

	it('selecting a Membership Type', async () => {
		await expect(page).toClick('button[data-ga-label="Automation_50_Monthly"]');
		await page.waitForSelector('input[id="next-button"]');
	});

	it('entering and submitting new member information', async () => {
		await expect(page).toFill('[id="email"]', user.email);
		await expect(page).toFill('[id="password"]', user.password);
		await expect(page).toFill('[id="password_confirm"]', user.password);
		await expect(page).toFill('[id="first_name"]', user.firstName);
		await expect(page).toFill('[id="last_name"]', user.lastName);
		await page.select('select[data-ga-action="Gender"]', 'M');
		const selectedGender = await page.evaluate(() => document.querySelector('#gender').value);
		expect(selectedGender).toBe('M');
		await expect(page).toFill('[id="birth_date"]', '06261986');
		await page.select('select[id="race"]', 'W');
		const selectedRace = await page.evaluate(() => document.querySelector('#race').value);
		expect(selectedRace).toBe('W');
		await expect(page).toFill('[id="address_line_1"]', user.address);
		await expect(page).toFill('[id="address_city"]', user.city);
		await page.select('select[id="address_us_state"]', 'AL');
		const selectedState = await page.evaluate(() => document.querySelector('#address_us_state').value);
		expect(selectedState).toBe('AL');
		await expect(page).toFill('[id="address_us_zip"]', user.zip);
		await expect(page).toFill('[id="phone"]', user.phone);
		await expect(page).toFill('[id="emergency_contact_first_name"]', user.firstName);
		await expect(page).toFill('[id="emergency_contact_last_name"]', user.lastName);
		await expect(page).toFill('[id="emergency_phone"]', user.phone);
		await expect(page).toClick('input[id="next-button"]');
		await page.waitForSelector('#next-button');
	});

	it('Reviews the new unit and then continues to the next step', async () => {
		await page.waitForSelector('.memberUnits__add');
		await expect(page).toClick('button[id="next-button"]');
		await page.waitForSelector('button[id="continue-button"]');
	});

	it('creates a new payment method', async () => {
		await page.waitForSelector('#selected-billing-method-id');
		await page.select('select[id="selected-billing-method-id"]', 'new_credit_card');
		const selectedPaymentMethod = await page.evaluate(
			() => document.querySelector('#selected-billing-method-id').value
		);
		expect(selectedPaymentMethod).toBe('new_credit_card');
		await page.waitForSelector('[name="credit_card.name_on_account"]');
		await expect(page).toFill('[name="credit_card.name_on_account"]', user.firstName);
		await expect(page).toFill('[name="credit_card.avs_address"]', user.address);
		await expect(page).toFill('[name="credit_card.avs_zip_code"]', user.zip);
		await expect(page).toFill('[id="cc-number"]', '4111 1111 1111 1111');
		await expect(page).toFill('[id="cc-cvv"]', '123');
		await expect(page).toFill('[id="cc-exp"]', '0130');
		// await jestPuppeteer.debug();
		await expect(page).toClick('button[id="continue-button"]');
		await page.waitForSelector('.receipt-web');
	});

	it('logs out of newly created online account', async () => {
		await expect(page).toClick('[data-toggle="dropdown"]');
		await expect(page).toClick('[href="/Online/Logout.aspx?cid=9991"]');
		await page.waitForSelector('a[href="/Online/Join.aspx?cid=9991"]');
	});
});
