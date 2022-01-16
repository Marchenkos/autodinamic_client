import * as yup from 'yup';

const nameRules = { pattern: /^[А-Я][а-яё]{1,23}/ };
const cityRules = { pattern: /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/ };

const enStringRules = { pattern: /^[a-zA-Z0-9_.-]*$/ };
const fullNameRules = { pattern: /^[А-ЯЁ][а-яё]*(\s[А-ЯЁ][а-яё]*)?$/ };

const requiredError = 'Поле должно быть заполнено';
const invalidError = 'Некоректная информация';

export const firstName = yup.string().required(requiredError);

export const fullName = yup
    .string()
    .required(requiredError)
    .matches(fullNameRules.pattern, 'Введите Ваше полное имя и фамилию');

export const lastName = yup.string().required(requiredError);

export const password = yup.string().required(requiredError).min(6, 'Введите минимум 6 символов');

/** Password rules */
export const confirmPassword = yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают');

/** Email rules */
const emailRules = {
    pattern:
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
};

export const email = yup
    .string()
    .required(requiredError)
    .matches(emailRules.pattern, 'Такой электронной почты не существует');

export const discount = yup.number().max(3, invalidError);

export const price = yup.number().max(5000, 'Cлишком большое число').required(requiredError);

const phoneNumberRules = {
    minLength: 17,
    maxLength: 17,
    pattern: /^[0-9 +]+$/,
};

export const accountPhoneNumber = yup
    .string()
    .min(phoneNumberRules.minLength, invalidError)
    .max(phoneNumberRules.maxLength, invalidError)
    .matches(phoneNumberRules.pattern, requiredError);

export const phoneNumber = yup
    .string()
    .required(requiredError)
    .min(phoneNumberRules.minLength, invalidError)
    .max(phoneNumberRules.maxLength, invalidError)
    .matches(phoneNumberRules.pattern, requiredError);

const messageRules = {
    pattern: /[а-яё]*$/,
};

export const message = yup.string().required(requiredError).matches(messageRules.pattern, invalidError);

export const city = yup.string().required(requiredError).matches(cityRules.pattern, 'Неверный город');

export const address = yup.string().required(requiredError);

export const postcode = yup
    .string()
    .required(requiredError)
    .matches(/^[0-9]+$/, 'Почтовый индекс содержит только цифры')
    .min(6, 'Почтовый индекс содержит 6 цифр')
    .max(6, 'Почтовый индекс содержит 6 цифр');

//GENERAL PRODUCT

export const code = yup
    .string()
    .required(requiredError)
    .matches(/^[a-zA-Z0-9_.-]*$/, invalidError);

export const justStringRequired = yup.string().required(requiredError);
