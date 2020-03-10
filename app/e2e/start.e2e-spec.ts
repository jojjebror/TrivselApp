import { browser } from 'protractor';

describe('Start', () => {

	beforeEach(() => {
		browser.executeScript('window.localStorage.clear();');
	});

	it('should be redirected to login page', async () => {
		await browser.get('/');
		let url = await browser.getCurrentUrl();
		expect(url).toContain('login');
	});

});
