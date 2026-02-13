import { UserParams } from "./params";
import {
    VALID_CITY,
    VALID_CONFIRM_PASSWORD,
    VALID_FIRST_NAME,
    VALID_LAST_NAME,
    VALID_PASSWORD,
    VALID_PHONE_NUMBER,
    VALID_STREET_ADDRESS,
    VALID_ZIP_CODE,
    validEmail
} from '../test-data/constants';

export function createUser ( overrides: Partial<UserParams> = {} ): UserParams {
    return {
        firstName: VALID_FIRST_NAME,
        lastName: VALID_LAST_NAME,
        email: validEmail,
        phoneNumber: VALID_PHONE_NUMBER,
        address: VALID_STREET_ADDRESS,
        city: VALID_CITY,
        zipCode: VALID_ZIP_CODE,
        password: VALID_PASSWORD,
        confirmPassword: VALID_CONFIRM_PASSWORD,
        ...overrides
    };
}