import * as yup from 'yup';

import {
    firstName,
    lastName,
    email,
    phoneNumber,
    accountPhoneNumber,
    message,
    password,
    code,
    justStringRequired,
    price,
    discount,
    fullName,
    address,
    postcode,
    city,
    confirmPassword,
} from './formValidation';

export const userDetailsValidationSchema = yup.object().shape({
    firstName,
    lastName,
    email,
    phoneNumber,
});

export const personalDetailsAccountVSchema = yup.object().shape({
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: accountPhoneNumber,
});

export const userAddressValidationSchema = yup.object().shape({
    address,
    postcode,
    city,
});

export const loginValidationSchema = yup.object().shape({
    email,
    password,
});

export const registrationValidationSchema = yup.object().shape({
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    confirmPassword,
});

export const callbackValidationSchema = yup.object().shape({
    name: fullName,
    email,
    message,
});

export const commentValidationSchema = yup.object().shape({
    comment: message,
});

export const generalProductValidationSchema = yup.object().shape({
    code,
    part_number: justStringRequired,
    brand: justStringRequired,
    type: justStringRequired,
    description: justStringRequired,
    price,
});
