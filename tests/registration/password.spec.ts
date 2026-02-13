import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';
import { createUser } from '../../utils/user-actions';
import { LoginPage } from '../../pages/login.page';
import { invalidPasswordFormats, TOO_SHORT_PASSWORD, VALID_PASSWORD_MINIMUM_LENGTH, VALID_PASSWORD_WITH_SPACES } from '../../test-data/constants';
import { DASHBOARD_URL, PASSWORD_RULE_NOT_MET, PASSWORD_TOO_SHORT, REGISTRATION_SUCCESSFUL, REGISTRATION_SUCCESSFUL_URL } from '../../utils/app-strings';

let loginPage: LoginPage;
let registrationPage: RegistrationPage;

test.describe( 'Registration - Password', () => {

    test.beforeEach( async ( { page } ) => {
        registrationPage = new RegistrationPage( page );

        await registrationPage.open();
    } );

    test( 'TC-019 : Password is required', async ( { page } ) => {
        const invalidUser = createUser( { password: '' } );

        await registrationPage.register( invalidUser );

        await expect( registrationPage.password ).toBeFocused();
        await expect( registrationPage.password ).toHaveJSProperty( 'required', true );
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test( 'TC-020 : Password with minimum defined length is accepted', async ( { page } ) => {
        const invalidUser = createUser( {
            password: VALID_PASSWORD_MINIMUM_LENGTH,
            confirmPassword: VALID_PASSWORD_MINIMUM_LENGTH
        } );

        await registrationPage.register( invalidUser );

        await expect( page ).toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test( 'TC-021 : Password below minimum defined length is rejected', async ( { page } ) => {
        const invalidUser = createUser( { password: TOO_SHORT_PASSWORD } );

        await registrationPage.register( invalidUser );

        await expect( registrationPage.passwordError ).toHaveText( PASSWORD_TOO_SHORT );
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    for ( const invalidPassword of invalidPasswordFormats ) {
        test( `TC-022 : Password must meet defined complexity requirements ${ invalidPassword }`, async ( { page } ) => {
            const invalidUser = createUser( { password: invalidPassword } );

            await registrationPage.register( invalidUser );

            await expect( registrationPage.passwordError ).toHaveText( PASSWORD_RULE_NOT_MET );
            await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
            await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
        } );
    }

    test( 'TC-023 : Leading and trailing spaces are ignored for password', async ( { page } ) => {
        const validUser = createUser( { password: VALID_PASSWORD_WITH_SPACES } );

        await registrationPage.register( validUser );

        await expect( page ).toHaveURL( REGISTRATION_SUCCESSFUL_URL );

        loginPage = new LoginPage( page );

        await loginPage.open();

        await loginPage.logInUser( { email: validUser.email, password: validUser.password.trim() } );

        await expect( page ).toHaveURL( DASHBOARD_URL );
    } );

    test.afterEach( async ( { page } ) => {
        await page.close();
    } );
} );