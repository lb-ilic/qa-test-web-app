import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';
import { createUser } from '../../utils/user-actions';
import {
    PASSWORDS_DO_NOT_MATCH,
    REGISTRATION_SUCCESSFUL,
    REGISTRATION_SUCCESSFUL_URL,
} from '../../utils/app-strings';
import {
    VALID_PASSWORD_INCORRECT,
    VALID_PASSWORD_WITH_SPACES
} from '../../test-data/constants';

let registrationPage: RegistrationPage;

test.describe( 'Registration - Confirm Password', () => {

    test.beforeEach( async ( { page } ) => {
        registrationPage = new RegistrationPage( page );

        await registrationPage.open();
    } );

    test( 'TC-024 : Confirm password is required', async ( { page } ) => {
        const invalidUser = createUser( { confirmPassword: '' } );

        await registrationPage.register( invalidUser );

        await expect( registrationPage.confirmPassword ).toBeFocused();
        await expect( registrationPage.confirmPassword ).toHaveJSProperty( 'required', true );
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test( 'TC-025 : Confirm password must match entered password', async ( { page } ) => {
        const validUser = createUser( { confirmPassword: VALID_PASSWORD_INCORRECT } );

        await registrationPage.register( validUser );

        await expect( registrationPage.confirmPasswordError ).toHaveText( PASSWORDS_DO_NOT_MATCH );
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test.skip( 'TC-026 : Leading and trailing spaces are ignored for confirm password', async ( { page } ) => {
        const validUser = createUser( { confirmPassword: VALID_PASSWORD_WITH_SPACES } );

        await registrationPage.register( validUser );

        await expect( page ).toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test.afterEach( async ( { page } ) => {
        await page.close();
    } );
} );