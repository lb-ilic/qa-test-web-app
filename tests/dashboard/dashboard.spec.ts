import { test, expect } from "@playwright/test";
import { DashboardPage } from "../../pages/dashboard.page";
import { LOGIN_URL, REGISTRATION_SUCCESSFUL_URL } from "../../utils/app-strings";
import { RegistrationPage } from "../../pages/registration.page";
import { createUser } from "../../utils/user-actions";
import { LoginPage } from "../../pages/login.page";

test( 'TC-046 : Logout successful', async ( { page } ) => {
    const dashboardPage = new DashboardPage( page );
    const loginPage = new LoginPage( page );
    const registrationPage = new RegistrationPage( page );

    const validUser = createUser();

    await registrationPage.open();
    await registrationPage.register( validUser );

    await expect( page ).toHaveURL( REGISTRATION_SUCCESSFUL_URL );

    await loginPage.logInUser( { email: validUser.email, password: validUser.password } );

    await dashboardPage.logout();

    await expect( page ).toHaveURL( LOGIN_URL );

    await page.close();
} );
