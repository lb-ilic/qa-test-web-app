export type UserParams = {
    firstName: string,
    lastName: string,
    email: string;
    phoneNumber: string,
    address: string,
    city: string,
    zipCode: string,
    password: string,
    confirmPassword: string,
};

export type LoginParams = {
    email?: string,
    password?: string;
};

export type ForgotPasswordParams = {
    email?: string,
    question?: string,
    answer?: string;
};