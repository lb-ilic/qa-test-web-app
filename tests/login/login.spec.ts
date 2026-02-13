import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';
import { createUser } from '../../utils/user-actions';
import {
    DASHBOARD_URL,
    LOGIN_SUCCESSFUL,
    INVALID_EMAIL_ADDRESS,
    INVALID_EMAIL_OR_PASSWORD
} from '../../utils/app-strings';
import { LoginPage } from '../../pages/login.page';
import {
    invalidEmailFormats,
    validEmail,
    VALID_PASSWORD,
    VALID_PASSWORD_INCORRECT
} from '../../test-data/constants';
import { DashboardPage } from '../../pages/dashboard.page';

let loginPage: LoginPage;
let registrationPage: RegistrationPage;

test.describe( 'Login (registered user)', () => {

    test.beforeEach( async ( { page } ) => {
        registrationPage = new RegistrationPage( page );
        loginPage = new LoginPage( page );

        await registrationPage.open();
    } );

    test( 'TC-028 : Login is successful for registered user', async ( { page } ) => {
        const validUser = createUser();

        await registrationPage.register( validUser );
        await loginPage.open();

        await loginPage.logInUser( { email: validUser.email, password: validUser.password } );

        await expect( page ).toHaveURL( DASHBOARD_URL );
    } );

    test( 'TC-029 : Success message is displayed for successful login', async ( { page } ) => {
        const validUser = createUser();

        await registrationPage.register( validUser );
        await loginPage.open();

        await loginPage.logInUser( { email: validUser.email, password: validUser.password } );

        await expect( loginPage.loginMessage ).toHaveText( LOGIN_SUCCESSFUL );
    } );

    test( 'TC-032 : Valid error message is displayed for login with incorrect email or password', async ( { page } ) => {
        const validUser = createUser();

        await registrationPage.register( validUser );
        await loginPage.open();

        await loginPage.logInUser( { email: validUser.email, password: VALID_PASSWORD_INCORRECT } );

        await expect( loginPage.loginMessage ).toHaveText( INVALID_EMAIL_OR_PASSWORD );
    } );

    test.afterEach( async ( { page } ) => {
        await page.close();
    } );
} );

test.describe( 'Login', () => {

    test.beforeEach( async ( { page } ) => {
        loginPage = new LoginPage( page );

        await loginPage.open();
    } );

    test( 'TC-031 : Login fails for unregistered user', async ( { page } ) => {
        await loginPage.logInUser( { email: validEmail, password: VALID_PASSWORD } );

        await expect( loginPage.loginMessage ).toHaveText( INVALID_EMAIL_OR_PASSWORD );
    } );

    test( 'TC-033 : Empty form submission is rejected', async ( { page } ) => {
        await loginPage.submitForm();

        await expect( loginPage.emailAddress ).toBeFocused();
        await expect( loginPage.loginMessage ).not.toHaveText( LOGIN_SUCCESSFUL );
        await expect( page ).not.toHaveURL( DASHBOARD_URL );
    } );

    test( 'TC-034 : Email is required', async ( { page } ) => {
        await loginPage.logInUser( { password: VALID_PASSWORD } );

        await expect( loginPage.emailAddress ).toBeFocused();
        await expect( loginPage.emailAddress ).toHaveJSProperty( 'required', true );
        await expect( loginPage.loginMessage ).not.toHaveText( LOGIN_SUCCESSFUL );
        await expect( page ).not.toHaveURL( DASHBOARD_URL );
    } );

    for ( const invalidEmail of invalidEmailFormats ) {
        test( `TC-035 : Invalid email address ${ invalidEmail } is rejected`, async ( { page } ) => {
            await loginPage.logInUser( { email: invalidEmail, password: VALID_PASSWORD } );

            await expect( loginPage.emailError ).toHaveText( INVALID_EMAIL_ADDRESS );
            await expect( loginPage.loginMessage ).not.toHaveText( LOGIN_SUCCESSFUL );
            await expect( page ).not.toHaveURL( DASHBOARD_URL );
        } );
    }

    test( 'TC-036 : Password is required', async ( { page } ) => {
        await loginPage.logInUser( { email: validEmail } );

        await expect( loginPage.password ).toBeFocused();
        await expect( loginPage.password ).toHaveJSProperty( 'required', true );
        await expect( loginPage.loginMessage ).not.toHaveText( LOGIN_SUCCESSFUL );
        await expect( page ).not.toHaveURL( DASHBOARD_URL );
    } );

    test.afterEach( async ( { page } ) => {
        await page.close();
    } );

} );

test( 'TC-030 : Remember Me keeps user logged in after browser restart', async ( { browser } ) => {
    const validUser = createUser();

    const context1 = await browser.newContext();
    const page1 = await context1.newPage();

    registrationPage = new RegistrationPage( page1 );
    loginPage = new LoginPage( page1 );

    await registrationPage.open();
    await registrationPage.register( validUser );
    await loginPage.open();

    await loginPage.logInUser( { email: validUser.email, password: validUser.password } );

    await expect( page1 ).toHaveURL( DASHBOARD_URL );

    const storageState = await context1.storageState();

    await context1.close();

    const context2 = await browser.newContext( { storageState } );
    const page2 = await context2.newPage();

    const dashboardPage = new DashboardPage( page2 );

    await dashboardPage.open();

    await expect( page2 ).toHaveURL( DASHBOARD_URL );
    await expect( dashboardPage.userName ).toHaveText( validUser.firstName );

    await context2.close();
} );