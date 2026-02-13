import { Page, Locator } from '@playwright/test';
import { LoginParams } from '../utils/params';

export class LoginPage {
    readonly page: Page;
    private readonly emailAddressInput: Locator;
    private readonly passwordInput: Locator;
    private readonly rememberMeCheckbox: Locator;
    private readonly loginButton: Locator;
    private readonly forgotPasswordLink: Locator;
    private readonly registrationLink: Locator;
    private readonly loginMessageDiv: Locator;
    private readonly emailErrorSpan: Locator;
    private readonly passwordErrorSpan: Locator;

    constructor ( page: Page ) {
        this.page = page;

        this.emailAddressInput = page.getByLabel( 'Email Address' );
        this.passwordInput = page.getByLabel( 'Password', { exact: true } );
        this.rememberMeCheckbox = page.getByLabel( /remember me/i );
        this.loginButton = page.getByRole( 'button', { name: 'Login' } );
        this.forgotPasswordLink = page.getByRole( 'link', { name: /forgot password/i } );
        this.registrationLink = page.getByRole( 'link', { name: /create new account/i } );
        this.loginMessageDiv = page.locator( '#loginMessage' );
        this.emailErrorSpan = page.locator( '#loginEmailError' );
        this.passwordErrorSpan = page.locator( '#loginPasswordError' );
    }

    async open (): Promise<void> {
        await this.page.goto( 'index.html' );
    }

    async logInUser ( { email = '', password = '' }: LoginParams = {} ): Promise<void> {
        await this.fillEmailAddress( email );
        await this.fillPassword( password );
        await this.submitForm();
    }

    async fillEmailAddress ( email: string ): Promise<void> {
        await this.emailAddressInput.clear();
        await this.emailAddressInput.fill( email );
    }

    async fillPassword ( password: string ): Promise<void> {
        await this.passwordInput.clear();
        await this.passwordInput.fill( password );
    }

    async selectRememberMe (): Promise<void> {
        await this.rememberMeCheckbox.check();
    }

    async submitForm (): Promise<void> {
        await this.loginButton.click();
    }

    async clickForgotPasswordLink (): Promise<void> {
        await this.forgotPasswordLink.click();
    }

    async clickRegistrationLink (): Promise<void> {
        await this.registrationLink.click();
    }

    get emailAddress (): Locator {
        return this.emailAddressInput;
    }

    get password (): Locator {
        return this.passwordInput;
    }

    get rememberMe (): Locator {
        return this.rememberMeCheckbox;
    }

    get submitButton (): Locator {
        return this.loginButton;
    }

    get emailError (): Locator {
        return this.emailErrorSpan;
    }

    get passwordError (): Locator {
        return this.passwordErrorSpan;
    }

    get loginMessage (): Locator {
        return this.loginMessageDiv;
    }
}