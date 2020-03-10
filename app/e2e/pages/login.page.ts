import { browser, element, by, Key } from 'protractor';

export class LoginPage {

	async navigateTo(): Promise<any> {
		await browser.get('/login');
	}

	async setFormValues(username: string, password: string): Promise<any> {
		let usernameEl = element(by.name('username'));
		let passwordEl = element(by.name('password'));
		
		await usernameEl.sendKeys(username);
		await passwordEl.sendKeys(password);
	}

	async login(): Promise<any> {
		let loginBtn = element(by.css('button[type="submit"]'));
		return await loginBtn.click();
	}

	async getLoginError(): Promise<string> {
		let errorLbl = element(by.css('ex-alert'));
		return await errorLbl.getText();
	}

}