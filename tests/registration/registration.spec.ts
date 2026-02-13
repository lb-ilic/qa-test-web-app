import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';
import { createUser } from '../../utils/user-actions';
import { REGISTRATION_SUCCESSFUL, REGISTRATION_SUCCESSFUL_URL, USER_EXISTS } from '../../utils/app-strings';

let registrationPage: RegistrationPage;

test.describe( 'Registration', () => {

    test.beforeEach( async ( { page } ) => {
        registrationPage = new RegistrationPage( page );

        await registrationPage.open();
    } );

    test( 'TC-001 : Registration is successful for all valid data', async ( { page } ) => {
        const validUser = createUser();

        await registrationPage.selectNewsletter();
        await registrationPage.register( validUser );

        await expect( page ).toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test( 'TC-002 : Registration is successful when optional field for newsletter subscription is left empty', async ( { page } ) => {
        const validUser = createUser();

        await registrationPage.register( validUser );

        await expect( page ).toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test( 'TC-003 : Success message is displayed for successful registration', async ( { page } ) => {
        const validUser = createUser();

        await registrationPage.register( validUser );

        await expect( registrationPage.registrationMessage ).toHaveText( REGISTRATION_SUCCESSFUL );
    } );

    test( 'TC-004 : Registration fails for already used email', async ( { page } ) => {
        const validUser = createUser();

        await registrationPage.register( validUser );
        await registrationPage.open();
        await registrationPage.register( validUser );

        await expect( registrationPage.registrationMessage ).toHaveText( USER_EXISTS );
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test( 'TC-005 : Empty form submission is rejected', async ( { page } ) => {
        await registrationPage.submitForm();

        await expect( registrationPage.firstName ).toBeFocused();
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test.afterEach( async ( { page } ) => {
        await page.close();
    } );

} );