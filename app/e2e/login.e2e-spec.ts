import { browser, by, element, Key } from 'protractor';

import { LoginPage } from './pages';

describe('Login', () => {

	let loginPage: LoginPage;

	beforeEach(() => {
		loginPage = new LoginPage();
	});

	it('invalid credentials should show login error', async () => {
		await loginPage.navigateTo();
		await loginPage.setFormValues('username', 'password');
		await loginPage.login();
		let error = await loginPage.getLoginError();

		expect(error).toBeTruthy();
	});

	it('valid credentials should log the user in', async () => {
		await loginPage.navigateTo();
		await loginPage.setFormValues('test', 'password');
		await loginPage.login();
		let url = await browser.getCurrentUrl();
		expect(url).not.toContain('login');
	});

});