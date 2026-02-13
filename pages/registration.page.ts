import { Page, Locator } from '@playwright/test';
import { UserParams } from '../utils/params';

export class RegistrationPage {
    readonly page: Page;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailAddressInput: Locator;
    private readonly phoneNumberInput: Locator;
    private readonly streetAddressInput: Locator;
    private readonly cityInput: Locator;
    private readonly zipCodeInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly termsAndConditionsCheckbox: Locator;
    private readonly newsletterCheckbox: Locator;
    private readonly createAccountButton: Locator;
    private readonly loginLink: Locator;
    private readonly emailErrorSpan: Locator;
    private readonly phoneErrorSpan: Locator;
    private readonly zipErrorSpan: Locator;
    private readonly passwordErrorSpan: Locator;
    private readonly confirmPasswordErrorSpan: Locator;
    private readonly registrationMessageDiv: Locator;

    constructor ( page: Page ) {
        this.page = page;

        this.firstNameInput = page.getByLabel( 'First Name' );
        this.lastNameInput = page.getByLabel( 'Last Name' );
        this.emailAddressInput = page.getByLabel( 'Email Address' );
        this.phoneNumberInput = page.getByLabel( 'Phone Number' );
        this.streetAddressInput = page.getByLabel( 'Street Address' );
        this.cityInput = page.getByLabel( 'City' );
        this.zipCodeInput = page.getByLabel( 'ZIP Code' );
        this.passwordInput = page.getByLabel( 'Password', { exact: true } );
        this.confirmPasswordInput = page.getByLabel( 'Confirm Password', { exact: true } );
        this.termsAndConditionsCheckbox = page.getByLabel( /terms and conditions/i );
        this.newsletterCheckbox = page.getByLabel( /newsletter/i );
        this.createAccountButton = page.getByRole( 'button', { name: 'Create Account' } );
        this.loginLink = page.getByRole( 'link', { name: /login/i } );
        this.emailErrorSpan = page.locator( '#emailError' );
        this.phoneErrorSpan = page.locator( '#phoneError' );
        this.zipErrorSpan = page.locator( '#zipError' );
        this.passwordErrorSpan = page.locator( '#passwordError' );
        this.confirmPasswordErrorSpan = page.locator( '#confirmPasswordError' );
        this.registrationMessageDiv = page.locator( '#registerMessage' );
    }

    async open (): Promise<void> {
        await this.page.goto( '/register.html' );
    }

    async register ( user: UserParams ): Promise<void> {
        await this.fillFormInputFields( user );
        await this.selectTermsAndConditions();
        await this.submitForm();
    }

    async fillFormInputFields ( userData: UserParams ): Promise<void> {
        await this.firstNameInput.clear();
        await this.firstNameInput.fill( userData.firstName );

        await this.lastNameInput.clear();
        await this.lastNameInput.fill( userData.lastName );

        await this.emailAddressInput.clear();
        await this.emailAddressInput.fill( userData.email );

        await this.phoneNumberInput.clear();
        await this.phoneNumberInput.fill( userData.phoneNumber );

        await this.streetAddressInput.clear();
        await this.streetAddressInput.fill( userData.address );

        await this.cityInput.clear();
        await this.cityInput.fill( userData.city );

        await this.zipCodeInput.clear();
        await this.zipCodeInput.fill( userData.zipCode );

        await this.passwordInput.clear();
        await this.passwordInput.fill( userData.password );

        await this.confirmPasswordInput.clear();
        await this.confirmPasswordInput.fill( userData.confirmPassword );
    }

    async selectTermsAndConditions (): Promise<void> {
        await this.termsAndConditionsCheckbox.check();
    }

    async selectNewsletter (): Promise<void> {
        await this.newsletterCheckbox.check();
    }

    async submitForm (): Promise<void> {
        await this.createAccountButton.click();
    }

    async clickLoginLink (): Promise<void> {
        await this.loginLink.click();
    }

    get firstName (): Locator {
        return this.firstNameInput;
    }

    get lastName (): Locator {
        return this.lastNameInput;
    }

    get emailAddress (): Locator {
        return this.emailAddressInput;
    }

    get phoneNumber (): Locator {
        return this.phoneNumberInput;
    }

    get streetAddress (): Locator {
        return this.streetAddressInput;
    }

    get city (): Locator {
        return this.cityInput;
    }

    get zipCode (): Locator {
        return this.zipCodeInput;
    }

    get password (): Locator {
        return this.passwordInput;
    }

    get confirmPassword (): Locator {
        return this.confirmPasswordInput;
    }

    get termsAndConditions (): Locator {
        return this.termsAndConditionsCheckbox;
    }

    get newsletter (): Locator {
        return this.newsletterCheckbox;
    }

    get submitButton (): Locator {
        return this.createAccountButton;
    }

    get emailError (): Locator {
        return this.emailErrorSpan;
    }

    get phoneError (): Locator {
        return this.phoneErrorSpan;

    }
    get zipError (): Locator {
        return this.zipErrorSpan;
    }

    get passwordError (): Locator {
        return this.passwordErrorSpan;
    }

    get confirmPasswordError (): Locator {
        return this.confirmPasswordErrorSpan;
    }

    get registrationMessage (): Locator {
        return this.registrationMessageDiv;
    }
}