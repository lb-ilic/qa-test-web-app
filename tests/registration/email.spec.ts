import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';
import { createUser } from '../../utils/user-actions';
import { invalidEmailFormats, validEmailWithCapitalLetters, validEmailFormats, validEmailWithSpaces } from '../../test-data/constants';
import { LoginPage } from '../../pages/login.page';
import { DASHBOARD_URL, INVALID_EMAIL_ADDRESS, REGISTRATION_SUCCESSFUL, REGISTRATION_SUCCESSFUL_URL } from '../../utils/app-strings';

let loginPage: LoginPage;
let registrationPage: RegistrationPage;

test.describe( 'Registration - Email', () => {

    test.beforeEach( async ( { page } ) => {
        registrationPage = new RegistrationPage( page );

        await registrationPage.open();
    } );

    test( 'TC-008 : Email is required', async ( { page } ) => {
        const invalidUser = createUser( { email: '' } );

        await registrationPage.register( invalidUser );

        await expect( registrationPage.emailAddress ).toBeFocused();
        await expect( registrationPage.emailAddress ).toHaveJSProperty( 'required', true );
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    for ( let validEmail of validEmailFormats ) {
        test( `TC-009 : Valid email address ${ validEmail } is accepted`, async ( { page } ) => {
            validEmail = `${ Date.now() }${ validEmail }`;
            const validUser = createUser( { email: validEmail } );

            await registrationPage.register( validUser );

            await expect( page ).toHaveURL( REGISTRATION_SUCCESSFUL_URL );
        } );
    }

    for ( const invalidEmail of invalidEmailFormats ) {
        test( `TC-010 : Invalid email address ${ invalidEmail } is rejected`, async ( { page } ) => {
            const invalidUser = createUser( { email: invalidEmail } );

            await registrationPage.register( invalidUser );

            await expect( registrationPage.emailError ).toHaveText( INVALID_EMAIL_ADDRESS );
            await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
            await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
        } );
    }

    test( 'TC-011 : Email address is case insensitive', async ( { page } ) => {
        const validUser = createUser( { email: validEmailWithCapitalLetters } );

        await registrationPage.register( validUser );

        await expect( page ).toHaveURL( REGISTRATION_SUCCESSFUL_URL );

        loginPage = new LoginPage( page );

        await loginPage.open();

        await loginPage.logInUser( { email: validEmailWithCapitalLetters.toLowerCase(), password: validUser.password } );

        await expect( page ).toHaveURL( DASHBOARD_URL );
    } );

    test( 'TC-012 : Leading and trailing spaces are ignored for email', async ( { page } ) => {
        const validUser = createUser( { email: validEmailWithSpaces } );

        await registrationPage.register( validUser );

        await expect( page ).toHaveURL( REGISTRATION_SUCCESSFUL_URL );

        loginPage = new LoginPage( page );

        await loginPage.open();

        await loginPage.logInUser( { email: validEmailWithSpaces.trim(), password: validUser.password } );

        await expect( page ).toHaveURL( DASHBOARD_URL );
    } );

    test.afterEach( async ( { page } ) => {
        await page.close();
    } );
} );
