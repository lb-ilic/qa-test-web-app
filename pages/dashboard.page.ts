import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    private readonly logoutButton: Locator;
    private readonly userNameSpan: Locator;

    constructor ( page: Page ) {
        this.page = page;
        this.logoutButton = page.getByRole( 'button', { name: 'Logout' } );
        this.userNameSpan = page.locator( '#userName' );
    }

    async open (): Promise<void> {
        await this.page.goto( 'dashboard.html?loggedIn=true' );
    }

    async logout (): Promise<void> {
        await this.logoutButton.click();
    }

    get userName (): Locator {
        return this.userNameSpan;
    }
}