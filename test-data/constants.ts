export const validEmail: string = `user${ Date.now() }@test.com`;
export const validEmailWithCapitalLetters: string = `Test.User${ Date.now() }@test.com`;
export const validEmailWithSpaces: string = `  user${ Date.now() }@test.com   `;

export const invalidEmailFormats: string[] = [
    'a',
    'plainaddress',
    '@example.com',
    'email.example.com',
    'email@example',
    'email@example..com',
    'email.@example.com',
    '.email@example.com',
    'email@.example.com',
    'email@example.com (user)',
    'email@-example.com',
    'email@111.222.333.44444',
    'Abc..123@example.com',
    'user@@example.com',
    'user name@example.com',
    'user#example.com'
];
export const invalidPasswordFormats: string[] = [
    'Asdf1234a',
    'asd.23456s',
    'ASD.reop?',
    'ASE3&OPTR'
];
export const validEmailFormats: string[] = [
    'testUser@example.com',
    'test.user@example.com',
    'user@subdomain.example.com',
    'test+user@example.com',
    'email@example-test.com',
    'test-user@example.com'
];

export const INVALID_PHONE_OR_ZIP_NUMBER: string = '123 aaa';
export const TOO_SHORT_PASSWORD: string = '123';

export const VALID_CITY: string = 'City Name';
export const VALID_CONFIRM_PASSWORD: string = 'Password123!';
export const VALID_FIRST_NAME: string = 'First Name';
export const VALID_LAST_NAME: string = 'Last Name';
export const VALID_PASSWORD: string = 'Password123!';
export const VALID_PASSWORD_INCORRECT: string = 'Password123.';
export const VALID_PASSWORD_MINIMUM_LENGTH: string = 'Pa1.';
export const VALID_PASSWORD_WITH_SPACES: string = '   Password123!   ';
export const VALID_PHONE_NUMBER: string = '090 123 3456';
export const VALID_SECURITY_ANSWER: string = 'Pet Name';
export const VALID_SECURITY_QUESTION: string = 'pet';
export const VALID_STREET_ADDRESS: string = 'Street 123';
export const VALID_ZIP_CODE: string = '12 345';