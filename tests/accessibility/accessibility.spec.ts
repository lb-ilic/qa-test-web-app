import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';
import { LoginPage } from '../../pages/login.page';
import { ForgotPasswordPage } from '../../pages/forgot-password.page';

test( 'TC-053 : Registration form', async ( { page } ) => {
    const registrationPage = new RegistrationPage( page );

    await registrationPage.open();

    await page.keyboard.press( 'Tab' );
    await expect( registrationPage.firstName ).toBeFocused();

    await page.keyboard.press( 'Tab' );
    await expect( registrationPage.lastName ).toBeFocused();

    await page.keyboard.press( 'Tab' );
    await expect( registrationPage.emailAddress ).toBeFocused();

    await page.keyboard.press( 'Tab' );
    await expect( registrationPage.phoneNumber ).toBeFocused();

    await page.keyboard.press( 'Tab' );
    await expect( registrationPage.streetAddress ).toBeFocused();

    await page.keyboard.press( 'Tab' );
    await expect( registrationPage.city ).toBeFocused();

    await page.keyboard.press( 'Tab' );
    await expect( registrationPage.zipCode ).toBeFocused();

    await page.keyboard.press( 'Tab' );
    await expect( registrationPage.password ).toBeFocused();

    await page.keyboard.press( 'Tab' );
    await expect( registrationPage.confirmPassword ).toBeFocused();

    await page.keyboard.press( 'Shift+Tab' );
    await expect( registrationPage.password ).toBeFocused();

    await page.keyboard.press( 'Tab' );
    await page.keyboard.press( 'Tab' );
    await expect( registrationPage.termsAndConditions ).toBeFocused();

    await page.keyboard.press( 'Space' );
    await expect( registrationPage.termsAndConditions ).toBeChecked();

    await page.keyboard.press( 'Tab' );
    await expect( registrationPage.newsletter ).toBeFocused();

    await page.keyboard.press( 'Space' );
    await expect( registrationPage.newsletter ).toBeChecked();

    await page.keyboard.press( 'Tab' );
    await expect( registrationPage.submitButton ).toBeFocused();

    await page.keyboard.press( 'Enter' );
    await expect( registrationPage.firstName ).toBeFocused();

    await page.close();
} );

test( 'TC-054 : Login form', async ( { page } ) => {
    const loginPage = new LoginPage( page );

    await loginPage.open();

    await page.keyboard.press( 'Tab' );
    await expect( loginPage.emailAddress ).toBeFocused();

    await page.keyboard.press( 'Tab' );
    await expect( loginPage.password ).toBeFocused();

    await page.keyboard.press( 'Tab' );
    await expect( loginPage.rememberMe ).toBeFocused();

    await page.keyboard.press( 'Shift+Tab' );
    await expect( loginPage.password ).toBeFocused();

    await page.keyboard.press( 'Tab' );
    await page.keyboard.press( 'Space' );
    await expect( loginPage.rememberMe ).toBeChecked();

    await page.keyboard.press( 'Tab' );
    await expect( loginPage.submitButton ).toBeFocused();

    await page.keyboard.press( 'Enter' );
    await expect( loginPage.emailAddress ).toBeFocused();

    await page.close();
} );

test( 'TC-055 : Forgot Password form', async ( { page } ) => {
    const forgotPasswordPage = new ForgotPasswordPage( page );

    await forgotPasswordPage.open();

    await page.keyboard.press( 'Tab' );
    await expect( forgotPasswordPage.emailAddress ).toBeFocused();

    await page.keyboard.press( 'Tab' );
    await expect( forgotPasswordPage.securityQuestion ).toBeFocused();

    await page.keyboard.press( 'Space' );
    await page.keyboard.press( 'ArrowDown' );
    await page.keyboard.press( 'Enter' );
    await expect( forgotPasswordPage.securityQuestion ).toHaveValue( 'pet' );

    await page.keyboard.press( 'Shift+Tab' );
    await expect( forgotPasswordPage.emailAddress ).toBeFocused();

    await page.keyboard.press( 'Tab' );
    await page.keyboard.press( 'Tab' );
    await expect( forgotPasswordPage.securityAnswer ).toBeFocused();

    await page.keyboard.press( 'Tab' );
    await expect( forgotPasswordPage.submitButton ).toBeFocused();

    await page.keyboard.press( 'Enter' );
    await expect( forgotPasswordPage.emailAddress ).toBeFocused();

    await page.close();
} );
