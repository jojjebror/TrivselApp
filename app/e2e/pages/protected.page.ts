import { browser, element, by, Key } from 'protractor';

export class ProtectedPage {

	async navigateTo(): Promise<any> {
		await browser.get('/');
	}

	async toggleMenu(): Promise<any> {
		let menuBtn = element(by.css('button.ex-navbar-menu'));
		return await menuBtn.click();
	}

	async logout(): Promise<any> {
		await this.toggleMenu();
		let logoutBtn = element(by.css('logout'));
		logoutBtn.click();
	}

}