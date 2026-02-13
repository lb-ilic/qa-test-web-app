import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';
import { createUser } from '../../utils/user-actions';
import {
    INVALID_PHONE_NUMBER,
    INVALID_ZIP_CODE,
    REGISTRATION_SUCCESSFUL,
    REGISTRATION_SUCCESSFUL_URL
} from '../../utils/app-strings';
import { INVALID_PHONE_OR_ZIP_NUMBER } from '../../test-data/constants';

let registrationPage: RegistrationPage;

test.describe( 'Registration - Other Fields', () => {

    test.beforeEach( async ( { page } ) => {
        registrationPage = new RegistrationPage( page );

        await registrationPage.open();
    } );

    test( 'TC-006 : First name is required', async ( { page } ) => {
        const invalidUser = createUser( { firstName: '' } );

        await registrationPage.register( invalidUser );

        await expect( registrationPage.firstName ).toBeFocused();
        await expect( registrationPage.firstName ).toHaveJSProperty( 'required', true );
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test( 'TC-007 : Last name is required', async ( { page } ) => {
        const invalidUser = createUser( { lastName: '' } );

        await registrationPage.register( invalidUser );

        await expect( registrationPage.lastName ).toBeFocused();
        await expect( registrationPage.lastName ).toHaveJSProperty( 'required', true );
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test( 'TC-013 : Phone number is required', async ( { page } ) => {
        const invalidUser = createUser( { phoneNumber: '' } );

        await registrationPage.register( invalidUser );

        await expect( registrationPage.phoneNumber ).toBeFocused();
        await expect( registrationPage.phoneNumber ).toHaveJSProperty( 'required', true );
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test( 'TC-014 : Phone number does not accept non-numeric values', async ( { page } ) => {
        const invalidUser = createUser( { phoneNumber: INVALID_PHONE_OR_ZIP_NUMBER } );

        await registrationPage.register( invalidUser );

        await expect( registrationPage.phoneError ).toHaveText( INVALID_PHONE_NUMBER );
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test( 'TC-015 : Street address is required', async ( { page } ) => {
        const invalidUser = createUser( { address: '' } );

        await registrationPage.register( invalidUser );

        await expect( registrationPage.streetAddress ).toBeFocused();
        await expect( registrationPage.streetAddress ).toHaveJSProperty( 'required', true );
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test( 'TC-016 : City is required', async ( { page } ) => {
        const invalidUser = createUser( { city: '' } );

        await registrationPage.register( invalidUser );

        await expect( registrationPage.city ).toBeFocused();
        await expect( registrationPage.city ).toHaveJSProperty( 'required', true );
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test( 'TC-017 : Zip code is required', async ( { page } ) => {
        const invalidUser = createUser( { zipCode: '' } );

        await registrationPage.register( invalidUser );

        await expect( registrationPage.zipCode ).toBeFocused();
        await expect( registrationPage.zipCode ).toHaveJSProperty( 'required', true );
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test( 'TC-018 : Zip code does not accept non-numeric values', async ( { page } ) => {
        const invalidUser = createUser( { zipCode: INVALID_PHONE_OR_ZIP_NUMBER } );

        await registrationPage.register( invalidUser );

        await expect( registrationPage.zipError ).toHaveText( INVALID_ZIP_CODE );
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test( 'TC-027 : Terms and Conditions are required', async ( { page } ) => {
        const invalidUser = createUser();

        await registrationPage.fillFormInputFields( invalidUser );
        await registrationPage.submitForm();

        await expect( registrationPage.termsAndConditions ).toHaveJSProperty( 'required', true );
        await expect( registrationPage.registrationMessage ).not.toHaveText( REGISTRATION_SUCCESSFUL );
        await expect( page ).not.toHaveURL( REGISTRATION_SUCCESSFUL_URL );
    } );

    test.afterEach( async ( { page } ) => {
        await page.close();
    } );
} );