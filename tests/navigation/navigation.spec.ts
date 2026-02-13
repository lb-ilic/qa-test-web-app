import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';
import { LoginPage } from '../../pages/login.page';
import { ForgotPasswordPage } from '../../pages/forgot-password.page';
import {
    FORGOT_PASSWORD_URL,
    LOGIN_URL,
    REGISTRATION_URL
} from '../../utils/app-strings';

let forgotPasswordPage: ForgotPasswordPage;
let loginPage: LoginPage;
let registrationPage: RegistrationPage;

test.describe( 'Login Page Navigation', () => {

    test.beforeEach( async ( { page } ) => {
        loginPage = new LoginPage( page );

        await loginPage.open();
    } );

    test( 'TC-048 : Navigate from Login Page to Registration Page', async ( { page } ) => {
        await loginPage.clickRegistrationLink();

        await expect( page ).toHaveURL( REGISTRATION_URL );
    } );

    test( 'TC-049 : Navigate from Login Page to Forgot Password Page', async ( { page } ) => {
        await loginPage.clickForgotPasswordLink();

        await expect( page ).toHaveURL( FORGOT_PASSWORD_URL );
    } );

    test.afterEach( async ( { page } ) => {
        await page.close();
    } );
} );

test( 'TC-050 : Navigate from Registration Page to Login Page', async ( { page } ) => {
    registrationPage = new RegistrationPage( page );

    await registrationPage.open();
    await registrationPage.clickLoginLink();

    await expect( page ).toHaveURL( LOGIN_URL );

    await page.close();
} );

test.describe( 'Forgot Password Page Navigation', () => {

    test.beforeEach( async ( { page } ) => {
        forgotPasswordPage = new ForgotPasswordPage( page );

        await forgotPasswordPage.open();
    } );

    test( 'TC-051 : Navigate from Forgot Password Page to Login Page', async ( { page } ) => {
        await forgotPasswordPage.clickLoginLink();

        await expect( page ).toHaveURL( LOGIN_URL );
    } );

    test( 'TC-052 : Navigate from Forgot Password Page to Registration Page', async ( { page } ) => {
        await forgotPasswordPage.clickRegistrationLink();

        await expect( page ).toHaveURL( REGISTRATION_URL );
    } );

    test.afterEach( async ( { page } ) => {
        await page.close();
    } );
} );