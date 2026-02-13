import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../../pages/forgot-password.page';
import { RegistrationPage } from '../../pages/registration.page';
import {
    invalidEmailFormats,
    validEmail,
    VALID_SECURITY_ANSWER,
    VALID_SECURITY_QUESTION
} from '../../test-data/constants';
import { createUser } from '../../utils/user-actions';
import {
    INVALID_EMAIL_ADDRESS,
    RESET_PASSWORD_EMAIL_SENT
} from '../../utils/app-strings';

let forgotPasswordPage: ForgotPasswordPage;

test( 'TC-039 : Valid error message is displayed after registered user submits the form', async ( { page } ) => {
    const validUser = createUser();

    const registrationPage = new RegistrationPage( page );
    forgotPasswordPage = new ForgotPasswordPage( page );

    await registrationPage.open();
    await registrationPage.register( validUser );

    await forgotPasswordPage.open();

    await forgotPasswordPage.resetPassword( {
        email: validUser.email,
        question: VALID_SECURITY_QUESTION,
        answer: VALID_SECURITY_ANSWER
    } );

    await expect( forgotPasswordPage.forgotPasswordMessage ).toHaveText( RESET_PASSWORD_EMAIL_SENT );

    await page.close();
} );

test.describe( 'Forgot Password', () => {

    test.beforeEach( async ( { page } ) => {
        forgotPasswordPage = new ForgotPasswordPage( page );

        await forgotPasswordPage.open();
    } );

    test( 'TC-040 : Valid error message is displayed after unregistered user submits the form', async ( { page } ) => {
        await forgotPasswordPage.resetPassword( {
            email: validEmail,
            question: VALID_SECURITY_QUESTION,
            answer: VALID_SECURITY_ANSWER
        } );

        await expect( forgotPasswordPage.forgotPasswordMessage ).toHaveText( RESET_PASSWORD_EMAIL_SENT );
    } );

    test( 'TC-041 : Empty form submission is rejected', async ( { page } ) => {
        await forgotPasswordPage.submitForm();

        await expect( forgotPasswordPage.emailAddress ).toBeFocused();
        await expect( forgotPasswordPage.forgotPasswordMessage ).not.toHaveText( RESET_PASSWORD_EMAIL_SENT );
    } );

    test( `TC-042 : Email is required`, async ( { page } ) => {
        await forgotPasswordPage.resetPassword( {
            question: VALID_SECURITY_QUESTION,
            answer: VALID_SECURITY_ANSWER
        } );

        await expect( forgotPasswordPage.emailAddress ).toHaveJSProperty( 'required', true );
        await expect( forgotPasswordPage.emailAddress ).toBeFocused();
        await expect( forgotPasswordPage.forgotPasswordMessage ).not.toHaveText( RESET_PASSWORD_EMAIL_SENT );
    } );

    for ( const invalidEmail of invalidEmailFormats ) {
        test( `TC-043 : Invalid email address ${ invalidEmail } is rejected`, {
            annotation: {
                type: 'bug',
                description: 'Success message displayed for invalid email on Forgot Password Page'
            }
        }, async ( { page } ) => {
            await forgotPasswordPage.resetPassword( {
                email: invalidEmail,
                question: VALID_SECURITY_QUESTION,
                answer: VALID_SECURITY_ANSWER
            } );

            await expect( forgotPasswordPage.emailError ).toHaveText( INVALID_EMAIL_ADDRESS );
            await expect( forgotPasswordPage.forgotPasswordMessage ).not.toHaveText( RESET_PASSWORD_EMAIL_SENT );
        } );
    }

    test( `TC-044 : Security question is required`, {
        annotation: {
            type: 'bug',
            description: 'Security Question is not required'
        }
    }, async ( { page } ) => {
        await forgotPasswordPage.resetPassword( {
            email: validEmail,
            answer: VALID_SECURITY_ANSWER
        } );

        await expect( forgotPasswordPage.securityQuestion ).toHaveJSProperty( 'required', true );
        await expect( forgotPasswordPage.securityQuestion ).toBeFocused();
        await expect( forgotPasswordPage.forgotPasswordMessage ).not.toHaveText( RESET_PASSWORD_EMAIL_SENT );
    } );

    test( `TC-045 : Security answer is required`, {
        annotation: {
            type: 'bug',
            description: 'Security Answer is not required'
        }
    }, async ( { page } ) => {
        await forgotPasswordPage.resetPassword( {
            email: validEmail,
            question: VALID_SECURITY_QUESTION
        } );

        await expect( forgotPasswordPage.securityAnswer ).toHaveJSProperty( 'required', true );
        await expect( forgotPasswordPage.securityAnswer ).toBeFocused();
        await expect( forgotPasswordPage.forgotPasswordMessage ).not.toHaveText( RESET_PASSWORD_EMAIL_SENT );
    } );

    test.afterEach( async ( { page } ) => {
        await page.close();
    } );
} );