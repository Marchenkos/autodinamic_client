import { gql } from 'apollo-boost';
import { filterFields, orderFields, productFields, userFields } from './fields';

export const accountDetailsQuery = gql`
    query {
        accountDetails {
            ${userFields}
        }
    }
`;

export const getOrderByIdQuery = gql`
    query($id: String!) {
        orderById(id: $id) {
            ${orderFields}
        }
    }
`;

export const getOrdersByEmailQuery = gql`
    query($input: GetOrdersByEmailPayload!) {
        orderByEmail(input: $input) {
            ${orderFields}
        }
    }
`;

export const getProductByIdQuery = gql`
    query($id: Float!) {
        productById(id: $id) {
            ${productFields}
        }
    }
`;

export const sendRequestToCallbackQuery = gql`
    query ($input: RequestToCallbackPayload!) {
        sendRequestToCallback(input: $input) {
            isSuccess
        }
    }
`;
