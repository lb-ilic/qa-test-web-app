import { Page, Locator } from '@playwright/test';
import { ForgotPasswordParams } from '../utils/params';

export class ForgotPasswordPage {
    readonly page: Page;
    private readonly emailAddressInput: Locator;
    private readonly securityAnswerInput: Locator;
    private readonly securityQuestionDropdown: Locator;
    private readonly sendResetLinkButton: Locator;
    private readonly loginLink: Locator;
    private readonly registrationLink: Locator;
    private readonly forgotPasswordMessageDiv: Locator;
    private readonly emailErrorSpan: Locator;

    constructor ( page: Page ) {
        this.page = page;

        this.emailAddressInput = page.getByLabel( 'Email Address' );
        this.securityAnswerInput = page.getByLabel( 'Security Answer', { exact: true } );
        this.securityQuestionDropdown = page.getByLabel( /security question/i );
        this.sendResetLinkButton = page.getByRole( 'button', { name: 'Send Reset Link' } );
        this.loginLink = page.getByRole( 'link', { name: /back to login/i } );
        this.registrationLink = page.getByRole( 'link', { name: /create new account/i } );
        this.forgotPasswordMessageDiv = page.locator( '#forgotPasswordMessage' );
        this.emailErrorSpan = page.locator( '#resetEmailError' );
    }

    async open (): Promise<void> {
        await this.page.goto( 'forgot-password.html' );
    }

    async resetPassword ( { email = '', question = '', answer = '' }: ForgotPasswordParams = {} ) {
        await this.fillEmailAddress( email );
        await this.selectSecurityQuestion( question );
        await this.fillSecurityAnswer( answer );
        await this.submitForm();
    }

    async fillEmailAddress ( email: string ): Promise<void> {
        await this.emailAddressInput.clear();
        await this.emailAddressInput.fill( email );
    }

    async fillSecurityAnswer ( password: string ): Promise<void> {
        await this.securityAnswerInput.clear();
        await this.securityAnswerInput.fill( password );
    }

    async selectSecurityQuestion ( value: string ): Promise<void> {
        await this.securityQuestionDropdown.selectOption( value );
    }

    async submitForm (): Promise<void> {
        await this.sendResetLinkButton.click();
    }

    async clickLoginLink (): Promise<void> {
        await this.loginLink.click();
    }

    async clickRegistrationLink (): Promise<void> {
        await this.registrationLink.click();
    }

    get emailAddress (): Locator {
        return this.emailAddressInput;
    }

    get securityQuestion (): Locator {
        return this.securityQuestionDropdown;
    }

    get securityAnswer (): Locator {
        return this.securityAnswerInput;
    }

    get submitButton (): Locator {
        return this.sendResetLinkButton;
    }

    get emailError (): Locator {
        return this.emailErrorSpan;
    }

    get forgotPasswordMessage (): Locator {
        return this.forgotPasswordMessageDiv;
    }
}